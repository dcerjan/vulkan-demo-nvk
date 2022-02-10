import vk from 'nvk'

import { ASSERT_VK_RESULT } from './utils'

const win = new vk.VulkanWindow({
  width: 480,
  height: 320,
  title: 'typescript-example',
})

const instance = new vk.VkInstance()

const appInfo = new vk.VkApplicationInfo({
  pApplicationName: 'Hello!',
  applicationVersion: vk.VK_MAKE_VERSION(1, 0, 0),
  pEngineName: 'No Engine',
  engineVersion: vk.VK_MAKE_VERSION(1, 0, 0),
  apiVersion: vk.VK_API_VERSION_1_0,
})

const validationLayers: string[] = []
const instanceExtensions = win.getRequiredInstanceExtensions()

const instanceInfo = new vk.VkInstanceCreateInfo()
instanceInfo.sType = vk.VkStructureType.VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO
instanceInfo.pApplicationInfo = appInfo
instanceInfo.enabledLayerCount = validationLayers.length
instanceInfo.ppEnabledLayerNames = validationLayers
instanceInfo.enabledExtensionCount = instanceExtensions.length
instanceInfo.ppEnabledExtensionNames = instanceExtensions

const result = vk.vkCreateInstance(instanceInfo, null, instance)
ASSERT_VK_RESULT(result, 'Failed to create VkInstance!')

setInterval(() => {
  win.pollEvents()

  if (win.shouldClose()) {
    win.close()
    process.exit(0)
  }
}, 1e3 / 60)

const amountOfLayers = { $: 0 }
vk.vkEnumerateInstanceLayerProperties(amountOfLayers, null)
const layers = new Array(amountOfLayers.$)
  .fill(null)
  .map(() => new vk.VkLayerProperties())
vk.vkEnumerateInstanceLayerProperties(amountOfLayers, layers)
