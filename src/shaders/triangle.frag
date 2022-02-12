#version 450
#extension GL_GOOGLE_include_directive : enable

// Uniforms

// Inputs
layout(location = 0) in vec3 fragColor;

// Outputs
layout(location = 0) out vec4 outColor;

void main() {
  outColor = vec4(fragColor, 1.0);
}
