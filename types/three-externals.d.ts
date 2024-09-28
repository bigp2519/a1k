declare module 'three' {
  export class Scene extends Object3D {
    constructor();
  }

  export class PerspectiveCamera extends Camera {
    constructor(fov: number, aspect: number, near: number, far: number);
    aspect: number;
    position: Vector3;
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

  export class Group extends Object3D {
    constructor();
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    add(...object: Object3D[]): this;
  }

  export class SphereGeometry extends BufferGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class Color {
    constructor(color: string | number);
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: ShaderMaterialParameters);
    uniforms: { [uniform: string]: IUniform };
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

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
    attributes: { [name: string]: BufferAttribute };
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
    array: ArrayLike<number>;
    itemSize: number;
    needsUpdate: boolean;
  }

  export class Float32BufferAttribute extends BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number);
  }

  export class PointsMaterial {
    constructor(parameters?: PointsMaterialParameters);
  }

  export interface PointsMaterialParameters {
    color?: Color | number | string;
    size?: number;
    sizeAttenuation?: boolean;
    map?: any;
    alphaTest?: number;
    morphTargets?: boolean;
    vertexColors?: boolean;
    fog?: boolean;
    blending?: number;
  }

  export class Points extends Object3D {
    constructor(geometry?: BufferGeometry, material?: PointsMaterial | ShaderMaterial);
  }

  export class Vector2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
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

  export class Material {
    constructor();
  }

  export interface MaterialParameters {
    [key: string]: any;
  }

  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
  }

  export const AdditiveBlending: number;
}
