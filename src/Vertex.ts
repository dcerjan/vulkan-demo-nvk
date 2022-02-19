import {
  VK_FORMAT_R32G32B32_SFLOAT,
  VK_FORMAT_R32G32_SFLOAT,
  VK_VERTEX_INPUT_RATE_VERTEX,
  VkVertexInputAttributeDescription,
  VkVertexInputBindingDescription,
} from 'nvk'
import { vec2, vec3 } from 'gl-matrix'

export class Vertex {
  constructor(public position: vec2, public color: vec3, public uv: vec2) {}

  static sizeOf() {
    return 2 * 4 + 3 * 4 + 2 * 4
  }

  static offsetOf() {
    return {
      position: 0,
      color: 2 * 4,
      uv: 2 * 4 + 3 * 4,
    }
  }

  static buffer(vertices: Vertex[]) {
    return new Float32Array(vertices.map(({ position, color, uv }) => [...position, ...color, ...uv]).flatMap((v) => v))
  }

  static getBindingDescription() {
    const bindingDescription = new VkVertexInputBindingDescription({
      binding: 0,
      stride: Vertex.sizeOf(),
      inputRate: VK_VERTEX_INPUT_RATE_VERTEX,
    })

    return bindingDescription
  }

  static getAttributeDescriptions() {
    const attributeDescriptions = [
      new VkVertexInputAttributeDescription({
        binding: 0,
        location: 0,
        format: VK_FORMAT_R32G32_SFLOAT,
        offset: Vertex.offsetOf().position,
      }),
      new VkVertexInputAttributeDescription({
        binding: 0,
        location: 1,
        format: VK_FORMAT_R32G32B32_SFLOAT,
        offset: Vertex.offsetOf().color,
      }),
      new VkVertexInputAttributeDescription({
        binding: 0,
        location: 2,
        format: VK_FORMAT_R32G32_SFLOAT,
        offset: Vertex.offsetOf().uv,
      }),
    ]

    return attributeDescriptions
  }
}
