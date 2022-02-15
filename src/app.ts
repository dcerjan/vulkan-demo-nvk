import { ASSERT_VK_RESULT, memoryCopy } from './utils'
import {
  VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT,
  VK_ATTACHMENT_LOAD_OP_CLEAR,
  VK_ATTACHMENT_LOAD_OP_DONT_CARE,
  VK_ATTACHMENT_STORE_OP_DONT_CARE,
  VK_ATTACHMENT_STORE_OP_STORE,
  VK_BLEND_FACTOR_ONE,
  VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA,
  VK_BLEND_FACTOR_SRC_ALPHA,
  VK_BLEND_FACTOR_ZERO,
  VK_BLEND_OP_ADD,
  VK_BUFFER_USAGE_INDEX_BUFFER_BIT,
  VK_BUFFER_USAGE_TRANSFER_DST_BIT,
  VK_BUFFER_USAGE_TRANSFER_SRC_BIT,
  VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT,
  VK_BUFFER_USAGE_VERTEX_BUFFER_BIT,
  VK_COLORSPACE_SRGB_NONLINEAR_KHR,
  VK_COLOR_COMPONENT_A_BIT,
  VK_COLOR_COMPONENT_B_BIT,
  VK_COLOR_COMPONENT_G_BIT,
  VK_COLOR_COMPONENT_R_BIT,
  VK_COMMAND_BUFFER_LEVEL_PRIMARY,
  VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT,
  VK_COMPONENT_SWIZZLE_IDENTITY,
  VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR,
  VK_CULL_MODE_BACK_BIT,
  VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
  VK_DYNAMIC_STATE_BLEND_CONSTANTS,
  VK_DYNAMIC_STATE_LINE_WIDTH,
  VK_DYNAMIC_STATE_VIEWPORT,
  VK_ERROR_OUT_OF_DATE_KHR,
  VK_EXT_DEBUG_UTILS_EXTENSION_NAME,
  VK_FENCE_CREATE_SIGNALED_BIT,
  VK_FORMAT_B8G8R8A8_SRGB,
  VK_FRONT_FACE_CLOCKWISE,
  VK_IMAGE_ASPECT_COLOR_BIT,
  VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
  VK_IMAGE_LAYOUT_PRESENT_SRC_KHR,
  VK_IMAGE_LAYOUT_UNDEFINED,
  VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT,
  VK_IMAGE_VIEW_TYPE_2D,
  VK_INDEX_TYPE_UINT16,
  VK_KHR_SWAPCHAIN_EXTENSION_NAME,
  VK_LOGIC_OP_COPY,
  VK_MAKE_VERSION,
  VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT,
  VK_MEMORY_PROPERTY_HOST_COHERENT_BIT,
  VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT,
  VK_NULL_HANDLE,
  VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU,
  VK_PIPELINE_BIND_POINT_GRAPHICS,
  VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT,
  VK_POLYGON_MODE_FILL,
  VK_PRESENT_MODE_FIFO_KHR,
  VK_PRESENT_MODE_MAILBOX_KHR,
  VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST,
  VK_QUEUE_COMPUTE_BIT,
  VK_QUEUE_GRAPHICS_BIT,
  VK_QUEUE_SPARSE_BINDING_BIT,
  VK_QUEUE_TRANSFER_BIT,
  VK_SAMPLE_COUNT_1_BIT,
  VK_SHADER_STAGE_FRAGMENT_BIT,
  VK_SHADER_STAGE_VERTEX_BIT,
  VK_SHARING_MODE_CONCURRENT,
  VK_SHARING_MODE_EXCLUSIVE,
  VK_SUBOPTIMAL_KHR,
  VK_SUBPASS_CONTENTS_INLINE,
  VK_SUBPASS_EXTERNAL,
  VK_SUCCESS,
  VkApplicationInfo,
  VkAttachmentDescription,
  VkAttachmentReference,
  VkBuffer,
  VkBufferCopy,
  VkBufferCreateInfo,
  VkBufferUsageFlagBits,
  VkClearColorValue,
  VkClearValue,
  VkCommandBuffer,
  VkCommandBufferAllocateInfo,
  VkCommandBufferBeginInfo,
  VkCommandPool,
  VkCommandPoolCreateInfo,
  VkComponentMapping,
  VkDescriptorSetLayout,
  VkDescriptorSetLayoutBinding,
  VkDescriptorSetLayoutCreateInfo,
  VkDevice,
  VkDeviceCreateInfo,
  VkDeviceMemory,
  VkDeviceQueueCreateInfo,
  VkExtensionProperties,
  VkExtent2D,
  VkFence,
  VkFenceCreateInfo,
  VkFramebuffer,
  VkFramebufferCreateInfo,
  VkGraphicsPipelineCreateInfo,
  VkImage,
  VkImageSubresourceRange,
  VkImageView,
  VkImageViewCreateInfo,
  VkInstance,
  VkInstanceCreateInfo,
  VkLayerProperties,
  VkMemoryAllocateInfo,
  VkMemoryPropertyFlagBits,
  VkMemoryRequirements,
  VkOffset2D,
  VkPhysicalDevice,
  VkPhysicalDeviceFeatures,
  VkPhysicalDeviceMemoryProperties,
  VkPhysicalDeviceProperties,
  VkPipeline,
  VkPipelineColorBlendAttachmentState,
  VkPipelineColorBlendStateCreateInfo,
  VkPipelineDynamicStateCreateInfo,
  VkPipelineInputAssemblyStateCreateInfo,
  VkPipelineLayout,
  VkPipelineLayoutCreateInfo,
  VkPipelineMultisampleStateCreateInfo,
  VkPipelineRasterizationStateCreateInfo,
  VkPipelineShaderStageCreateInfo,
  VkPipelineVertexInputStateCreateInfo,
  VkPipelineViewportStateCreateInfo,
  VkPresentInfoKHR,
  VkPresentModeKHR,
  VkQueue,
  VkQueueFamilyProperties,
  VkRect2D,
  VkRenderPass,
  VkRenderPassBeginInfo,
  VkRenderPassCreateInfo,
  VkSemaphore,
  VkSemaphoreCreateInfo,
  VkShaderModule,
  VkShaderModuleCreateInfo,
  VkSubmitInfo,
  VkSubpassDependency,
  VkSubpassDescription,
  VkSurfaceCapabilitiesKHR,
  VkSurfaceFormatKHR,
  VkSurfaceKHR,
  VkSwapchainCreateInfoKHR,
  VkSwapchainKHR,
  VkViewport,
  VulkanWindow,
  vkAcquireNextImageKHR,
  vkAllocateCommandBuffers,
  vkAllocateMemory,
  vkBeginCommandBuffer,
  vkBindBufferMemory,
  vkCmdBeginRenderPass,
  vkCmdBindIndexBuffer,
  vkCmdBindPipeline,
  vkCmdBindVertexBuffers,
  vkCmdCopyBuffer,
  vkCmdDrawIndexed,
  vkCmdEndRenderPass,
  vkCreateBuffer,
  vkCreateCommandPool,
  vkCreateDescriptorSetLayout,
  vkCreateDevice,
  vkCreateFence,
  vkCreateFramebuffer,
  vkCreateGraphicsPipelines,
  vkCreateImageView,
  vkCreateInstance,
  vkCreatePipelineLayout,
  vkCreateRenderPass,
  vkCreateSemaphore,
  vkCreateShaderModule,
  vkCreateSwapchainKHR,
  vkDestroyBuffer,
  vkDestroyCommandPool,
  vkDestroyDescriptorSetLayout,
  vkDestroyDevice,
  vkDestroyFence,
  vkDestroyFramebuffer,
  vkDestroyImageView,
  vkDestroyInstance,
  vkDestroyPipeline,
  vkDestroyPipelineLayout,
  vkDestroyRenderPass,
  vkDestroySemaphore,
  vkDestroyShaderModule,
  vkDestroySurfaceKHR,
  vkDestroySwapchainKHR,
  vkDeviceWaitIdle,
  vkEndCommandBuffer,
  vkEnumerateDeviceExtensionProperties,
  vkEnumerateInstanceLayerProperties,
  vkEnumeratePhysicalDevices,
  vkFreeCommandBuffers,
  vkFreeMemory,
  vkGetBufferMemoryRequirements,
  vkGetDeviceQueue,
  vkGetPhysicalDeviceFeatures,
  vkGetPhysicalDeviceMemoryProperties,
  vkGetPhysicalDeviceProperties,
  vkGetPhysicalDeviceQueueFamilyProperties,
  vkGetPhysicalDeviceSurfaceCapabilitiesKHR,
  vkGetPhysicalDeviceSurfaceFormatsKHR,
  vkGetPhysicalDeviceSurfacePresentModesKHR,
  vkGetPhysicalDeviceSurfaceSupportKHR,
  vkGetSwapchainImagesKHR,
  vkMapMemory,
  vkQueuePresentKHR,
  vkQueueSubmit,
  vkQueueWaitIdle,
  vkResetFences,
  vkUnmapMemory,
  vkWaitForFences,
} from 'nvk'

import { GLSL } from 'nvk-essentials'
import SegfaultHandler from 'segfault-handler'
import { Vertex } from './Vertex'
import fs from 'fs'
import { mat4 } from 'gl-matrix'
import path from 'path'

SegfaultHandler.registerHandler('crash.log')

const MAX_FRAMES_IN_FLIGHT = 2

class SwapChainSupportDetails {
  constructor(
    public capabilities: VkSurfaceCapabilitiesKHR = new VkSurfaceCapabilitiesKHR(),
    public formats: VkSurfaceFormatKHR[] = [],
    public presentModes: Int32Array = new Int32Array()
  ) {}
}

class QueueFamilyIndices {
  constructor(
    public graphicsFamily: null | number = null,
    public presentFamily: null | number = null,
    public transferFamily: null | number = null
  ) {}

  public isComplete() {
    return this.graphicsFamily != null && this.presentFamily != null && this.transferFamily != null
  }
}

class UniformBufferObject {
  private ubo: Float32Array
  constructor(model: mat4, view: mat4, proj: mat4) {
    this.ubo = new Float32Array([...model, ...view, ...proj])
  }

  set model(matrix: mat4) {
    for (let i = 0; i < matrix.length; ++i) {
      this.ubo[i] = matrix[i]
    }
  }

  set view(matrix: mat4) {
    for (let i = 0; i < matrix.length; ++i) {
      this.ubo[i + 4 * 16] = matrix[i]
    }
  }

  set proj(matrix: mat4) {
    for (let i = 0; i < matrix.length; ++i) {
      this.ubo[i + 2 * 4 * 16] = matrix[i]
    }
  }

  get data(): Readonly<Float32Array> {
    return this.ubo
  }
}

const checkDeviceExtensionSupport = (physicalDevice: VkPhysicalDevice, extensions: string[]): boolean => {
  const extensionCount = { $: 0 }
  vkEnumerateDeviceExtensionProperties(physicalDevice, null, extensionCount, null)

  const availableExtensions = new Array(extensionCount.$).fill(0).map(() => new VkExtensionProperties())
  vkEnumerateDeviceExtensionProperties(physicalDevice, null, extensionCount, availableExtensions)

  return extensions.every((ext) => availableExtensions.find((available) => available.extensionName === ext) != null)
}

const findMemoryType = (physicalDevice: VkPhysicalDevice, typeFilter: number, properties: VkMemoryPropertyFlagBits) => {
  const memProperties = new VkPhysicalDeviceMemoryProperties()
  vkGetPhysicalDeviceMemoryProperties(physicalDevice, memProperties)

  for (let i = 0; i < memProperties.memoryTypeCount; ++i) {
    if (
      typeFilter & (1 << i) &&
      memProperties != null &&
      memProperties.memoryTypes != null &&
      memProperties.memoryTypes[i] != null &&
      memProperties.memoryTypes[i].propertyFlags & properties
    ) {
      return i
    }
  }

  throw new Error('Unable to find suitable memory type!')
}

const querySwapChainSupport = (physicalDevice: VkPhysicalDevice, surface: VkSurfaceKHR) => {
  const details = new SwapChainSupportDetails()

  vkGetPhysicalDeviceSurfaceCapabilitiesKHR(physicalDevice, surface, details.capabilities)

  const formatCount = { $: 0 }
  vkGetPhysicalDeviceSurfaceFormatsKHR(physicalDevice, surface, formatCount, null)
  if (formatCount.$ != 0) {
    details.formats = new Array(formatCount.$).fill(0).map(() => new VkSurfaceFormatKHR())
    vkGetPhysicalDeviceSurfaceFormatsKHR(physicalDevice, surface, formatCount, details.formats)
  }

  const presentModesCount = { $: 0 }
  vkGetPhysicalDeviceSurfacePresentModesKHR(physicalDevice, surface, presentModesCount, null)
  if (presentModesCount.$ != 0) {
    details.presentModes = new Int32Array(new Array(presentModesCount.$).fill(0))
    vkGetPhysicalDeviceSurfacePresentModesKHR(physicalDevice, surface, presentModesCount, details.presentModes)
  }

  return details
}

const isDeviceSuitable = (device: VkPhysicalDevice, surface: VkSurfaceKHR, extensions: string[]) => {
  const properties = new VkPhysicalDeviceProperties()
  vkGetPhysicalDeviceProperties(device, properties)

  const features = new VkPhysicalDeviceFeatures()
  vkGetPhysicalDeviceFeatures(device, features)

  const extensionsSupported = checkDeviceExtensionSupport(device, extensions)

  let swapChainAdequate = false
  let swapChainSupport: SwapChainSupportDetails
  if (extensionsSupported) {
    swapChainSupport = querySwapChainSupport(device, surface)
    swapChainAdequate = swapChainSupport.formats.length != 0 && swapChainSupport.presentModes.length != 0
  }

  const suitable =
    properties.deviceType === VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU &&
    features.geometryShader &&
    extensionsSupported &&
    swapChainAdequate

  return { suitable, properties, features, swapChainSupport: swapChainSupport! }
}

const chooseSwapSurfaceFormat = (availableFormats: VkSurfaceFormatKHR[]) => {
  return (
    availableFormats.find(
      (fmt) => fmt.format === VK_FORMAT_B8G8R8A8_SRGB && fmt.colorSpace === VK_COLORSPACE_SRGB_NONLINEAR_KHR
    ) ?? availableFormats[0]
  )
}

const chooseSwapPresentMode = (presentModes: Int32Array) => {
  return presentModes.find((md) => md === VK_PRESENT_MODE_MAILBOX_KHR) ?? (VK_PRESENT_MODE_FIFO_KHR as VkPresentModeKHR)
}

const chooseSwapExtent = (window: VulkanWindow, capabilities: VkSurfaceCapabilitiesKHR) => {
  if (capabilities.currentExtent!.width != 0xffffffff) {
    return capabilities.currentExtent!
  } else {
    const width = window.frameBufferWidth
    const height = window.frameBufferWidth

    const extent = new VkExtent2D({
      width: Math.min(Math.max(width, capabilities.minImageExtent!.width), capabilities.maxImageExtent!.width),
      height: Math.min(Math.max(height, capabilities.minImageExtent!.height), capabilities.maxImageExtent!.height),
    })

    return extent
  }
}

const createShaderModule = (device: VkDevice, shaderName: string, bytecode: Uint8Array) => {
  const createInfo = new VkShaderModuleCreateInfo({
    codeSize: bytecode.byteLength,
    pCode: bytecode,
  })

  const shaderModule = new VkShaderModule()
  ASSERT_VK_RESULT(
    vkCreateShaderModule(device, createInfo, null, shaderModule),
    `Failed to compile shader: ${shaderName}`
  )

  return [
    shaderModule,
    () => {
      vkDestroyShaderModule(device, shaderModule, null)
    },
  ] as const
}

const copyBuffer = (
  device: VkDevice,
  transferCommandPool: VkCommandPool,
  transferQueue: VkQueue,
  srcBuffer: VkBuffer,
  dstBuffer: VkBuffer,
  size: number
) => {
  const allocInfo = new VkCommandBufferAllocateInfo({
    level: VK_COMMAND_BUFFER_LEVEL_PRIMARY,
    commandPool: transferCommandPool,
    commandBufferCount: 1,
  })

  const transferCommandBuffer = new VkCommandBuffer()
  vkAllocateCommandBuffers(device, allocInfo, [transferCommandBuffer])

  const beginInfo = new VkCommandBufferBeginInfo({
    flags: VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT,
  })
  vkBeginCommandBuffer(transferCommandBuffer, beginInfo)

  const copyRegion = new VkBufferCopy({
    srcOffset: 0,
    dstOffset: 0,
    size,
  })

  vkCmdCopyBuffer(transferCommandBuffer, srcBuffer, dstBuffer, 1, [copyRegion])

  vkEndCommandBuffer(transferCommandBuffer)

  const submitInfo = new VkSubmitInfo({
    commandBufferCount: 1,
    pCommandBuffers: [transferCommandBuffer],
  })

  vkQueueSubmit(transferQueue, 1, [submitInfo], null)
  vkQueueWaitIdle(transferQueue)

  vkFreeCommandBuffers(device, transferCommandPool, 1, [transferCommandBuffer])
}

const createBuffer = (
  physicalDevice: VkPhysicalDevice,
  device: VkDevice,
  queueFamilyIndices: QueueFamilyIndices,
  size: number,
  usage: VkBufferUsageFlagBits,
  properties: VkMemoryPropertyFlagBits
) => {
  const buffer: VkBuffer = new VkBuffer()
  const bufferMemory: VkDeviceMemory = new VkDeviceMemory()

  const bufferInfo = new VkBufferCreateInfo({
    size,
    usage,
    sharingMode: VK_SHARING_MODE_CONCURRENT,
    queueFamilyIndexCount: 2,
    pQueueFamilyIndices: new Uint32Array([queueFamilyIndices.transferFamily!, queueFamilyIndices.graphicsFamily!]),
  })
  ASSERT_VK_RESULT(vkCreateBuffer(device, bufferInfo, null, buffer), 'Unable to create vertex buffer!')

  const memRequirements = new VkMemoryRequirements()
  vkGetBufferMemoryRequirements(device, buffer, memRequirements)

  const allocInfo = new VkMemoryAllocateInfo({
    allocationSize: memRequirements.size,
    memoryTypeIndex: findMemoryType(physicalDevice, memRequirements.memoryTypeBits, properties),
  })

  ASSERT_VK_RESULT(vkAllocateMemory(device, allocInfo, null, bufferMemory), 'Unable to allocate vertex buffer memory!')

  vkBindBufferMemory(device, buffer, bufferMemory, 0)

  return [buffer, bufferMemory] as const
}

const createVertexBuffer = (
  physicalDevice: VkPhysicalDevice,
  device: VkDevice,
  queueFamilyIndices: QueueFamilyIndices,
  transferCommandPool: VkCommandPool,
  transferQueue: VkQueue,
  vertices: Vertex[]
) => {
  const buffer = Vertex.buffer(vertices)

  const [stagingBuffer, stagingBufferMemory] = createBuffer(
    physicalDevice,
    device,
    queueFamilyIndices,
    buffer.byteLength,
    VK_BUFFER_USAGE_TRANSFER_SRC_BIT,
    VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT | VK_MEMORY_PROPERTY_HOST_COHERENT_BIT
  )

  const dataPtr = { $: 0n }
  vkMapMemory(device, stagingBufferMemory, 0, buffer.byteLength, 0, dataPtr)
  memoryCopy(dataPtr.$, buffer.buffer, buffer.byteLength)
  vkUnmapMemory(device, stagingBufferMemory)

  const [vertexBuffer, vertexBufferMemory] = createBuffer(
    physicalDevice,
    device,
    queueFamilyIndices,
    buffer.byteLength,
    VK_BUFFER_USAGE_TRANSFER_DST_BIT | VK_BUFFER_USAGE_VERTEX_BUFFER_BIT,
    VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT
  )

  copyBuffer(device, transferCommandPool, transferQueue, stagingBuffer, vertexBuffer, buffer.byteLength)

  vkDestroyBuffer(device, stagingBuffer, null)
  vkFreeMemory(device, stagingBufferMemory, null)

  return [vertexBuffer, vertexBufferMemory] as const
}

const createIndexBuffer = (
  physicalDevice: VkPhysicalDevice,
  device: VkDevice,
  queueFamilyIndices: QueueFamilyIndices,
  transferCommandPool: VkCommandPool,
  transferQueue: VkQueue,
  indices: number[]
) => {
  const buffer = new Uint16Array(indices)
  const [stagingBuffer, stagingBufferMemory] = createBuffer(
    physicalDevice,
    device,
    queueFamilyIndices,
    buffer.byteLength,
    VK_BUFFER_USAGE_TRANSFER_SRC_BIT,
    VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT | VK_MEMORY_PROPERTY_HOST_COHERENT_BIT
  )

  const dataPtr = { $: 0n }
  vkMapMemory(device, stagingBufferMemory, 0, buffer.byteLength, 0, dataPtr)
  memoryCopy(dataPtr.$, buffer.buffer, buffer.byteLength)
  vkUnmapMemory(device, stagingBufferMemory)

  const [indexBuffer, indexBufferMemory] = createBuffer(
    physicalDevice,
    device,
    queueFamilyIndices,
    buffer.byteLength,
    VK_BUFFER_USAGE_TRANSFER_DST_BIT | VK_BUFFER_USAGE_INDEX_BUFFER_BIT,
    VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT
  )

  copyBuffer(device, transferCommandPool, transferQueue, stagingBuffer, indexBuffer, buffer.byteLength)

  vkDestroyBuffer(device, stagingBuffer, null)
  vkFreeMemory(device, stagingBufferMemory, null)

  return [indexBuffer, indexBufferMemory] as const
}

const initVulkan = (
  windowSize: { x: number; y: number } = { x: 1920, y: 1080 },
  windowTitle: string = 'typescript-example',
  validationLayers: string[] = ['VK_LAYER_KHRONOS_validation'],
  extensions: string[] = [(VK_KHR_SWAPCHAIN_EXTENSION_NAME as unknown) as string]
) => {
  let window: VulkanWindow
  let instance: VkInstance
  let enabledValidationLayers: string[]
  let physicalDevice: VkPhysicalDevice
  let physicalDeviceProperties: VkPhysicalDeviceProperties
  let physicalDeviceFeatures: VkPhysicalDeviceFeatures
  let surface: VkSurfaceKHR
  let device: VkDevice
  let swapChainSupportDetails: SwapChainSupportDetails
  let queueFamilyIndices: QueueFamilyIndices
  let presentQueue: VkQueue
  let graphicsQueue: VkQueue
  let transferQueue: VkQueue
  let swapChain: VkSwapchainKHR
  let swapChainImages: VkImage[]
  let surfaceFormat: VkSurfaceFormatKHR
  let presentMode: VkPresentModeKHR
  let swapChainImageExtent: VkExtent2D
  let swapChainImageViews: VkImageView[]
  let renderPass: VkRenderPass
  let descriptorSetLayout: VkDescriptorSetLayout
  let pipelineLayout: VkPipelineLayout
  let graphicsPipeline: VkPipeline
  let swapChainFramebuffers: VkFramebuffer[]
  let graphicsCommandPool: VkCommandPool
  let graphicsCommandBuffers: VkCommandBuffer[]
  let transferCommandPool: VkCommandPool
  let imageAvailableSemaphores: VkSemaphore[]
  let rendererFinishedSemaphores: VkSemaphore[]
  let inFlightFences: VkFence[]
  let imagesInFlight: (VkFence | null)[]
  let framebufferResized = false
  let vertexBuffer: VkBuffer
  let vertexBufferMemory: VkDeviceMemory
  let indexBuffer: VkBuffer
  let indexBufferMemory: VkDeviceMemory
  let uniformBuffers: VkBuffer[]
  let uniformBuffersMemory: VkDeviceMemory[]

  const vertices = [
    new Vertex([-0.5, -0.5], [1.0, 1.0, 1.0]),
    new Vertex([0.5, -0.5], [0.0, 1.0, 0.0]),
    new Vertex([0.5, 0.5], [0.0, 0.0, 1.0]),
    new Vertex([-0.5, 0.5], [1.0, 0.0, 0.0]),
  ]
  const indices = [0, 1, 2, 2, 3, 0]

  const uniforms = new UniformBufferObject(
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]
  )

  const findQueueFamilies = (): void => {
    queueFamilyIndices = new QueueFamilyIndices()
    const queueFamilyCount = { $: 0 }
    vkGetPhysicalDeviceQueueFamilyProperties(physicalDevice, queueFamilyCount, null)

    const queueFamilies = new Array(queueFamilyCount.$).fill(null).map(() => new VkQueueFamilyProperties())
    vkGetPhysicalDeviceQueueFamilyProperties(physicalDevice, queueFamilyCount, queueFamilies)

    queueFamilies.map((queueFamily, index) => {
      console.log(`Graphics Queue Family ${index}`)
      console.log(`VK_QUEUE_GRAPHICS_BIT: ${(queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) !== 0}`)
      console.log(`VK_QUEUE_COMPUTE_BIT: ${(queueFamily.queueFlags & VK_QUEUE_COMPUTE_BIT) !== 0}`)
      console.log(`VK_QUEUE_TRANSFER_BIT: ${(queueFamily.queueFlags & VK_QUEUE_TRANSFER_BIT) !== 0}`)
      console.log(`VK_QUEUE_SPARSE_BINDING_BIT: ${(queueFamily.queueFlags & VK_QUEUE_SPARSE_BINDING_BIT) !== 0}`)
      console.log(`Count: ${queueFamily.queueCount}`)
      console.log(`TS valid bits: ${queueFamily.timestampValidBits}`)
    })

    for (let i = 0; i < queueFamilies.length; ++i) {
      const queueFamily = queueFamilies[i]
      if (queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) {
        queueFamilyIndices.graphicsFamily = i
      } else if (queueFamily.queueFlags & VK_QUEUE_TRANSFER_BIT & ~VK_QUEUE_GRAPHICS_BIT) {
        queueFamilyIndices.transferFamily = i
      }

      const presentSupport = { $: false }
      vkGetPhysicalDeviceSurfaceSupportKHR(physicalDevice, i, surface, presentSupport)

      if (presentSupport.$) {
        queueFamilyIndices.presentFamily = i
      }

      if (queueFamilyIndices.isComplete()) {
        break
      }
    }
  }

  const createWindow = (): void => {
    window = new VulkanWindow({
      width: windowSize.x,
      height: windowSize.y,
      title: windowTitle,
    })

    window.onresize = (ev) => {
      framebufferResized = true
    }
  }

  const createInstance = (): void => {
    instance = new VkInstance()

    const appInfo = new VkApplicationInfo({
      pApplicationName: 'Hello!',
      applicationVersion: VK_MAKE_VERSION(1, 0, 0),
      pEngineName: 'No Engine',
      engineVersion: VK_MAKE_VERSION(1, 0, 0),
      apiVersion: VK_MAKE_VERSION(1, 2, 0),
    })

    const instanceExtensions = window.getRequiredInstanceExtensions()
    instanceExtensions.push((VK_EXT_DEBUG_UTILS_EXTENSION_NAME as unknown) as string)

    const instanceInfo = new VkInstanceCreateInfo({
      pApplicationInfo: appInfo,
      enabledLayerCount: validationLayers.length,
      ppEnabledLayerNames: validationLayers,
      enabledExtensionCount: instanceExtensions.length,
      ppEnabledExtensionNames: instanceExtensions,
      pNext: null,
    })

    ASSERT_VK_RESULT(vkCreateInstance(instanceInfo, null, instance), 'Failed to create VkInstance!')

    const layerCount = { $: 0 }
    vkEnumerateInstanceLayerProperties(layerCount, null)
    const constAvailableLayers = new Array(layerCount.$).fill(null).map(() => new VkLayerProperties())
    vkEnumerateInstanceLayerProperties(layerCount, constAvailableLayers)

    enabledValidationLayers = validationLayers.filter((layerName) =>
      constAvailableLayers.some((availableLayer) => availableLayer.layerName === layerName)
    )
    if (enabledValidationLayers.length !== validationLayers.length) {
      throw new Error(
        `Not all validation layers are present: Expected: [${validationLayers.join(
          ', '
        )}], found: [${enabledValidationLayers.join(', ')}]`
      )
    }
  }

  const pickPhysicalDevice = (): void => {
    const deviceCount = { $: 0 }
    vkEnumeratePhysicalDevices(instance, deviceCount, null)
    if (deviceCount.$ <= 0) {
      throw new Error('Failed to find GPUs with Vulkan support!')
    }

    const physicalDevices = new Array(deviceCount.$).fill(null).map(() => new VkPhysicalDevice())
    vkEnumeratePhysicalDevices(instance, deviceCount, physicalDevices)

    for (const device of physicalDevices) {
      const { suitable, properties, features, swapChainSupport } = isDeviceSuitable(device, surface, extensions)
      if (suitable) {
        physicalDevice = device
        physicalDeviceProperties = properties
        physicalDeviceFeatures = features
        swapChainSupportDetails = swapChainSupport
      }
    }

    if (physicalDevice == null) {
      throw new Error('Unable to find a suitable GPU!')
    }
  }

  const createLogicalDevice = (): void => {
    const queuePriority = new Float32Array([1.0])
    const uniqueQueueFamilies = Array.from(
      new Set([queueFamilyIndices.graphicsFamily, queueFamilyIndices.presentFamily, queueFamilyIndices.transferFamily])
    )
    const queueCreateInfos: VkDeviceQueueCreateInfo[] = uniqueQueueFamilies.map(
      (index) =>
        new VkDeviceQueueCreateInfo({
          queueFamilyIndex: index!,
          queueCount: 1,
          pQueuePriorities: queuePriority,
        })
    )

    const deviceCreateInfo = new VkDeviceCreateInfo({
      pQueueCreateInfos: queueCreateInfos,
      queueCreateInfoCount: queueCreateInfos.length,
      pEnabledFeatures: physicalDeviceFeatures,
      enabledExtensionCount: extensions.length,
      ppEnabledExtensionNames: extensions,
      enabledLayerCount: enabledValidationLayers.length,
      ppEnabledLayerNames: enabledValidationLayers,
    })

    device = new VkDevice()
    ASSERT_VK_RESULT(
      vkCreateDevice(physicalDevice, deviceCreateInfo, null, device),
      'Unable to create a logical device!'
    )

    graphicsQueue = new VkQueue()
    vkGetDeviceQueue(device, queueFamilyIndices.graphicsFamily!, 0, graphicsQueue)

    presentQueue = new VkQueue()
    vkGetDeviceQueue(device, queueFamilyIndices.presentFamily!, 0, presentQueue)

    transferQueue = new VkQueue()
    vkGetDeviceQueue(device, queueFamilyIndices.transferFamily!, 0, transferQueue)
  }

  const createSurface = (): void => {
    surface = new VkSurfaceKHR()
    ASSERT_VK_RESULT(window.createSurface(instance, null, surface), 'Unable to create window surface!')
  }

  const createSwapChain = (): void => {
    swapChainSupportDetails = querySwapChainSupport(physicalDevice, surface)

    surfaceFormat = chooseSwapSurfaceFormat(swapChainSupportDetails.formats)
    presentMode = chooseSwapPresentMode(swapChainSupportDetails.presentModes)
    swapChainImageExtent = chooseSwapExtent(window, swapChainSupportDetails.capabilities)

    let imageCount = swapChainSupportDetails.capabilities.minImageCount + 1

    if (
      swapChainSupportDetails.capabilities.maxImageCount > 0 &&
      imageCount > swapChainSupportDetails.capabilities.maxImageCount
    ) {
      imageCount = swapChainSupportDetails.capabilities.maxImageCount
    }

    // TODO: don't stop rendering when recreating the swapchain
    // const oldSwapchain = swapChain ?? null
    // TODO: don't forget to destroy the old chain as soon as it is done rendering
    // take a look at https://github.com/maierfelix/nvk-examples/blob/2df94966360aa66d320d77d6ff3c56142ec2c9c5/cube/index.mjs

    const swapChainCreatInfo = new VkSwapchainCreateInfoKHR({
      surface,
      minImageCount: imageCount,
      imageFormat: surfaceFormat.format,
      imageColorSpace: surfaceFormat.colorSpace,
      imageExtent: swapChainImageExtent,
      imageArrayLayers: 1,
      imageUsage: VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT,
      // oldSwapchain,
    })

    if (queueFamilyIndices.graphicsFamily != queueFamilyIndices.presentFamily) {
      swapChainCreatInfo.imageSharingMode = VK_SHARING_MODE_CONCURRENT
      swapChainCreatInfo.queueFamilyIndexCount = 3
      swapChainCreatInfo.pQueueFamilyIndices = new Uint32Array([
        queueFamilyIndices.graphicsFamily!,
        queueFamilyIndices.presentFamily!,
        queueFamilyIndices.transferFamily!,
      ])
    } else {
      swapChainCreatInfo.imageSharingMode = VK_SHARING_MODE_EXCLUSIVE
      swapChainCreatInfo.queueFamilyIndexCount = 2
      swapChainCreatInfo.pQueueFamilyIndices = new Uint32Array([
        queueFamilyIndices.graphicsFamily!,
        queueFamilyIndices.transferFamily!,
      ])
    }

    swapChainCreatInfo.preTransform = swapChainSupportDetails.capabilities.currentTransform
    swapChainCreatInfo.compositeAlpha = VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR
    swapChainCreatInfo.presentMode = presentMode
    swapChainCreatInfo.clipped = true
    swapChainCreatInfo.oldSwapchain = null

    swapChain = new VkSwapchainKHR()
    ASSERT_VK_RESULT(vkCreateSwapchainKHR(device, swapChainCreatInfo, null, swapChain), 'Unable to create a swap chain')

    const actualImagesCount = { $: 0 }
    vkGetSwapchainImagesKHR(device, swapChain, actualImagesCount, null)
    swapChainImages = new Array(actualImagesCount.$).fill(0).map(() => new VkImage())
    vkGetSwapchainImagesKHR(device, swapChain, actualImagesCount, swapChainImages)
  }

  const cleanupSwapChain = (): void => {
    vkDeviceWaitIdle(device)

    for (const framebuffer of swapChainFramebuffers) {
      vkDestroyFramebuffer(device, framebuffer, null)
    }
    swapChainFramebuffers = []

    vkFreeCommandBuffers(device, graphicsCommandPool, graphicsCommandBuffers.length, graphicsCommandBuffers)
    graphicsCommandBuffers = []

    vkDestroyPipeline(device, graphicsPipeline, null)
    graphicsPipeline = VK_NULL_HANDLE as any
    vkDestroyPipelineLayout(device, pipelineLayout, null)
    pipelineLayout = VK_NULL_HANDLE as any
    vkDestroyRenderPass(device, renderPass, null)
    renderPass = VK_NULL_HANDLE as any

    for (const imageView of swapChainImageViews) {
      vkDestroyImageView(device, imageView, null)
    }
    swapChainImageViews = []

    vkDestroySwapchainKHR(device, swapChain, null)
    swapChain = VK_NULL_HANDLE as any

    for (let i = 0; i < uniformBuffers.length; ++i) {
      vkDestroyBuffer(device, uniformBuffers[i], null)
      vkFreeMemory(device, uniformBuffersMemory[i], null)
    }
    uniformBuffers = []
    uniformBuffersMemory = []
  }

  const createImageViews = (): void => {
    swapChainImageViews = new Array(swapChainImages.length).fill(0).map(() => new VkImageView())

    for (let i = 0; i < swapChainImages.length; ++i) {
      const createInfo = new VkImageViewCreateInfo({
        image: swapChainImages[i],
        viewType: VK_IMAGE_VIEW_TYPE_2D,
        format: surfaceFormat.format,
        components: new VkComponentMapping({
          r: VK_COMPONENT_SWIZZLE_IDENTITY,
          g: VK_COMPONENT_SWIZZLE_IDENTITY,
          b: VK_COMPONENT_SWIZZLE_IDENTITY,
          a: VK_COMPONENT_SWIZZLE_IDENTITY,
        }),
        subresourceRange: new VkImageSubresourceRange({
          aspectMask: VK_IMAGE_ASPECT_COLOR_BIT,
          baseMipLevel: 0,
          levelCount: 1,
          baseArrayLayer: 0,
          layerCount: 1,
        }),
      })
      ASSERT_VK_RESULT(
        vkCreateImageView(device, createInfo, null, swapChainImageViews[i]),
        `Unable to create an image view for swapchain image under index ${i}`
      )
    }
  }

  const createRenderPass = (): void => {
    const colorAttachment = new VkAttachmentDescription({
      format: surfaceFormat.format,
      samples: VK_SAMPLE_COUNT_1_BIT,
      loadOp: VK_ATTACHMENT_LOAD_OP_CLEAR,
      storeOp: VK_ATTACHMENT_STORE_OP_STORE,
      stencilLoadOp: VK_ATTACHMENT_LOAD_OP_DONT_CARE,
      stencilStoreOp: VK_ATTACHMENT_STORE_OP_DONT_CARE,
      initialLayout: VK_IMAGE_LAYOUT_UNDEFINED,
      finalLayout: VK_IMAGE_LAYOUT_PRESENT_SRC_KHR,
    })

    const colorAttachmentRef = new VkAttachmentReference({
      attachment: 0,
      layout: VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
    })

    const subpass = new VkSubpassDescription({
      pipelineBindPoint: VK_PIPELINE_BIND_POINT_GRAPHICS,
      colorAttachmentCount: 1,
      // layout(location = 0) out vec4 outColor maps to the first element of this array
      pColorAttachments: [colorAttachmentRef],
    })

    const dependency = new VkSubpassDependency({
      srcSubpass: VK_SUBPASS_EXTERNAL,
      dstSubpass: 0,
      srcStageMask: VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT,
      srcAccessMask: 0,
      dstStageMask: VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT,
      dstAccessMask: VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT,
    })

    renderPass = new VkRenderPass()
    const renderPassCreateInfo = new VkRenderPassCreateInfo({
      attachmentCount: 1,
      pAttachments: [colorAttachment],
      subpassCount: 1,
      pSubpasses: [subpass],
      dependencyCount: 1,
      pDependencies: [dependency],
    })
    ASSERT_VK_RESULT(
      vkCreateRenderPass(device, renderPassCreateInfo, null, renderPass),
      'Unable to create a render pass!'
    )
  }

  const createDescriptorSetLayout = (): void => {
    const uboLayoutBinding = new VkDescriptorSetLayoutBinding({
      binding: 0,
      descriptorType: VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
      descriptorCount: 1,
      stageFlags: VK_SHADER_STAGE_VERTEX_BIT,
      pImmutableSamplers: null,
    })

    const layoutInfo = new VkDescriptorSetLayoutCreateInfo({
      bindingCount: 1,
      pBindings: [uboLayoutBinding],
    })
    descriptorSetLayout = new VkDescriptorSetLayout()
    ASSERT_VK_RESULT(
      vkCreateDescriptorSetLayout(device, layoutInfo, null, descriptorSetLayout),
      'Unable do create descriptor set layout!'
    )
  }

  const createGraphicsPipeline = (): void => {
    const vertShader = GLSL.toSPIRVSync({
      source: fs.readFileSync(path.resolve(__dirname, 'shaders/triangle.vert')),
      extension: 'vert',
      includeDirectories: [path.resolve(__dirname, 'shaders/include')],
    })
    if (vertShader.error) {
      throw vertShader.error
    }
    const fragShader = GLSL.toSPIRVSync({
      source: fs.readFileSync(path.resolve(__dirname, 'shaders/triangle.frag')),
      extension: 'frag',
      includeDirectories: [path.resolve(__dirname, 'shaders/include')],
    })
    if (fragShader.error) {
      throw fragShader.error
    }

    const [vertShaderModule, destroyVertShaderModule] = createShaderModule(device, 'triangle.vert', vertShader.output)
    const [fragShaderModule, destroyFragShaderModule] = createShaderModule(device, 'triangle.frag', fragShader.output)

    const vertShaderStageInfo = new VkPipelineShaderStageCreateInfo({
      stage: VK_SHADER_STAGE_VERTEX_BIT,
      module: vertShaderModule,
      pName: 'main',
    })

    const fragShaderStageInfo = new VkPipelineShaderStageCreateInfo({
      stage: VK_SHADER_STAGE_FRAGMENT_BIT,
      module: fragShaderModule,
      pName: 'main',
    })

    const shaderStages = [vertShaderStageInfo, fragShaderStageInfo]

    const bindingDescription = Vertex.getBindingDescription()
    const attributeDescriptions = Vertex.getAttributeDescriptions()

    const vertexInputInfo = new VkPipelineVertexInputStateCreateInfo({
      vertexBindingDescriptionCount: 1,
      vertexAttributeDescriptionCount: attributeDescriptions.length,
      pVertexBindingDescriptions: [bindingDescription],
      pVertexAttributeDescriptions: attributeDescriptions,
    })

    const inputAssembly = new VkPipelineInputAssemblyStateCreateInfo({
      topology: VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST,
      primitiveRestartEnable: false,
    })

    const viewport = new VkViewport({
      x: 0.0,
      y: 0.0,
      width: swapChainImageExtent.width,
      height: swapChainImageExtent.height,
      minDepth: 0.0,
      maxDepth: 1.0,
    })

    const scissor = new VkRect2D({
      offset: new VkOffset2D({
        x: 0,
        y: 0,
      }),
      extent: swapChainImageExtent,
    })

    const viewportState = new VkPipelineViewportStateCreateInfo({
      viewportCount: 1,
      pViewports: [viewport],
      scissorCount: 1,
      pScissors: [scissor],
    })

    const rasterizer = new VkPipelineRasterizationStateCreateInfo({
      depthClampEnable: false,
      rasterizerDiscardEnable: false,
      polygonMode: VK_POLYGON_MODE_FILL,
      lineWidth: 1.0,
      cullMode: VK_CULL_MODE_BACK_BIT,
      frontFace: VK_FRONT_FACE_CLOCKWISE,
      depthBiasEnable: false,
      depthBiasConstantFactor: 0.0,
      depthBiasClamp: 0.0,
      depthBiasSlopeFactor: 0.0,
    })

    const multisampling = new VkPipelineMultisampleStateCreateInfo({
      sampleShadingEnable: false,
      rasterizationSamples: VK_SAMPLE_COUNT_1_BIT,
      minSampleShading: 1.0,
      pSampleMask: null,
      alphaToCoverageEnable: false,
      alphaToOneEnable: false,
    })

    // NOTE: Additive alpha blending
    const colorBlendAttachment = new VkPipelineColorBlendAttachmentState({
      colorWriteMask:
        VK_COLOR_COMPONENT_R_BIT | VK_COLOR_COMPONENT_G_BIT | VK_COLOR_COMPONENT_B_BIT | VK_COLOR_COMPONENT_A_BIT,
      blendEnable: true,
      srcColorBlendFactor: VK_BLEND_FACTOR_SRC_ALPHA,
      dstColorBlendFactor: VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA,
      colorBlendOp: VK_BLEND_OP_ADD,
      srcAlphaBlendFactor: VK_BLEND_FACTOR_ONE,
      dstAlphaBlendFactor: VK_BLEND_FACTOR_ZERO,
      alphaBlendOp: VK_BLEND_OP_ADD,
    })

    const colorBlending = new VkPipelineColorBlendStateCreateInfo({
      logicOpEnable: false,
      logicOp: VK_LOGIC_OP_COPY,
      attachmentCount: 1,
      pAttachments: [colorBlendAttachment],
      blendConstants: [0.0, 0.0, 0.0, 0.0],
    })

    const dynamicStates = new Int32Array([
      VK_DYNAMIC_STATE_VIEWPORT,
      VK_DYNAMIC_STATE_LINE_WIDTH,
      VK_DYNAMIC_STATE_BLEND_CONSTANTS,
    ])

    const dynamicState = new VkPipelineDynamicStateCreateInfo({
      dynamicStateCount: dynamicStates.length,
      pDynamicStates: dynamicStates,
    })

    pipelineLayout = new VkPipelineLayout()

    const pipelineLayoutCreateInfo = new VkPipelineLayoutCreateInfo({
      setLayoutCount: 1,
      pSetLayouts: [descriptorSetLayout],
      pushConstantRangeCount: 0,
      pPushConstantRanges: null,
    })
    ASSERT_VK_RESULT(
      vkCreatePipelineLayout(device, pipelineLayoutCreateInfo, null, pipelineLayout),
      'Unable to create pipeline layout!'
    )

    const pipelineCreateInfo = new VkGraphicsPipelineCreateInfo({
      stageCount: 2,
      pStages: shaderStages,

      pVertexInputState: vertexInputInfo,
      pInputAssemblyState: inputAssembly,
      pViewportState: viewportState,
      pRasterizationState: rasterizer,
      pMultisampleState: multisampling,
      pDepthStencilState: null,
      pColorBlendState: colorBlending,
      pDynamicState: null,

      layout: pipelineLayout,
      renderPass: renderPass,
      subpass: 0,
      // bottom two are used only if flags VK_PIPELINE_CREATE_DERIVATIVE_BIT
      // is specified, used to inherit from already existing pipelines
      basePipelineHandle: null,
      basePipelineIndex: -1,
    })

    graphicsPipeline = new VkPipeline()
    ASSERT_VK_RESULT(
      vkCreateGraphicsPipelines(device, null, 1, [pipelineCreateInfo], null, [graphicsPipeline]),
      'Unable to create a graphics pipeline!'
    )

    destroyVertShaderModule()
    destroyFragShaderModule()
  }

  const createFramebuffers = (): void => {
    swapChainFramebuffers = new Array(swapChainImageViews.length).fill(0).map(() => new VkFramebuffer())

    for (let i = 0; i < swapChainImageViews.length; ++i) {
      const framebufferInfo = new VkFramebufferCreateInfo({
        renderPass: renderPass,
        attachmentCount: 1,
        pAttachments: [swapChainImageViews[i]],
        width: swapChainImageExtent.width,
        height: swapChainImageExtent.height,
        layers: 1,
      })

      ASSERT_VK_RESULT(
        vkCreateFramebuffer(device, framebufferInfo, null, swapChainFramebuffers[i]),
        `Unable to create a swapchain framebuffer at index ${i}`
      )
    }
  }

  const createCommandPools = (): void => {
    const graphicsPoolCreateInfo = new VkCommandPoolCreateInfo({
      queueFamilyIndex: queueFamilyIndices.graphicsFamily!,
      flags: 0,
    })
    graphicsCommandPool = new VkCommandPool()
    ASSERT_VK_RESULT(
      vkCreateCommandPool(device, graphicsPoolCreateInfo, null, graphicsCommandPool),
      'Unable to create graphics command pool'
    )

    const transferPoolCreateInfo = new VkCommandPoolCreateInfo({
      queueFamilyIndex: queueFamilyIndices.transferFamily!,
      flags: 0,
    })
    transferCommandPool = new VkCommandPool()
    ASSERT_VK_RESULT(
      vkCreateCommandPool(device, transferPoolCreateInfo, null, transferCommandPool),
      'Unable to create transfer command pool'
    )
  }

  const createIndexedVertexBuffer = (): void => {
    ;[vertexBuffer, vertexBufferMemory] = createVertexBuffer(
      physicalDevice,
      device,
      queueFamilyIndices,
      transferCommandPool,
      transferQueue,
      vertices
    )
    ;[indexBuffer, indexBufferMemory] = createIndexBuffer(
      physicalDevice,
      device,
      queueFamilyIndices,
      transferCommandPool,
      transferQueue,
      indices
    )
  }

  const createUniformBuffers = (): void => {
    const bufferSize = uniforms.data.byteLength

    uniformBuffers = []
    uniformBuffersMemory = []
    for (let i = 0; i < swapChainImages.length; ++i) {
      const [buffer, memory] = createBuffer(
        physicalDevice,
        device,
        queueFamilyIndices,
        bufferSize,
        VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT,
        VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT | VK_MEMORY_PROPERTY_HOST_COHERENT_BIT
      )
      uniformBuffers.push(buffer)
      uniformBuffersMemory.push(memory)
    }
  }

  const createCommandBuffers = (): void => {
    graphicsCommandBuffers = new Array(swapChainFramebuffers.length).fill(0).map(() => new VkCommandBuffer())
    const graphicsAllocInfo = new VkCommandBufferAllocateInfo({
      commandPool: graphicsCommandPool,
      level: VK_COMMAND_BUFFER_LEVEL_PRIMARY,
      commandBufferCount: graphicsCommandBuffers.length,
    })
    ASSERT_VK_RESULT(
      vkAllocateCommandBuffers(device, graphicsAllocInfo, graphicsCommandBuffers),
      'Unable to allocate graphics command buffers!'
    )

    for (let i = 0; i < graphicsCommandBuffers.length; ++i) {
      const beginInfo = new VkCommandBufferBeginInfo({
        flags: 0,
        pInheritanceInfo: null,
      })

      ASSERT_VK_RESULT(
        vkBeginCommandBuffer(graphicsCommandBuffers[i], beginInfo),
        `Unable to begin recording a command buffer under index ${i}`
      )

      const clearColor = new VkClearValue({
        color: new VkClearColorValue({ float32: [0.0, 0.0, 0.0, 0.0] }),
      })
      const renderPassInfo = new VkRenderPassBeginInfo({
        renderPass,
        framebuffer: swapChainFramebuffers[i],
        renderArea: new VkRect2D({
          offset: new VkOffset2D({ x: 0, y: 0 }),
          extent: swapChainImageExtent,
        }),
        clearValueCount: 1,
        pClearValues: [clearColor],
      })

      vkCmdBeginRenderPass(graphicsCommandBuffers[i], renderPassInfo, VK_SUBPASS_CONTENTS_INLINE)

      vkCmdBindPipeline(graphicsCommandBuffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, graphicsPipeline)

      // TODO: report to repo nvk has broken typings for BigUint64Array
      vkCmdBindVertexBuffers(graphicsCommandBuffers[i], 0, 1, [vertexBuffer], new BigUint64Array([0n]) as any)

      vkCmdBindIndexBuffer(graphicsCommandBuffers[i], indexBuffer, 0n, VK_INDEX_TYPE_UINT16)

      // vkCmdDraw(graphicsCommandBuffers[i], vertices.length, 1, 0, 0)
      vkCmdDrawIndexed(graphicsCommandBuffers[i], indices.length, 1, 0, 0, 0)

      vkCmdEndRenderPass(graphicsCommandBuffers[i])

      ASSERT_VK_RESULT(vkEndCommandBuffer(graphicsCommandBuffers[i]), `Unable to record command buffer at index ${i}`)
    }
  }

  const createSyncObjects = (): void => {
    const semaphoreCreateInfo = new VkSemaphoreCreateInfo()
    imageAvailableSemaphores = new Array(MAX_FRAMES_IN_FLIGHT).fill(0).map(() => new VkSemaphore())
    rendererFinishedSemaphores = new Array(MAX_FRAMES_IN_FLIGHT).fill(0).map(() => new VkSemaphore())
    const fenceCreateInfo = new VkFenceCreateInfo({
      flags: VK_FENCE_CREATE_SIGNALED_BIT,
    })
    inFlightFences = new Array(MAX_FRAMES_IN_FLIGHT).fill(0).map(() => new VkFence())
    imagesInFlight = new Array(swapChainImages.length).fill(0).map(() => null)

    for (let i = 0; i < MAX_FRAMES_IN_FLIGHT; ++i) {
      ASSERT_VK_RESULT(
        vkCreateSemaphore(device, semaphoreCreateInfo, null, imageAvailableSemaphores[i]),
        `Failed to create imageAvailableSemaphores[${i}]!`
      )
      ASSERT_VK_RESULT(
        vkCreateSemaphore(device, semaphoreCreateInfo, null, rendererFinishedSemaphores[i]),
        `Failed to create rendererFinishedSemaphores[${i}]!`
      )
      ASSERT_VK_RESULT(
        vkCreateFence(device, fenceCreateInfo, null, inFlightFences[i]),
        `Failed to create inFlightFences[${i}]!`
      )
    }
  }

  const recreateSwapChain = (): void => {
    while (window.width === 0 || window.height === 0) {
      window.pollEvents()
    }

    cleanupSwapChain()
    createSwapChain()
    createImageViews()
    createRenderPass()
    createGraphicsPipeline()
    createFramebuffers()
    createUniformBuffers()
    createCommandBuffers()
  }

  const updateUniformBuffer = (currentImage: number) => {
    const angle = Math.sin(performance.now() * 0.001)

    const ca = Math.cos(angle)
    const sa = Math.sin(angle)
    uniforms.model = [ca, sa, 0.0, 0.0, -sa, ca, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]

    const dataPtr = { $: 0n }
    vkMapMemory(device, uniformBuffersMemory[currentImage], 0, uniforms.data.byteLength, 0, dataPtr)
    memoryCopy(dataPtr.$, uniforms.data.buffer, uniforms.data.byteLength)
    vkUnmapMemory(device, uniformBuffersMemory[currentImage])
  }

  let currentFrame = 0
  const drawFrame = () => {
    vkWaitForFences(device, 1, [inFlightFences[currentFrame]], true, Number.MAX_SAFE_INTEGER)

    const imageIndex = { $: 0 }
    let result = vkAcquireNextImageKHR(
      device,
      swapChain,
      Number.MAX_SAFE_INTEGER,
      imageAvailableSemaphores[currentFrame],
      null,
      imageIndex
    )
    if (result === VK_ERROR_OUT_OF_DATE_KHR) {
      recreateSwapChain()
      return
    } else if (result != VK_SUCCESS && result != VK_SUBOPTIMAL_KHR) {
      ASSERT_VK_RESULT(result, 'Unable to acquire swap chain image!')
    }

    const fence = imagesInFlight[imageIndex.$]
    if (fence != null) {
      vkWaitForFences(device, 1, [fence], true, Number.MAX_SAFE_INTEGER)
    }
    imagesInFlight[imageIndex.$] = inFlightFences[currentFrame]

    updateUniformBuffer(imageIndex.$)

    const waitStages = new Int32Array([VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT])
    const submitInfo = new VkSubmitInfo({
      waitSemaphoreCount: 1,
      pWaitSemaphores: [imageAvailableSemaphores[currentFrame]],
      pWaitDstStageMask: waitStages,
      commandBufferCount: 1,
      pCommandBuffers: [graphicsCommandBuffers[imageIndex.$]],
      signalSemaphoreCount: 1,
      pSignalSemaphores: [rendererFinishedSemaphores[currentFrame]],
    })

    vkResetFences(device, 1, [inFlightFences[currentFrame]])
    ASSERT_VK_RESULT(
      vkQueueSubmit(graphicsQueue, 1, [submitInfo], inFlightFences[currentFrame]),
      'Unable to submit draw command buffer!'
    )

    const presentInfo = new VkPresentInfoKHR({
      waitSemaphoreCount: 1,
      pWaitSemaphores: [rendererFinishedSemaphores[currentFrame]],
      swapchainCount: 1,
      pSwapchains: [swapChain],
      pImageIndices: new Uint32Array([imageIndex.$]),
      pResults: null,
    })

    result = vkQueuePresentKHR(presentQueue, presentInfo)
    if (result === VK_ERROR_OUT_OF_DATE_KHR || result === VK_SUBOPTIMAL_KHR || framebufferResized) {
      framebufferResized = false
      recreateSwapChain()
    } else {
      ASSERT_VK_RESULT(result, 'Unable to present swap chain image!')
    }

    currentFrame = (currentFrame + 1) % MAX_FRAMES_IN_FLIGHT
  }

  createWindow()
  createInstance()
  createSurface()
  pickPhysicalDevice()
  findQueueFamilies()
  createLogicalDevice()
  createSwapChain()
  createImageViews()
  createRenderPass()
  createDescriptorSetLayout()
  createGraphicsPipeline()
  createFramebuffers()
  createCommandPools()
  createIndexedVertexBuffer()
  createUniformBuffers()
  createCommandBuffers()
  createSyncObjects()

  const cleanup = () => {
    cleanupSwapChain()

    vkDestroyDescriptorSetLayout(device, descriptorSetLayout, null)

    vkDestroyBuffer(device, indexBuffer, null)
    vkFreeMemory(device, indexBufferMemory, null)

    vkDestroyBuffer(device, vertexBuffer, null)
    vkFreeMemory(device, vertexBufferMemory, null)

    for (let i = 0; i < MAX_FRAMES_IN_FLIGHT; ++i) {
      vkDestroySemaphore(device, rendererFinishedSemaphores[i], null)
      vkDestroySemaphore(device, imageAvailableSemaphores[i], null)
      vkDestroyFence(device, inFlightFences[i], null)
    }
    rendererFinishedSemaphores = []
    imageAvailableSemaphores = []
    inFlightFences = []

    vkDestroyCommandPool(device, transferCommandPool, null)
    transferCommandPool = null!
    vkDestroyCommandPool(device, graphicsCommandPool, null)
    graphicsCommandPool = null!
    vkDestroyDevice(device, null)
    device = null!
    vkDestroySurfaceKHR(instance, surface, null)
    surface = null!
    vkDestroyInstance(instance, null)
    instance = null!
  }

  window!.onclose = () => {
    cleanup()
  }

  let lastFrame = performance.now()

  const loop = () => {
    if (!window.shouldClose()) {
      const now = performance.now()
      const delta = now - lastFrame
      drawFrame()
      window.pollEvents()
      window.title = `${windowTitle} - ${delta.toFixed(2)}ms - ${(1000 / delta).toFixed(2)}`
      lastFrame = now

      setTimeout(loop, 0)
    }
  }

  return { loop }
}

export const run = () => {
  const { loop } = initVulkan()

  loop()
}
