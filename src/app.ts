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

    return instance
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

      return (
        deviceProperties.deviceType === VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU &&
        deviceFeatures.geometryShader
      )
    }

    for (const device of physicalDevices) {
      if (isSuitable(device)) {
        physicalDevice = device
        break
      }
    }

    if (physicalDevice === VK_NULL_HANDLE) {
      throw new Error('Unable to find a suitable GPU!')
    }

    return physicalDevice
  }

  const instance = createInstance()
  const physicalDevice = pickPhysicalDevice(instance)

  const cleanup = () => {
    vkDestroyInstance(instance, null)
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
