export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uDiffuse;
  uniform sampler2D uDepth;
  uniform sampler2D uAlpha;
  uniform vec2 uMotion;
  uniform float uStrength;

  varying vec2 vUv;

  void main() {
    // Lê altura do depth map e centra em torno de 0
    float depth = texture2D(uDepth, vUv).r;
    float centeredDepth = (pow(depth, 1.45) - 0.5);

    // Mantém o centro mais estável para reduzir distorção nas bordas
    vec2 centeredUv = vUv - 0.5;
    float falloff = smoothstep(0.95, 0.15, length(centeredUv));

    // Usa magnitude real do mouse + ajuste de eixos de tela/UV
    vec2 motion = vec2(uMotion.x, -uMotion.y);
    vec2 parallax = motion * centeredDepth * uStrength * falloff;

    // Aplica deslocamento da difusa com base no relevo
    vec2 displacedUv = vUv - parallax;
    displacedUv = clamp(displacedUv, 0.002, 0.998);

    float alphaMask = texture2D(uAlpha, displacedUv).r;
    if (alphaMask < 0.02) discard;

    vec4 color = texture2D(uDiffuse, displacedUv);
    gl_FragColor = vec4(color.rgb, alphaMask);
  }
`;
