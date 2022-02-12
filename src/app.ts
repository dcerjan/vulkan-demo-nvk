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
  VK_API_VERSION_1_0,
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
  VkPresentInfoKHR,
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
} from 'nvk'

import { ASSERT_VK_RESULT } from './utils'

const initVulkan = () => {
  const win = new VulkanWindow({
    width: 480,
    height: 320,
    title: 'typescript-example',
  })

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

  const createInstance = () => {
    const instance = new VkInstance()

    const appInfo = new VkApplicationInfo({
      pApplicationName: 'Hello!',
      applicationVersion: VK_MAKE_VERSION(1, 0, 0),
      pEngineName: 'No Engine',
      engineVersion: VK_MAKE_VERSION(1, 0, 0),
      apiVersion: VK_API_VERSION_1_0,
    })

    const validationLayers: string[] = ['VK_LAYER_KHRONOS_validation']
    const instanceExtensions = win.getRequiredInstanceExtensions()
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

    return [
      device,
      graphicsQueue,
      () => {
        vkDestroyDevice(device, null)
      },
    ] as const
  }

  const createSurface = (instance: VkInstance) => {
    const surface = new VkSurfaceKHR()
    const surfaceResult = win.createSurface(instance, null, surface)
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

  const deviceExtensions = ([
    VK_KHR_SWAPCHAIN_EXTENSION_NAME,
  ] as unknown) as string[]

  const [instance, enabledLayers, destroyInstance] = createInstance()
  const [surface, destroySurface] = createSurface(instance)
  const [
    physicalDevice,
    deviceProperties,
    deviceFeatures,
    swapChainDetails,
  ] = pickPhysicalDevice(instance, surface, deviceExtensions)!
  const queueFamilyIndices = findQueueFamilies(physicalDevice, surface)
  const [device, graphicsQueue, destroyDevice] = createLogicalDevice(
    physicalDevice,
    queueFamilyIndices,
    deviceFeatures,
    enabledLayers,
    deviceExtensions,
  )
  const [
    swapChain,
    swapChainImages,
    swaChainImageFormat,
    swapChainExtend,
    destroySwapChain,
  ] = createSwapChain(
    device,
    surface,
    win,
    swapChainDetails,
    queueFamilyIndices,
  )

  const cleanup = () => {
    destroySwapChain()
    destroyDevice()
    destroySurface()
    destroyInstance()
  }

  return {
    loop: () => {
      win.pollEvents()

      if (win.shouldClose()) {
        cleanup()
        win.close()
        process.exit(0)
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
