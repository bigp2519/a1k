declare module 'three' {
  // Base types
  export class Material {
    constructor();
  }

  export interface MaterialParameters {
    [key: string]: any;
  }

  export interface IUniform {
    value: any;
  }

  // ShaderMaterial and related types
  export class ShaderMaterial extends Material {
    constructor(parameters?: ShaderMaterialParameters);
    uniforms: { [uniform: string]: IUniform };
    vertexShader: string;
    fragmentShader: string;
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

  // Scene, Camera, and Renderer types
  export class Scene {
    constructor();
    add(...object: Object3D[]): this;
  }

  export class PerspectiveCamera extends Camera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: WebGLRendererParameters);
    domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
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

  // Geometry types
  export class Group extends Object3D {
    add(...object: Object3D[]): this;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    add(...object: Object3D[]): this;
  }

  export class SphereGeometry extends BufferGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
    attributes: { [name: string]: BufferAttribute };
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
    array: ArrayLike<number>;
    needsUpdate: boolean;
  }

  export class Float32BufferAttribute extends BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
  }

  // Mesh, Points, and Material types
  export class Color {
    constructor(color: string | number);
  }

  export class Mesh extends Object3D {
    constructor(geometry: BufferGeometry | SphereGeometry, material: Material);
  }

  export class PointsMaterial extends Material {
    constructor(parameters?: PointsMaterialParameters);
  }

  export interface PointsMaterialParameters extends MaterialParameters {
    size?: number;
    vertexColors?: boolean;
    blending?: number;
  }

  export class Points extends Object3D {
    constructor(geometry: BufferGeometry, material: PointsMaterial | ShaderMaterial);
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
  }

  export class Camera extends Object3D {}

  export const AdditiveBlending: number;
  export class Vector2 {
    constructor(x?: number, y?: number);
  }
}
