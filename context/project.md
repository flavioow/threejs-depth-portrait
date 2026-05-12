# Estrutura do Projeto

## `src/`

### `src/app/`
Camada principal da aplicação Next.js (App Router).

#### `globals.css`
Arquivo global de estilos da aplicação.

---

#### `layout.tsx`
Layout raiz da aplicação Next.js.
---

#### `page.tsx`
Página inicial da aplicação.

---

# `src/components/`

## `src/components/hero-parallax/`
Módulo responsável pelo sistema visual de Hero Parallax em 3D.

### `hero-3d.tsx`
Componente principal da experiência 3D.

Responsabilidades:
- Inicialização da cena
- Integração entre canvas, câmera e inputs
- Coordenação do efeito parallax

---

### `hero-canvas.tsx`
Wrapper do canvas/renderização.

Responsabilidades:
- Configuração do canvas WebGL
- Gerenciamento do renderer
- Integração com Three.js / R3F
- Controle do ciclo de renderização

---

### `use-hero-parallax-controls.ts`
Hook customizado para controles do parallax.

Responsabilidades:
- Captura de inputs
- Estado de movimento
- Controle de intensidade/parâmetros
- Integração entre mouse/gyro/câmera

---

# `src/three/`

Arquitetura principal do motor visual 3D.

Separado por:
- Scene
- Systems
- Motion
- Types

---

## `src/three/scene/`
Responsável pela composição da cena 3D.

### `src/three/scene/shaders/`

#### `image-parallax-shader.ts`
Shader customizado do efeito parallax.

Responsabilidades:
- Vertex/fragment shader
- Distorção visual
- Profundidade/parallax
- Manipulação UV
- Efeitos de movimento visual

---

### `camera-controller.tsx`
Controlador da câmera da cena.

Responsabilidades:
- Movimento suave da câmera
- Interpolação
- Reação aos inputs
- Atualização da posição/rotação

---

### `hero-parallax-config.ts`
Arquivo central de configuração.

Responsabilidades:
- Constantes globais
- Intensidade de movimento
- Sensibilidade
- Configuração da câmera
- Configuração visual do parallax

---

### `image-plane.tsx`
Plano/imagem renderizada na cena.

Responsabilidades:
- Mesh principal
- Aplicação de material/shader
- Exibição da imagem no espaço 3D

---

### `scene-root.tsx`
Root da cena 3D.

Responsabilidades:
- Composição da árvore da cena
- Luzes
- Câmera
- Objetos da cena
- Providers/contextos da cena

---

# `src/three/systems/`

Arquitetura baseada em sistemas utilitários e engine runtime.

---

## `src/three/systems/input/`

### `gyro-input.ts`
Sistema de input via giroscópio/device orientation.

Responsabilidades:
- Captura de movimento do dispositivo
- Normalização dos valores
- Integração mobile
- Conversão de orientação em movimento

---

### `pointer-input.ts`
Sistema de input por ponteiro/mouse.

Responsabilidades:
- Captura de cursor
- Tracking de movimento
- Conversão para coordenadas normalizadas
- Eventos de interação

---

## `src/three/systems/loop/`

### `render-loop.ts`
Loop principal de renderização.

Responsabilidades:
- RequestAnimationFrame
- Atualização por frame
- Tick/update global
- Sincronização de animações

---

## `src/three/systems/motion/`

### `damped-motion.ts`
Sistema de suavização/interpolação de movimento.

Responsabilidades:
- Motion damping
- Interpolação suave
- Inércia
- Lerp/smoothing
- Redução de movimentos bruscos

---

# `src/three/types/`

Tipos utilitários compartilhados.

### `vector.ts`
Tipos/helpers relacionados a vetores.

Responsabilidades:
- Definições tipadas
- Estruturas matemáticas
- Helpers para coordenadas/vetores
- Padronização de tipos numéricos
