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
} from 'nvk'
import { GLSL } from 'nvk-essentials'

import { ASSERT_VK_RESULT } from './utils'

const MAX_FRAMES_IN_FLIGHT = 1

const initVulkan = () => {
  class SwapChainSupportDetails {
    constructor(
      public capabilities: VkSurfaceCapabilitiesKHR = new VkSurfaceCapabilitiesKHR(),
      public formats: VkSurfaceFormatKHR[] = [],
      public presentModes: Int32Array = new Int32Array(),
    ) {}
  }

  const querySwapChainSupport = (
    physicalDevice: VkPhysicalDevice,
    surface: VkSurfaceKHR,
  ) => {
    const details = new SwapChainSupportDetails()

    vkGetPhysicalDeviceSurfaceCapabilitiesKHR(
      physicalDevice,
      surface,
      details.capabilities,
    )

    const formatCount = { $: 0 }
    vkGetPhysicalDeviceSurfaceFormatsKHR(
      physicalDevice,
      surface,
      formatCount,
      null,
    )
    if (formatCount.$ != 0) {
      details.formats = new Array(formatCount.$)
        .fill(0)
        .map(() => new VkSurfaceFormatKHR())
      vkGetPhysicalDeviceSurfaceFormatsKHR(
        physicalDevice,
        surface,
        formatCount,
        details.formats,
      )
    }

    const presentModesCount = { $: 0 }
    vkGetPhysicalDeviceSurfacePresentModesKHR(
      physicalDevice,
      surface,
      presentModesCount,
      null,
    )
    if (presentModesCount.$ != 0) {
      details.presentModes = new Int32Array(
        new Array(presentModesCount.$).fill(0),
      )
      vkGetPhysicalDeviceSurfacePresentModesKHR(
        physicalDevice,
        surface,
        presentModesCount,
        details.presentModes,
      )
    }

    return details
  }

  class QueueFamilyIndices {
    constructor(
      public graphicsFamily: null | number = null,
      public presentFamily: null | number = null,
    ) {}

    public isComplete() {
      return this.graphicsFamily != null && this.presentFamily != null
    }
  }
  const findQueueFamilies = (
    physicalDevice: VkPhysicalDevice,
    surface: VkSurfaceKHR,
  ): QueueFamilyIndices => {
    const indices = new QueueFamilyIndices()
    const queueFamilyCount = { $: 0 }
    vkGetPhysicalDeviceQueueFamilyProperties(
      physicalDevice,
      queueFamilyCount,
      null,
    )

    const queueFamilies = new Array(queueFamilyCount.$)
      .fill(null)
      .map(() => new VkQueueFamilyProperties())
    vkGetPhysicalDeviceQueueFamilyProperties(
      physicalDevice,
      queueFamilyCount,
      queueFamilies,
    )

    queueFamilies.map((queueFamily, index) => {
      console.log(`Graphics Queue Family ${index}`)
      console.log(
        `VK_QUEUE_GRAPHICS_BIT: ${
          (queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) !== 0
        }`,
      )
      console.log(
        `VK_QUEUE_COMPUTE_BIT: ${
          (queueFamily.queueFlags & VK_QUEUE_COMPUTE_BIT) !== 0
        }`,
      )
      console.log(
        `VK_QUEUE_TRANSFER_BIT: ${
          (queueFamily.queueFlags & VK_QUEUE_TRANSFER_BIT) !== 0
        }`,
      )
      console.log(
        `VK_QUEUE_SPARSE_BINDING_BIT: ${
          (queueFamily.queueFlags & VK_QUEUE_SPARSE_BINDING_BIT) !== 0
        }`,
      )
      console.log(`Count: ${queueFamily.queueCount}`)
      console.log(`TS valid bits: ${queueFamily.timestampValidBits}`)
    })

    for (let i = 0; i < queueFamilies.length; ++i) {
      const queueFamily = queueFamilies[i]
      if (queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) {
        indices.graphicsFamily = i
      }

      const presentSupport = { $: false }
      vkGetPhysicalDeviceSurfaceSupportKHR(
        physicalDevice,
        i,
        surface,
        presentSupport,
      )

      if (presentSupport.$) {
        indices.presentFamily = i
      }

      if (indices.isComplete()) {
        break
      }
    }

    return indices
  }

  const createInstance = (window: VulkanWindow) => {
    const instance = new VkInstance()

    const appInfo = new VkApplicationInfo({
      pApplicationName: 'Hello!',
      applicationVersion: VK_MAKE_VERSION(1, 0, 0),
      pEngineName: 'No Engine',
      engineVersion: VK_MAKE_VERSION(1, 0, 0),
      apiVersion: VK_MAKE_VERSION(1, 1, 0),
    })

    const validationLayers: string[] = ['VK_LAYER_KHRONOS_validation']
    const instanceExtensions = window.getRequiredInstanceExtensions()
    instanceExtensions.push(
      (VK_EXT_DEBUG_UTILS_EXTENSION_NAME as unknown) as string,
    )

    const instanceInfo = new VkInstanceCreateInfo({
      pApplicationInfo: appInfo,
      enabledLayerCount: validationLayers.length,
      ppEnabledLayerNames: validationLayers,
      enabledExtensionCount: instanceExtensions.length,
      ppEnabledExtensionNames: instanceExtensions,
      pNext: null,
    })

    const result = vkCreateInstance(instanceInfo, null, instance)
    ASSERT_VK_RESULT(result, 'Failed to create VkInstance!')

    const layerCount = { $: 0 }
    vkEnumerateInstanceLayerProperties(layerCount, null)
    const constAvailableLayers = new Array(layerCount.$)
      .fill(null)
      .map(() => new VkLayerProperties())
    vkEnumerateInstanceLayerProperties(layerCount, constAvailableLayers)

    const allFoundLayers = validationLayers.filter((layerName) =>
      constAvailableLayers.some(
        (availableLayer) => availableLayer.layerName === layerName,
      ),
    )
    if (allFoundLayers.length !== validationLayers.length) {
      throw new Error(
        `Not all validation layers are present: Expected: [${validationLayers.join(
          ', ',
        )}], found: [${allFoundLayers.join(', ')}]`,
      )
    }

    return [
      instance,
      allFoundLayers,
      () => {
        vkDestroyInstance(instance, null)
      },
    ] as const
  }

  const checkDeviceExtensionSupport = (
    device: VkPhysicalDevice,
    extensions: string[],
  ) => {
    const extensionCount = { $: 0 }
    vkEnumerateDeviceExtensionProperties(device, null, extensionCount, null)

    const availableExtensions = new Array(extensionCount.$)
      .fill(0)
      .map(() => new VkExtensionProperties())
    vkEnumerateDeviceExtensionProperties(
      device,
      null,
      extensionCount,
      availableExtensions,
    )

    return extensions.every(
      (ext) =>
        availableExtensions.find(
          (available) => available.extensionName === ext,
        ) != null,
    )
  }

  const isDeviceSuitable = (
    device: VkPhysicalDevice,
    surface: VkSurfaceKHR,
    extensions: string[],
  ) => {
    const deviceProperties = new VkPhysicalDeviceProperties()
    vkGetPhysicalDeviceProperties(device, deviceProperties)

    const deviceFeatures = new VkPhysicalDeviceFeatures()
    vkGetPhysicalDeviceFeatures(device, deviceFeatures)

    const extensionsSupported = checkDeviceExtensionSupport(device, extensions)

    let swapChainAdequate = false
    let swapChainSupport: SwapChainSupportDetails
    if (extensionsSupported) {
      swapChainSupport = querySwapChainSupport(device, surface)
      swapChainAdequate =
        swapChainSupport.formats.length != 0 &&
        swapChainSupport.presentModes.length != 0
    }

    const isSuitable =
      deviceProperties.deviceType === VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU &&
      deviceFeatures.geometryShader &&
      extensionsSupported &&
      swapChainAdequate

    return [
      isSuitable,
      deviceProperties,
      deviceFeatures,
      swapChainSupport!,
    ] as const
  }

  const pickPhysicalDevice = (
    instance: VkInstance,
    surface: VkSurfaceKHR,
    extensions: string[],
  ) => {
    let physicalDevice:
      | typeof VK_NULL_HANDLE
      | VkPhysicalDevice = VK_NULL_HANDLE

    const deviceCount = { $: 0 }
    vkEnumeratePhysicalDevices(instance, deviceCount, null)
    if (deviceCount.$ <= 0) {
      throw new Error('Failed to find GPUs with Vulkan support!')
    }

    const physicalDevices = new Array(deviceCount.$)
      .fill(null)
      .map(() => new VkPhysicalDevice())
    vkEnumeratePhysicalDevices(instance, deviceCount, physicalDevices)

    for (const device of physicalDevices) {
      const [
        suitable,
        properties,
        features,
        swapChanDetails,
      ] = isDeviceSuitable(device, surface, extensions)
      if (suitable) {
        physicalDevice = device
        return [
          physicalDevice as VkPhysicalDevice,
          properties,
          features,
          swapChanDetails,
        ] as const
      }
    }

    if (physicalDevice === VK_NULL_HANDLE) {
      throw new Error('Unable to find a suitable GPU!')
    }
  }

  const createLogicalDevice = (
    physicalDevice: VkPhysicalDevice,
    indices: QueueFamilyIndices,
    features: VkPhysicalDeviceFeatures,
    enabledLayers: string[],
    extensions: string[],
  ) => {
    const queuePriority = new Float32Array([1.0])
    const uniqueQueueFamilies = Array.from(
      new Set([indices.graphicsFamily, indices.presentFamily]),
    )
    const queueCreateInfos: VkDeviceQueueCreateInfo[] = uniqueQueueFamilies.map(
      (index) =>
        new VkDeviceQueueCreateInfo({
          queueFamilyIndex: index!,
          queueCount: 1,
          pQueuePriorities: queuePriority,
        }),
    )

    const deviceCreateInfo = new VkDeviceCreateInfo({
      pQueueCreateInfos: queueCreateInfos,
      queueCreateInfoCount: queueCreateInfos.length,
      pEnabledFeatures: features,
      enabledExtensionCount: extensions.length,
      ppEnabledExtensionNames: extensions,
      enabledLayerCount: enabledLayers.length,
      ppEnabledLayerNames: enabledLayers,
    })

    const device = new VkDevice()
    const result = vkCreateDevice(
      physicalDevice,
      deviceCreateInfo,
      null,
      device,
    )
    ASSERT_VK_RESULT(result, 'Unable to create a logical device!')

    const graphicsQueue = new VkQueue()
    vkGetDeviceQueue(device, indices.graphicsFamily!, 0, graphicsQueue)

    const presentQueue = new VkQueue()
    vkGetDeviceQueue(device, indices.presentFamily!, 0, presentQueue)

    return [
      device,
      graphicsQueue,
      presentQueue,
      () => {
        vkDestroyDevice(device, null)
      },
    ] as const
  }

  const createSurface = (instance: VkInstance, window: VulkanWindow) => {
    const surface = new VkSurfaceKHR()
    const surfaceResult = window.createSurface(instance, null, surface)
    ASSERT_VK_RESULT(surfaceResult, 'Unable to create window surface!')

    return [
      surface,
      () => {
        vkDestroySurfaceKHR(instance, surface, null)
      },
    ] as const
  }

  const chooseSwapSurfaceFormat = (availableFormats: VkSurfaceFormatKHR[]) => {
    const format = availableFormats.find(
      (fmt) =>
        fmt.format === VK_FORMAT_B8G8R8A8_SRGB &&
        fmt.colorSpace === VK_COLORSPACE_SRGB_NONLINEAR_KHR,
    )

    return format ?? availableFormats[0]
  }

  const chooseSwapPresentMode = (availablePresentModes: VkPresentModeKHR[]) => {
    const mode = availablePresentModes.find(
      (md) => md === VK_PRESENT_MODE_MAILBOX_KHR,
    )

    return mode ?? VK_PRESENT_MODE_FIFO_KHR
  }

  const chooseSwapExtent = (
    capabilities: VkSurfaceCapabilitiesKHR,
    window: VulkanWindow,
  ) => {
    if (capabilities.currentExtent!.width != 0xffffffff) {
      return capabilities.currentExtent!
    } else {
      const width = window.frameBufferWidth
      const height = window.frameBufferWidth

      const extent = new VkExtent2D({
        width: Math.min(
          Math.max(width, capabilities.minImageExtent!.width),
          capabilities.maxImageExtent!.width,
        ),
        height: Math.min(
          Math.max(height, capabilities.minImageExtent!.height),
          capabilities.maxImageExtent!.height,
        ),
      })

      return extent
    }
  }

  const createSwapChain = (
    device: VkDevice,
    surface: VkSurfaceKHR,
    window: VulkanWindow,
    details: SwapChainSupportDetails,
    queueFamilyIndices: QueueFamilyIndices,
  ) => {
    const surfaceFormat = chooseSwapSurfaceFormat(details.formats)
    const presentMode = chooseSwapPresentMode(
      (details.presentModes as unknown) as VkPresentModeKHR[],
    )
    const extent = chooseSwapExtent(details.capabilities, window)

    let imageCount = details.capabilities.minImageCount + 1

    if (
      details.capabilities.maxImageCount > 0 &&
      imageCount > details.capabilities.maxImageCount
    ) {
      imageCount = details.capabilities.maxImageCount
    }

    const swapChainCreatInfo = new VkSwapchainCreateInfoKHR({
      surface,
      minImageCount: imageCount,
      imageFormat: surfaceFormat.format,
      imageColorSpace: surfaceFormat.colorSpace,
      imageExtent: extent,
      imageArrayLayers: 1,
      imageUsage: VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT,
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

    swapChainCreatInfo.preTransform = details.capabilities.currentTransform
    swapChainCreatInfo.compositeAlpha = VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR
    swapChainCreatInfo.presentMode = presentMode
    swapChainCreatInfo.clipped = true
    swapChainCreatInfo.oldSwapchain = null

    const swapChain = new VkSwapchainKHR()
    const result = vkCreateSwapchainKHR(
      device,
      swapChainCreatInfo,
      null,
      swapChain,
    )
    ASSERT_VK_RESULT(result, 'Unable to create a swap chain')

    const actualImagesCount = { $: 0 }
    vkGetSwapchainImagesKHR(device, swapChain, actualImagesCount, null)
    const swapChainImages: VkImage[] = new Array(actualImagesCount.$)
      .fill(0)
      .map(() => new VkImage())
    vkGetSwapchainImagesKHR(
      device,
      swapChain,
      actualImagesCount,
      swapChainImages,
    )

    return [
      swapChain,
      swapChainImages,
      surfaceFormat.format,
      extent,
      () => {
        vkDestroySwapchainKHR(device, swapChain, null)
      },
    ] as const
  }

  const createImageViews = (
    device: VkDevice,
    swapChainImages: VkImage[],
    swapChainImageFormat: VkFormat,
  ) => {
    const swapChainImageViews: VkImageView[] = new Array(swapChainImages.length)
      .fill(0)
      .map(() => new VkImageView())

    for (let i = 0; i < swapChainImages.length; ++i) {
      const createInfo = new VkImageViewCreateInfo({
        image: swapChainImages[i],
        viewType: VK_IMAGE_VIEW_TYPE_2D,
        format: swapChainImageFormat,
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
      const result = vkCreateImageView(
        device,
        createInfo,
        null,
        swapChainImageViews[i],
      )
      ASSERT_VK_RESULT(
        result,
        `Unable to create an image view for swapchain image under index ${i}`,
      )
    }

    return [
      swapChainImageViews,
      () => {
        for (const imageView of swapChainImageViews) {
          vkDestroyImageView(device, imageView, null)
        }
      },
    ] as const
  }

  const createShaderModule = (shaderName: string, bytecode: Uint8Array) => {
    const createInfo = new VkShaderModuleCreateInfo({
      codeSize: bytecode.byteLength,
      pCode: bytecode,
    })

    const shaderModule = new VkShaderModule()
    const result = vkCreateShaderModule(device, createInfo, null, shaderModule)
    ASSERT_VK_RESULT(result, `Failed to compile shader: ${shaderName}`)

    return [
      shaderModule,
      () => {
        vkDestroyShaderModule(device, shaderModule, null)
      },
    ] as const
  }

  const createRenderPass = (
    device: VkDevice,
    swapChainImageFormat: VkFormat,
  ) => {
    const colorAttachment = new VkAttachmentDescription({
      format: swapChainImageFormat,
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

    const renderPass = new VkRenderPass()
    const renderPassCreateInfo = new VkRenderPassCreateInfo({
      attachmentCount: 1,
      pAttachments: [colorAttachment],
      subpassCount: 1,
      pSubpasses: [subpass],
      dependencyCount: 1,
      pDependencies: [dependency],
    })
    const result = vkCreateRenderPass(
      device,
      renderPassCreateInfo,
      null,
      renderPass,
    )
    ASSERT_VK_RESULT(result, 'Unable to create a render pass!')

    return [
      renderPass,
      () => {
        vkDestroyRenderPass(device, renderPass, null)
      },
    ] as const
  }

  const createGraphicsPipeline = (
    device: VkDevice,
    renderPass: VkRenderPass,
    swapChainExtent: VkExtent2D,
  ) => {
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

    const [vertShaderModule, destroyVertShaderModule] = createShaderModule(
      'triangle.vert',
      vertShader.output,
    )
    const [fragShaderModule, destroyFragShaderModule] = createShaderModule(
      'triangle.frag',
      fragShader.output,
    )

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
      width: swapChainExtent.width,
      height: swapChainExtent.height,
      minDepth: 0.0,
      maxDepth: 1.0,
    })

    const scissor = new VkRect2D({
      offset: new VkOffset2D({
        x: 0,
        y: 0,
      }),
      extent: swapChainExtent,
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
        VK_COLOR_COMPONENT_R_BIT |
        VK_COLOR_COMPONENT_G_BIT |
        VK_COLOR_COMPONENT_B_BIT |
        VK_COLOR_COMPONENT_A_BIT,
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

    const pipelineLayout = new VkPipelineLayout()

    const pipelineLayoutCreateInfo = new VkPipelineLayoutCreateInfo({
      setLayoutCount: 0,
      pSetLayouts: null,
      pushConstantRangeCount: 0,
      pPushConstantRanges: null,
    })
    const result = vkCreatePipelineLayout(
      device,
      pipelineLayoutCreateInfo,
      null,
      pipelineLayout,
    )
    ASSERT_VK_RESULT(result, 'Unable to create pipeline layout!')

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

    const graphicsPipeline = new VkPipeline()
    const graphicsPipelineResult = vkCreateGraphicsPipelines(
      device,
      null,
      1,
      [pipelineCreateInfo],
      null,
      [graphicsPipeline],
    )
    ASSERT_VK_RESULT(
      graphicsPipelineResult,
      'Unable to create a graphics pipeline!',
    )

    destroyVertShaderModule()
    destroyFragShaderModule()

    return [
      graphicsPipeline,
      pipelineLayout,
      () => {
        vkDestroyPipeline(device, graphicsPipeline, null)
        vkDestroyPipelineLayout(device, pipelineLayout, null)
      },
    ] as const
  }

  const createFramebuffers = (
    device: VkDevice,
    renderPass: VkRenderPass,
    swapChainImageViews: VkImageView[],
    swapChainExtent: VkExtent2D,
  ) => {
    const swapChainFramebuffers = new Array(swapChainImageViews.length)
      .fill(0)
      .map(() => new VkFramebuffer())

    for (let i = 0; i < swapChainImageViews.length; ++i) {
      const framebufferInfo = new VkFramebufferCreateInfo({
        renderPass: renderPass,
        attachmentCount: 1,
        pAttachments: [swapChainImageViews[i]],
        width: swapChainExtent.width,
        height: swapChainExtent.height,
        layers: 1,
      })

      const result = vkCreateFramebuffer(
        device,
        framebufferInfo,
        null,
        swapChainFramebuffers[i],
      )
      ASSERT_VK_RESULT(
        result,
        `Unable to create a swapchain framebuffer at index ${i}`,
      )
    }

    return [
      swapChainFramebuffers,
      () => {
        for (const framebuffer of swapChainFramebuffers) {
          vkDestroyFramebuffer(device, framebuffer, null)
        }
      },
    ] as const
  }

  const createCommandPool = (
    device: VkDevice,
    queueFamilyIndices: QueueFamilyIndices,
  ) => {
    const poolCreateInfo = new VkCommandPoolCreateInfo({
      queueFamilyIndex: queueFamilyIndices.graphicsFamily!,
      flags: 0,
    })
    const commandPool = new VkCommandPool()
    const result = vkCreateCommandPool(
      device,
      poolCreateInfo,
      null,
      commandPool,
    )
    ASSERT_VK_RESULT(result, 'Unable to create graphics command pool')

    return [
      commandPool,
      () => {
        vkDestroyCommandPool(device, commandPool, null)
      },
    ] as const
  }

  const crateCommandBuffers = (
    renderPass: VkRenderPass,
    swapChainFramebuffers: VkFramebuffer[],
    commandPool: VkCommandPool,
    swapChainExtent: VkExtent2D,
    graphicsPipeline: VkPipeline,
  ) => {
    const commandBuffers = new Array(swapChainFramebuffers.length)
      .fill(0)
      .map(() => new VkCommandBuffer())

    const allocInfo = new VkCommandBufferAllocateInfo({
      commandPool: commandPool,
      level: VK_COMMAND_BUFFER_LEVEL_PRIMARY,
      commandBufferCount: commandBuffers.length,
    })
    const result = vkAllocateCommandBuffers(device, allocInfo, commandBuffers)
    ASSERT_VK_RESULT(result, 'Unable to allocate command buffers!')

    for (let i = 0; i < commandBuffers.length; ++i) {
      const beginInfo = new VkCommandBufferBeginInfo({
        flags: 0,
        pInheritanceInfo: null,
      })

      const result = vkBeginCommandBuffer(commandBuffers[i], beginInfo)
      ASSERT_VK_RESULT(
        result,
        `Unable to begin recording a command buffer under index ${i}`,
      )

      const clearColor = new VkClearValue({
        color: new VkClearColorValue({ float32: [0.0, 0.0, 0.0, 0.0] }),
      })
      const renderPassInfo = new VkRenderPassBeginInfo({
        renderPass,
        framebuffer: swapChainFramebuffers[i],
        renderArea: new VkRect2D({
          offset: new VkOffset2D({ x: 0, y: 0 }),
          extent: swapChainExtent,
        }),
        clearValueCount: 1,
        pClearValues: [clearColor],
      })

      vkCmdBeginRenderPass(
        commandBuffers[i],
        renderPassInfo,
        VK_SUBPASS_CONTENTS_INLINE,
      )

      vkCmdBindPipeline(
        commandBuffers[i],
        VK_PIPELINE_BIND_POINT_GRAPHICS,
        graphicsPipeline,
      )

      vkCmdDraw(commandBuffers[i], 3, 1, 0, 0)

      vkCmdEndRenderPass(commandBuffers[i])

      const endResult = vkEndCommandBuffer(commandBuffers[i])
      ASSERT_VK_RESULT(
        endResult,
        `Unable to record command buffer at index ${i}`,
      )
    }

    return commandBuffers
  }

  const createSyncObjects = (device: VkDevice, swapChainImages: VkImage[]) => {
    const semaphoreCreateInfo = new VkSemaphoreCreateInfo()
    const imageAvailableSemaphores = new Array(MAX_FRAMES_IN_FLIGHT)
      .fill(0)
      .map(() => new VkSemaphore())
    const rendererFinishedSemaphores = new Array(MAX_FRAMES_IN_FLIGHT)
      .fill(0)
      .map(() => new VkSemaphore())
    const fenceCreateInfo = new VkFenceCreateInfo({
      flags: VK_FENCE_CREATE_SIGNALED_BIT,
    })
    const inFlightFences = new Array(MAX_FRAMES_IN_FLIGHT)
      .fill(0)
      .map(() => new VkFence())
    const imagesInFlight: (VkFence | null)[] = new Array(swapChainImages.length)
      .fill(0)
      .map(() => null)

    for (let i = 0; i < MAX_FRAMES_IN_FLIGHT; ++i) {
      ASSERT_VK_RESULT(
        vkCreateSemaphore(
          device,
          semaphoreCreateInfo,
          null,
          imageAvailableSemaphores[i],
        ),
        `Failed to create imageAvailableSemaphores[${i}]!`,
      )
      ASSERT_VK_RESULT(
        vkCreateSemaphore(
          device,
          semaphoreCreateInfo,
          null,
          rendererFinishedSemaphores[i],
        ),
        `Failed to create rendererFinishedSemaphores[${i}]!`,
      )
      ASSERT_VK_RESULT(
        vkCreateFence(device, fenceCreateInfo, null, inFlightFences[i]),
        `Failed to create inFlightFences[${i}]!`,
      )
    }

    return [
      imageAvailableSemaphores,
      rendererFinishedSemaphores,
      inFlightFences,
      imagesInFlight,
      () => {
        rendererFinishedSemaphores.forEach((semaphore) => {
          vkDestroySemaphore(device, semaphore, null)
        })
        imageAvailableSemaphores.forEach((semaphore) => {
          vkDestroySemaphore(device, semaphore, null)
        })
        inFlightFences.forEach((fence) => {
          vkDestroyFence(device, fence, null)
        })
      },
    ] as const
  }

  let currentFrame = 0
  const drawFrame = (
    device: VkDevice,
    swapChain: VkSwapchainKHR,
    commandBuffers: VkCommandBuffer[],
    graphicsQueue: VkQueue,
    presentQueue: VkQueue,
    imageAvailableSemaphores: VkSemaphore[],
    rendererFinishedSemaphores: VkSemaphore[],
    inFlightFences: VkFence[],
  ) => {
    vkWaitForFences(
      device,
      1,
      [inFlightFences[currentFrame]],
      true,
      Number.MAX_SAFE_INTEGER,
    )

    const imageIndex = { $: 0 }
    vkAcquireNextImageKHR(
      device,
      swapChain,
      Number.MAX_SAFE_INTEGER,
      imageAvailableSemaphores[currentFrame],
      null,
      imageIndex,
    )

    const fence = imagesInFlight[imageIndex.$]
    if (fence != null) {
      vkWaitForFences(device, 1, [fence], true, Number.MAX_SAFE_INTEGER)
    }
    imagesInFlight[imageIndex.$] = inFlightFences[currentFrame]

    const waitStages = new Int32Array([
      VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT,
    ])
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
    const result = vkQueueSubmit(
      graphicsQueue,
      1,
      [submitInfo],
      inFlightFences[currentFrame],
    )
    ASSERT_VK_RESULT(result, 'Unable to submit draw command buffer!')

    const presentInfo = new VkPresentInfoKHR({
      waitSemaphoreCount: 1,
      pWaitSemaphores: [rendererFinishedSemaphores[currentFrame]],
      swapchainCount: 1,
      pSwapchains: [swapChain],
      pImageIndices: new Uint32Array([imageIndex.$]),
      pResults: null,
    })

    const presentResult = vkQueuePresentKHR(presentQueue, presentInfo)
    ASSERT_VK_RESULT(presentResult, 'Unable to present queue!')

    currentFrame = (currentFrame + 1) % MAX_FRAMES_IN_FLIGHT
  }

  const deviceExtensions = ([
    VK_KHR_SWAPCHAIN_EXTENSION_NAME,
  ] as unknown) as string[]

  const window = new VulkanWindow({
    width: 480,
    height: 320,
    title: 'typescript-example',
  })

  const [instance, enabledLayers, destroyInstance] = createInstance(window)
  const [surface, destroySurface] = createSurface(instance, window)
  const [
    physicalDevice,
    deviceProperties,
    deviceFeatures,
    swapChainDetails,
  ] = pickPhysicalDevice(instance, surface, deviceExtensions)!
  const queueFamilyIndices = findQueueFamilies(physicalDevice, surface)
  const [
    device,
    graphicsQueue,
    presentQueue,
    destroyDevice,
  ] = createLogicalDevice(
    physicalDevice,
    queueFamilyIndices,
    deviceFeatures,
    enabledLayers,
    deviceExtensions,
  )
  const [
    swapChain,
    swapChainImages,
    swapChainImageFormat,
    swapChainExtent,
    destroySwapChain,
  ] = createSwapChain(
    device,
    surface,
    window,
    swapChainDetails,
    queueFamilyIndices,
  )
  const [swapChainImageViews, destroySwapChainImageViews] = createImageViews(
    device,
    swapChainImages,
    swapChainImageFormat,
  )
  const [renderPass, destroyRenderPass] = createRenderPass(
    device,
    swapChainImageFormat,
  )
  const [
    graphicsPipeline,
    pipelineLayout,
    destroyGraphicsPipelineLayout,
  ] = createGraphicsPipeline(device, renderPass, swapChainExtent)
  const [swapChainFramebuffers, destroyFramebuffers] = createFramebuffers(
    device,
    renderPass,
    swapChainImageViews,
    swapChainExtent,
  )
  const [commandPool, destroyCommandPool] = createCommandPool(
    device,
    queueFamilyIndices,
  )
  const commandBuffers = crateCommandBuffers(
    renderPass,
    swapChainFramebuffers,
    commandPool,
    swapChainExtent,
    graphicsPipeline,
  )
  const [
    imageAvailableSemaphores,
    rendererFinishedSemaphores,
    inFlightFences,
    imagesInFlight,
    destroySemaphores,
  ] = createSyncObjects(device, swapChainImages)

  const cleanup = () => {
    destroySemaphores()
    destroyCommandPool()
    destroyFramebuffers()
    destroyGraphicsPipelineLayout()
    destroyRenderPass()
    destroySwapChainImageViews()
    destroySwapChain()
    destroyDevice()
    destroySurface()
    destroyInstance()
  }

  return {
    loop: () => {
      if (!window.shouldClose()) {
        drawFrame(
          device,
          swapChain,
          commandBuffers,
          graphicsQueue,
          presentQueue,
          imageAvailableSemaphores,
          rendererFinishedSemaphores,
          inFlightFences,
        )
        window.pollEvents()
      } else {
        cleanup()
        setTimeout(() => {
          window.close()
          process.exit(0)
        }, 100)
      }
    },
  }
}

export const run = () => {
  const { loop } = initVulkan()

  setInterval(() => {
    loop()
  }, 1e3 / 60)
}
