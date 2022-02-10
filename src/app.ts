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
} from 'nvk'

import { ASSERT_VK_RESULT } from './utils'

const initVulkan = () => {
  const win = new VulkanWindow({
    width: 480,
    height: 320,
    title: 'typescript-example',
  })

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

  const pickPhysicalDevice = (instance: VkInstance) => {
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

    const isSuitable = (device: VkPhysicalDevice) => {
      const deviceProperties = new VkPhysicalDeviceProperties()
      vkGetPhysicalDeviceProperties(device, deviceProperties)

      const deviceFeatures = new VkPhysicalDeviceFeatures()
      vkGetPhysicalDeviceFeatures(device, deviceFeatures)

      return [
        deviceProperties.deviceType === VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU &&
          deviceFeatures.geometryShader,
        deviceProperties,
        deviceFeatures,
      ] as const
    }

    for (const device of physicalDevices) {
      const [suitable, properties, features] = isSuitable(device)
      if (suitable) {
        physicalDevice = device
        return [
          physicalDevice as VkPhysicalDevice,
          properties,
          features,
        ] as const
      }
    }

    if (physicalDevice === VK_NULL_HANDLE) {
      throw new Error('Unable to find a suitable GPU!')
    }
  }

  type QueueFamilyIndices = {
    graphicsFamily: null | number
    presentFamily: null | number
  }
  const findQueueFamilies = (
    physicalDevice: VkPhysicalDevice,
  ): QueueFamilyIndices => {
    const indices: QueueFamilyIndices = {
      graphicsFamily: null,
      presentFamily: null,
    }
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

      if (indices.graphicsFamily != null) {
        break
      }
    }

    return indices
  }

  const createLogicalDevice = (
    physicalDevice: VkPhysicalDevice,
    indices: QueueFamilyIndices,
    features: VkPhysicalDeviceFeatures,
    enabledLayers: string[],
  ) => {
    const queuePriority = new Float32Array([1.0])
    const queueCreateInfo = new VkDeviceQueueCreateInfo({
      queueFamilyIndex: indices.graphicsFamily!,
      queueCount: 1,
      pQueuePriorities: queuePriority,
    })

    const deviceCreateInfo = new VkDeviceCreateInfo({
      pQueueCreateInfos: [queueCreateInfo],
      queueCreateInfoCount: 1,
      pEnabledFeatures: features,
      enabledExtensionCount: 0,
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

  const [instance, enabledLayers, destroyInstance] = createInstance()
  const [surface, destroySurface] = createSurface(instance)
  const [physicalDevice, deviceProperties, deviceFeatures] = pickPhysicalDevice(
    instance,
  )!
  const queueFamilies = findQueueFamilies(physicalDevice)
  const [device, graphicsQueue, destroyDevice] = createLogicalDevice(
    physicalDevice,
    queueFamilies,
    deviceFeatures,
    enabledLayers,
  )

  const cleanup = () => {
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
