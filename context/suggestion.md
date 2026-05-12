# Arquitetura Técnica — Hero 3D Parallax (Lando Norris Style)

## Objetivo

Criar um sistema de hero interativo baseado em WebGL + shaders customizados que simula profundidade volumétrica a partir de uma imagem 2D utilizando:

* `depth map`
* `normal map`
* `roughness map`
* `alpha map`
* movimento suave de câmera
* micro-parallax baseado no cursor

O objetivo **não é reconstruir um modelo 3D real**, mas sim criar uma ilusão de profundidade extremamente convincente através de:

* UV displacement
* parallax mapping
* shading procedural
* temporal smoothing
* leitura de profundidade no fragment shader

A abordagem utilizada no site do Lando Norris segue exatamente essa direção:
um sistema de *faux depth rendering* altamente otimizado.

---

# Arquitetura Atual (Excelente Base)

Sua estrutura já está correta para um sistema escalável.

```txt
src/
├─ three/
│  ├─ scene/
│  │  ├─ shaders/
│  │  │  └─ image-parallax-shader.ts
│  │  ├─ camera-controller.ts
│  │  ├─ image-plane.ts
│  │  └─ scene-root.ts
│  │
│  ├─ systems/
│  │  ├─ input/
│  │  │  ├─ gyro-input.ts
│  │  │  └─ pointer-input.ts
│  │  │
│  │  ├─ loop/
│  │  │  └─ render-loop.ts
│  │  │
│  │  └─ motion/
│  │     └─ damped-motion.ts
│  │
│  └─ types/
│     └─ vector.ts
│
└─ components/
   └─ hero-parallax/
      ├─ hero-3d.tsx
      └─ hero-canvas.tsx
```

Isso já separa corretamente:

* rendering
* input
* motion
* orchestration
* shader layer
* react bridge

Isso é MUITO superior ao padrão comum de “tudo dentro de um componente React”.

---

# Conceito Central

O sistema inteiro gira em torno disso:

```txt
cursor -> target motion -> damped motion
       -> uniforms
       -> shader
       -> UV displacement
       -> pseudo 3D
```

O depth map controla:

* quais pixels parecem próximos
* quais parecem distantes
* intensidade do deslocamento UV

---

# Pipeline de Renderização

---

## 1. Input Layer

Você já possui:

```txt
pointer-input.ts
gyro-input.ts
```

Perfeito.

O ideal é sempre normalizar:

```txt
x = -1 → 1
y = -1 → 1
```

Exemplo:

```ts
const x = (event.clientX / width) * 2 - 1
const y = -(event.clientY / height) * 2 + 1
```

---

# 2. Motion Layer

Você já criou o mais importante:
`damped-motion.ts`

Isso é ESSENCIAL.

O efeito do Lando NÃO usa movimento bruto do mouse.

Ele usa:

* interpolação temporal
* atraso físico
* inércia
* easing contínuo

---

## Fórmula ideal

```ts
current += (target - current) * damping
```

Ou:

```ts
MathUtils.damp()
```

---

# 3. Render Loop

Seu `render-loop.ts` provavelmente encapsula:

```ts
requestAnimationFrame()
```

Correto.

Mas dentro do React Three Fiber:

## NÃO faça loop manual para objetos da cena

Use:

```ts
useFrame()
```

Porque o R3F já controla:

* delta time
* renderer
* frame invalidation
* performance scheduling

---

# Onde usar `useFrame`

## Use em:

### `image-plane.ts`

Para atualizar uniforms.

Exemplo:

```ts
useFrame((state, delta) => {
  material.uniforms.uTime.value += delta

  material.uniforms.uMouse.value.lerp(
    targetMouse,
    0.08
  )
})
```

---

# Estrutura Recomendada

---

# HeroCanvas

Responsável por:

* criar `<Canvas>`
* configurar renderer
* suspense
* performance
* camera

---

# SceneRoot

Responsável por:

* composição da cena
* camera controller
* image plane
* light setup

---

# ImagePlane

Responsável por:

* geometria
* material
* shaders
* uniforms
* texture binding

---

# Shader Pipeline

Agora entra a parte importante.

---

# Plane Geometry

---

## NÃO use um plane simples

Errado:

```tsx
<planeGeometry args={[2, 2]} />
```

Isso NÃO suporta micro deslocamentos.

---

# Use alta subdivisão

Exemplo:

```tsx
<planeGeometry args={[2, 2, 256, 256]} />
```

---

# Por quê?

Porque:

```txt
mais vértices
=
mais pontos deformáveis
=
parallax mais suave
```

---

# Trade-off

256x256:

```txt
65 mil vértices
```

Isso ainda é aceitável para UMA hero section.

---

# Uniforms

Você já deve preparar algo assim:

```ts
const uniforms = {
  uTime: { value: 0 },

  uMouse: {
    value: new THREE.Vector2(0, 0),
  },

  uProgress: {
    value: 0,
  },

  uDiffuseTexture: {
    value: diffuseTexture,
  },

  uDepthTexture: {
    value: depthTexture,
  },

  uNormalTexture: {
    value: normalTexture,
  },

  uRoughnessTexture: {
    value: roughnessTexture,
  },

  uAlphaTexture: {
    value: alphaTexture,
  },
}
```

---

# O que cada uniform faz

| Uniform             | Função                   |
| ------------------- | ------------------------ |
| `uTime`             | animações contínuas      |
| `uMouse`            | direção do parallax      |
| `uProgress`         | intensidade/interpolação |
| `uDepthTexture`     | profundidade             |
| `uNormalTexture`    | iluminação fake          |
| `uRoughnessTexture` | resposta especular       |
| `uAlphaTexture`     | recorte/transparência    |

---

# Vertex Shader

---

# Objetivo

O vertex shader:

* prepara dados
* passa informações ao fragment shader
* pode deformar geometria

---

# Dados importantes

---

## `vUv`

```glsl
varying vec2 vUv;
```

Passa UV para o fragment shader.

---

## `worldPosition`

```glsl
vec4 worldPosition = modelMatrix * vec4(position, 1.0);
```

Posição do vértice no mundo.

Útil para:

* iluminação
* view direction
* depth tricks

---

## `worldNormal`

```glsl
worldNormal = normalize(
  mat3(modelMatrix) * normal
);
```

Normal em espaço global.

---

## `viewDirection`

```glsl
cameraPosition - worldPosition.xyz
```

Direção câmera → superfície.

Muito usada em:

* fresnel
* specular
* fake reflections

---

# Vertex Shader Exemplo

```glsl
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDirection;

void main() {
  vUv = uv;

  vec4 worldPosition =
    modelMatrix * vec4(position, 1.0);

  vec3 worldNormal =
    normalize(mat3(modelMatrix) * normal);

  vNormal = worldNormal;

  vViewDirection =
    normalize(
      cameraPosition - worldPosition.xyz
    );

  gl_Position =
    projectionMatrix *
    viewMatrix *
    worldPosition;
}
```

---

# Fragment Shader

Aqui está o coração do sistema.

---

# Conceito

O fragment shader:

1. lê o depth map
2. desloca UV
3. renderiza diffuse
4. aplica normal response
5. aplica alpha
6. compõe iluminação

---

# uvFauxDepth.glsl

---

# O conceito principal

Você pega:

```txt
uv original
+
mouse offset
*
depth
```

---

# Fórmula Base

```glsl
vec2 displacedUv =
  uv + mouse * depth;
```

---

# Interpretação

Pixels claros no depth map:

```txt
mais próximos
=
movem mais
```

Pixels escuros:

```txt
mais distantes
=
movem menos
```

---

# Implementação

```glsl
float depth =
  texture2D(
    uDepthTexture,
    vUv
  ).r;

vec2 parallax =
  uMouse * depth * 0.04;

vec2 displacedUv =
  vUv - parallax;
```

---

# Render da imagem

```glsl
vec4 color =
  texture2D(
    uDiffuseTexture,
    displacedUv
  );
```

---

# Alpha

```glsl
float alpha =
  texture2D(
    uAlphaTexture,
    displacedUv
  ).r;
```

---

# Normal Map

---

# O que ele faz

Ele NÃO move geometria.

Ele altera:

```txt
resposta da luz
```

Criando:

* volume
* micro superfície
* shading cinematográfico

---

# Uso

```glsl
vec3 normal =
  texture2D(
    uNormalTexture,
    displacedUv
  ).rgb;

normal = normalize(normal * 2.0 - 1.0);
```

---

# Fake Lighting

```glsl
vec3 lightDir =
  normalize(vec3(0.3, 0.5, 1.0));

float lighting =
  dot(normal, lightDir);

lighting =
  lighting * 0.5 + 0.5;
```

---

# Roughness

---

# Objetivo

Controlar brilho especular.

---

# Uso

```glsl
float roughness =
  texture2D(
    uRoughnessTexture,
    displacedUv
  ).r;
```

---

# Fresnel (Importante)

Isso é MUITO usado nesses sites premium.

---

# Fórmula

```glsl
float fresnel =
  pow(
    1.0 - dot(
      vViewDirection,
      normal
    ),
    3.0
  );
```

---

# Resultado

Cria:

* glow lateral
* highlight cinematográfico
* sensação de material físico

---

# Shader Completo Simplificado

```glsl
uniform sampler2D uDiffuseTexture;
uniform sampler2D uDepthTexture;
uniform sampler2D uAlphaTexture;

uniform vec2 uMouse;

varying vec2 vUv;

void main() {

  float depth =
    texture2D(
      uDepthTexture,
      vUv
    ).r;

  vec2 displacedUv =
    vUv - uMouse * depth * 0.04;

  vec4 color =
    texture2D(
      uDiffuseTexture,
      displacedUv
    );

  float alpha =
    texture2D(
      uAlphaTexture,
      displacedUv
    ).r;

  gl_FragColor =
    vec4(color.rgb, alpha);
}
```

---

# Camera Controller

---

# Importante

O efeito do Lando NÃO é apenas UV displacement.

Existe:

```txt
micro movimento da câmera
```

---

# Estratégia correta

Você já separou:

```txt
camera-controller.ts
```

Excelente.

A câmera deve:

* seguir target suavemente
* mover pouco
* rotacionar quase nada
* evitar motion sickness

---

# Exemplo

```ts
camera.position.x = damp(
  camera.position.x,
  target.x * 0.15,
  4,
  delta
)
```

---

# Escala do Movimento

MUITO importante.

Erro comum:

```txt
parallax exagerado
```

O site do Lando usa:

```txt
movimentos mínimos
```

A sensação premium vem disso.

---

# Otimização

---

# Compressão de textura

16MB é pesado demais.

Use:

```txt
KTX2 / Basis
```

ou:

```txt
WebP AVIF
```

---

# Recomendo fortemente

## Diffuse

```txt
2048px
```

Mais que isso raramente vale.

---

# Depth Map

Pode ser:

```txt
1024px
```

---

# Normal/Roughness

Até:

```txt
512px
```

já funciona.

---

# Texture Loader

Use:

```ts
useTexture()
```

do Drei.

---

# Importante

Configure:

```ts
texture.colorSpace = SRGBColorSpace
```

para diffuse.

---

# NÃO faça isso

```ts
normalMap.colorSpace = SRGB
```

Errado.

Normal/depth/roughness:

```txt
NoColorSpace
```

---

# Possível Evolução

---

# 1. Chromatic Aberration

Muito usado em experiências premium.

---

# 2. Film Grain

Noise procedural leve.

---

# 3. DOF fake

Blur baseado em profundidade.

---

# 4. Multi-layer depth

Separar:

* rosto
* cabelo
* ombros

em layers independentes.

---

# O Que Você NÃO Precisa

---

## NÃO precisa

* Blender rig
* modelo facial real
* skeletal animation
* displacement pesado
* ray tracing
* postprocessing extremo

---

# O Que REALMENTE Importa

---

## Ordem de impacto visual

### 1.

Depth map bem feito

### 2.

Suavidade temporal

### 3.

Escala correta do movimento

### 4.

Shader limpo

### 5.

Boa iluminação fake

### 6.

Compressão de textura

---

# Stack Atual

Seu stack já está correto.

Você NÃO precisa adicionar:

* GSAP
* postprocessing
* physics engine

Neste estágio.

---

# O que talvez valha adicionar depois

## `leva`

Para debug de uniforms.

```bash
bun add leva
```

Extremamente útil.
