declare module 'three' {
  // Existing ShaderMaterial and related types
  export class ShaderMaterial extends Material {
    constructor(parameters?: ShaderMaterialParameters);
  }

  export interface ShaderMaterialParameters extends MaterialParameters {
    uniforms?: { [uniform: string]: IUniform };
    vertexShader?: string;
    fragmentShader?: string;
    linewidth?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    lights?: boolean;
    clipping?: boolean;
    skinning?: boolean;
    morphTargets?: boolean;
    morphNormals?: boolean;
    extensions?: {
      derivatives?: boolean;
      fragDepth?: boolean;
      drawBuffers?: boolean;
      shaderTextureLOD?: boolean;
    };
  }

  export interface IUniform {
    value: any;
  }

  // New types for additional THREE classes and interfaces
  export class Scene {
    constructor();
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: {
      x: number;
      y: number;
      z: number;
    };
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
  }

  export interface WebGLRendererParameters {
    canvas?: HTMLCanvasElement;
    context?: WebGLRenderingContext;
    precision?: 'highp' | 'mediump' | 'lowp';
    alpha?: boolean;
    premultipliedAlpha?: boolean;
    antialias?: boolean;
    stencil?: boolean;
    preserveDrawingBuffer?: boolean;
    powerPreference?: 'high-performance' | 'low-power';
  }

  export class Group {
    add(...object: Object3D[]): this;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
  }

  export class SphereGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class Color {
    constructor(color: string | number);
  }

  export class Mesh {
    constructor(geometry: SphereGeometry, material: ShaderMaterial);
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
  }
  
  // Additional types for THREE.js as needed
  export class Material {
    constructor();
  }

  export interface MaterialParameters {
    [key: string]: any;
  }
}
