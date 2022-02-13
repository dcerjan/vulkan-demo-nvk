#version 450
#extension GL_GOOGLE_include_directive : enable

#include "utils.glsl"

// Uniforms

// Inputs
layout(location = 0) in vec2 inPosition;
layout(location = 1) in vec3 inColor;

// Outputs
layout(location = 0) out vec3 fragColor;

void main() {
  gl_Position = vec4(inPosition, 0.0, 1.0);
  fragColor = inColor;
}
