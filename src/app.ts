import fs from 'fs'
import path from 'path'
import {
  VkApplicationInfo,
  vkCreateInstance,
  vkDestroyInstance,
  vkEnumerateInstanceLayerProperties,
  VkInstance,
  VkInstanceCreateInfo,
  VkLayerProperties,
  VkPhysicalDevice,
  vkEnumeratePhysicalDevices,
  VK_EXT_DEBUG_UTILS_EXTENSION_NAME,
  VK_MAKE_VERSION,
  VK_NULL_HANDLE,
  VulkanWindow,
  VkPhysicalDeviceProperties,
  vkGetPhysicalDeviceProperties,
  VkPhysicalDeviceFeatures,
  vkGetPhysicalDeviceFeatures,
  VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU,
  vkGetPhysicalDeviceQueueFamilyProperties,
  VkQueueFamilyProperties,
  VK_QUEUE_GRAPHICS_BIT,
  VkDevice,
  VkDeviceQueueCreateInfo,
  VkDeviceCreateInfo,
  vkCreateDevice,
  vkDestroyDevice,
  VkQueue,
  vkGetDeviceQueue,
  VK_QUEUE_COMPUTE_BIT,
  VK_QUEUE_TRANSFER_BIT,
  VK_QUEUE_SPARSE_BINDING_BIT,
  VkSurfaceKHR,
  vkDestroySurfaceKHR,
  vkGetPhysicalDeviceSurfaceSupportKHR,
  VK_KHR_SWAPCHAIN_EXTENSION_NAME,
  vkEnumerateDeviceExtensionProperties,
  VkExtensionProperties,
  VkSurfaceCapabilitiesKHR,
  VkSurfaceFormatKHR,
  vkGetPhysicalDeviceSurfaceCapabilitiesKHR,
  vkGetPhysicalDeviceSurfaceFormatsKHR,
  vkGetPhysicalDeviceSurfacePresentModesKHR,
  VK_FORMAT_B8G8R8A8_SRGB,
  VK_COLORSPACE_SRGB_NONLINEAR_KHR,
  VK_PRESENT_MODE_MAILBOX_KHR,
  VK_PRESENT_MODE_FIFO_KHR,
  VkPresentModeKHR,
  VkExtent2D,
  VkSwapchainCreateInfoKHR,
  VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT,
  VK_SHARING_MODE_CONCURRENT,
  VK_SHARING_MODE_EXCLUSIVE,
  VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR,
  VkSwapchainKHR,
  vkCreateSwapchainKHR,
  vkDestroySwapchainKHR,
  VkImage,
  vkGetSwapchainImagesKHR,
  VkImageView,
  VkImageViewCreateInfo,
  VK_IMAGE_VIEW_TYPE_2D,
  VkFormat,
  VkComponentMapping,
  VK_COMPONENT_SWIZZLE_IDENTITY,
  VkImageSubresourceRange,
  VK_IMAGE_ASPECT_COLOR_BIT,
  vkCreateImageView,
  vkDestroyImageView,
  VkShaderModuleCreateInfo,
  VkShaderModule,
  vkCreateShaderModule,
  vkDestroyShaderModule,
  VkPipelineShaderStageCreateInfo,
  VK_SHADER_STAGE_VERTEX_BIT,
  VK_SHADER_STAGE_FRAGMENT_BIT,
  VkPipelineVertexInputStateCreateInfo,
  VkPipelineInputAssemblyStateCreateInfo,
  VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST,
  VkViewport,
  VkRect2D,
  VkOffset2D,
  VkPipelineViewportStateCreateInfo,
  VkPipelineRasterizationStateCreateInfo,
  VK_POLYGON_MODE_FILL,
  VK_CULL_MODE_BACK_BIT,
  VK_FRONT_FACE_CLOCKWISE,
  VkPipelineMultisampleStateCreateInfo,
  VK_SAMPLE_COUNT_1_BIT,
  VkPipelineColorBlendAttachmentState,
  VK_COLOR_COMPONENT_R_BIT,
  VK_COLOR_COMPONENT_G_BIT,
  VK_COLOR_COMPONENT_B_BIT,
  VK_COLOR_COMPONENT_A_BIT,
  VK_BLEND_FACTOR_ONE,
  VK_BLEND_FACTOR_ZERO,
  VK_BLEND_OP_ADD,
  VK_BLEND_FACTOR_SRC_ALPHA,
  VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA,
  VkPipelineColorBlendStateCreateInfo,
  VK_LOGIC_OP_COPY,
  VK_DYNAMIC_STATE_VIEWPORT,
  VK_DYNAMIC_STATE_LINE_WIDTH,
  VK_DYNAMIC_STATE_BLEND_CONSTANTS,
  VkPipelineDynamicStateCreateInfo,
  VkPipelineLayout,
  VkPipelineLayoutCreateInfo,
  vkCreatePipelineLayout,
  vkDestroyPipelineLayout,
  VkAttachmentDescription,
  VK_ATTACHMENT_LOAD_OP_CLEAR,
  VK_ATTACHMENT_STORE_OP_STORE,
  VK_ATTACHMENT_LOAD_OP_DONT_CARE,
  VK_ATTACHMENT_STORE_OP_DONT_CARE,
  VK_IMAGE_LAYOUT_UNDEFINED,
  VK_IMAGE_LAYOUT_PRESENT_SRC_KHR,
  VkAttachmentReference,
  VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
  VkSubpassDescription,
  VK_PIPELINE_BIND_POINT_GRAPHICS,
  VkRenderPass,
  VkRenderPassCreateInfo,
  vkCreateRenderPass,
  vkDestroyRenderPass,
  VkGraphicsPipelineCreateInfo,
  VkPipeline,
  vkCreateGraphicsPipelines,
  vkDestroyPipeline,
  VkFramebuffer,
  VkFramebufferCreateInfo,
  vkCreateFramebuffer,
  vkDestroyFramebuffer,
  VkCommandPoolCreateInfo,
  VkCommandPool,
  vkCreateCommandPool,
  vkDestroyCommandPool,
  VkCommandBuffer,
  VkCommandBufferAllocateInfo,
  VK_COMMAND_BUFFER_LEVEL_PRIMARY,
  vkAllocateCommandBuffers,
  VkCommandBufferBeginInfo,
  vkBeginCommandBuffer,
  VkRenderPassBeginInfo,
  VkClearValue,
  VkClearColorValue,
  vkCmdBeginRenderPass,
  VK_SUBPASS_CONTENTS_INLINE,
  vkCmdBindPipeline,
  vkCmdDraw,
  vkCmdEndRenderPass,
  vkEndCommandBuffer,
  VkSemaphore,
  VkSemaphoreCreateInfo,
  vkCreateSemaphore,
  vkDestroySemaphore,
  vkAcquireNextImageKHR,
  VkSubmitInfo,
  VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT,
  vkQueueSubmit,
  VkSubpassDependency,
  VK_SUBPASS_EXTERNAL,
  VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT,
  VkPresentInfoKHR,
  vkQueuePresentKHR,
  VkFence,
  vkCreateFence,
  VkFenceCreateInfo,
  vkDestroyFence,
  vkWaitForFences,
  vkResetFences,
  VK_FENCE_CREATE_SIGNALED_BIT,
  vkDeviceWaitIdle,
  vkFreeCommandBuffers,
  VK_ERROR_OUT_OF_DATE_KHR,
  VK_SUCCESS,
  VK_SUBOPTIMAL_KHR,
} from 'nvk'
import { GLSL } from 'nvk-essentials'

import { ASSERT_VK_RESULT } from './utils'

import SegfaultHandler from 'segfault-handler'
SegfaultHandler.registerHandler('crash.log')

const MAX_FRAMES_IN_FLIGHT = 1

class SwapChainSupportDetails {
  constructor(
    public capabilities: VkSurfaceCapabilitiesKHR = new VkSurfaceCapabilitiesKHR(),
    public formats: VkSurfaceFormatKHR[] = [],
    public presentModes: Int32Array = new Int32Array()
  ) {}
}

class QueueFamilyIndices {
  constructor(public graphicsFamily: null | number = null, public presentFamily: null | number = null) {}

  public isComplete() {
    return this.graphicsFamily != null && this.presentFamily != null
  }
}

const checkDeviceExtensionSupport = (physicalDevice: VkPhysicalDevice, extensions: string[]): boolean => {
  const extensionCount = { $: 0 }
  vkEnumerateDeviceExtensionProperties(physicalDevice, null, extensionCount, null)

  const availableExtensions = new Array(extensionCount.$).fill(0).map(() => new VkExtensionProperties())
  vkEnumerateDeviceExtensionProperties(physicalDevice, null, extensionCount, availableExtensions)

  return extensions.every((ext) => availableExtensions.find((available) => available.extensionName === ext) != null)
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
  let swapChain: VkSwapchainKHR
  let swapChainImages: VkImage[]
  let surfaceFormat: VkSurfaceFormatKHR
  let presentMode: VkPresentModeKHR
  let swapChainImageExtent: VkExtent2D
  let swapChainImageViews: VkImageView[]
  let renderPass: VkRenderPass
  let pipelineLayout: VkPipelineLayout
  let graphicsPipeline: VkPipeline
  let swapChainFramebuffers: VkFramebuffer[]
  let commandPool: VkCommandPool
  let commandBuffers: VkCommandBuffer[]
  let imageAvailableSemaphores: VkSemaphore[]
  let rendererFinishedSemaphores: VkSemaphore[]
  let inFlightFences: VkFence[]
  let imagesInFlight: (VkFence | null)[]
  let framebufferResized = false

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
      new Set([queueFamilyIndices.graphicsFamily, queueFamilyIndices.presentFamily])
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
      swapChainCreatInfo.queueFamilyIndexCount = 2
      swapChainCreatInfo.pQueueFamilyIndices = new Uint32Array([
        queueFamilyIndices.graphicsFamily!,
        queueFamilyIndices.presentFamily!,
      ])
    } else {
      swapChainCreatInfo.imageSharingMode = VK_SHARING_MODE_EXCLUSIVE
      swapChainCreatInfo.queueFamilyIndexCount = 0
      swapChainCreatInfo.pQueueFamilyIndices = null
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

    vkFreeCommandBuffers(device, commandPool, commandBuffers.length, commandBuffers)
    commandBuffers = []

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

    const vertexInputInfo = new VkPipelineVertexInputStateCreateInfo({
      vertexBindingDescriptionCount: 0,
      pVertexBindingDescriptions: null,
      vertexAttributeDescriptionCount: 0,
      pVertexAttributeDescriptions: null,
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
      setLayoutCount: 0,
      pSetLayouts: null,
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

  const createCommandPool = (): void => {
    const poolCreateInfo = new VkCommandPoolCreateInfo({
      queueFamilyIndex: queueFamilyIndices.graphicsFamily!,
      flags: 0,
    })
    commandPool = new VkCommandPool()
    ASSERT_VK_RESULT(
      vkCreateCommandPool(device, poolCreateInfo, null, commandPool),
      'Unable to create graphics command pool'
    )
  }

  const createCommandBuffers = () => {
    commandBuffers = new Array(swapChainFramebuffers.length).fill(0).map(() => new VkCommandBuffer())

    const allocInfo = new VkCommandBufferAllocateInfo({
      commandPool: commandPool,
      level: VK_COMMAND_BUFFER_LEVEL_PRIMARY,
      commandBufferCount: commandBuffers.length,
    })
    ASSERT_VK_RESULT(vkAllocateCommandBuffers(device, allocInfo, commandBuffers), 'Unable to allocate command buffers!')

    for (let i = 0; i < commandBuffers.length; ++i) {
      const beginInfo = new VkCommandBufferBeginInfo({
        flags: 0,
        pInheritanceInfo: null,
      })

      ASSERT_VK_RESULT(
        vkBeginCommandBuffer(commandBuffers[i], beginInfo),
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

      vkCmdBeginRenderPass(commandBuffers[i], renderPassInfo, VK_SUBPASS_CONTENTS_INLINE)

      vkCmdBindPipeline(commandBuffers[i], VK_PIPELINE_BIND_POINT_GRAPHICS, graphicsPipeline)

      vkCmdDraw(commandBuffers[i], 3, 1, 0, 0)

      vkCmdEndRenderPass(commandBuffers[i])

      ASSERT_VK_RESULT(vkEndCommandBuffer(commandBuffers[i]), `Unable to record command buffer at index ${i}`)
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

  const recreateSwapChain = () => {
    while (window.width === 0 || window.height === 0) {
      window.pollEvents()
    }

    cleanupSwapChain()
    createSwapChain()
    createImageViews()
    createRenderPass()
    createGraphicsPipeline()
    createFramebuffers()
    createCommandBuffers()
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

    const waitStages = new Int32Array([VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT])
    const submitInfo = new VkSubmitInfo({
      waitSemaphoreCount: 1,
      pWaitSemaphores: [imageAvailableSemaphores[currentFrame]],
      pWaitDstStageMask: waitStages,
      commandBufferCount: 1,
      pCommandBuffers: [commandBuffers[imageIndex.$]],
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
  createGraphicsPipeline()
  createFramebuffers()
  createCommandPool()
  createCommandBuffers()
  createSyncObjects()

  const cleanup = () => {
    cleanupSwapChain()

    for (let i = 0; i < MAX_FRAMES_IN_FLIGHT; ++i) {
      vkDestroySemaphore(device, rendererFinishedSemaphores[i], null)
      vkDestroySemaphore(device, imageAvailableSemaphores[i], null)
      vkDestroyFence(device, inFlightFences[i], null)
    }
    rendererFinishedSemaphores = []
    imageAvailableSemaphores = []
    inFlightFences = []

    vkDestroyCommandPool(device, commandPool, null)
    commandPool = null!
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
      const delta = (now - lastFrame) | 0
      drawFrame()
      window.pollEvents()
      window.title = `${windowTitle} - ${delta}ms`
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
