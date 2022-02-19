#version 450
#extension GL_GOOGLE_include_directive : enable

#include "utils.glsl"

// Uniforms
layout(binding = 1) uniform sampler2D texSampler;

// Inputs
layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragUv;

// Outputs
layout(location = 0) out vec4 outColor;

void main() {
  outColor = texture(texSampler, fragUv) * vec4(fragColor, 1.0);
}
