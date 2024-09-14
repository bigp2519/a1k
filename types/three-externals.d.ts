declare module 'three' {
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
}
