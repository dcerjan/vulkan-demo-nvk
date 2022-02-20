#version 450
#extension GL_GOOGLE_include_directive : enable

#include "utils.glsl"

// Uniforms
layout(binding = 0) uniform UniformBufferObject {
  mat4 model;
  mat4 view;
  mat4 proj;
} ubo;

// Inputs
layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inColor;
layout(location = 2) in vec2 inUv;

// Outputs
layout(location = 0) out vec3 fragColor;
layout(location = 1) out vec2 fragUv;

void main() {
  gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
  fragColor = inColor;
  fragUv = inUv;
}
