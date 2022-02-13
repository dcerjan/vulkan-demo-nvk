declare module 'nvk' {
  export * from 'nvk/generated/1.1.126/linux/index'
}

declare module 'nvk-essentials' {
  type CompilerOptions = {
    source: string | Buffer
    extension: string | number
    includeDirectories?: string[]
  }
  export var GLSL: {
    version: () => string
    toSPIRV: (options: CompilerOptions) => Promise<{ error: Error | null; output: Uint8Array }>
    toSPIRVSync: (options: CompilerOptions) => { error: Error | null; output: Uint8Array }
  }
}
