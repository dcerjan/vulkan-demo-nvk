import {
  vkCreateDebugUtilsMessengerEXT,
  VkDebugUtilsMessageSeverityFlagBitsEXT,
  VkDebugUtilsMessageTypeFlagBitsEXT,
  VkDebugUtilsMessengerCallbackDataEXT,
  vkDebugUtilsMessengerCallbackEXT,
  VkDebugUtilsMessengerCreateInfoEXT,
  VkDebugUtilsMessengerEXT,
  vkDestroyDebugUtilsMessengerEXT,
  VkInstance,
  VkResult,
} from 'nvk'
import { ASSERT_VK_RESULT } from '../utils'

const debugCallback: vkDebugUtilsMessengerCallbackEXT = (
  severity: VkDebugUtilsMessageSeverityFlagBitsEXT,
  type: VkDebugUtilsMessageTypeFlagBitsEXT,
  callbackData: VkDebugUtilsMessengerCallbackDataEXT | null,
  userData: null,
) => {
  const sev = (() => {
    switch (severity) {
      case VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT:
        return 'Diagnostic'
      case VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT:
        return 'Info'
      case VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT:
        return 'Warning'
      case VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT:
        return 'Error'
    }
  })()
  const typ = (() => {
    switch (type) {
      case VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT:
        return 'Event'
      case VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT:
        return 'Spec Violation'
      case VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT:
        return 'Non-Optimal Use'
    }
  })()
  console.log(
    `[Custom Validation Layer] [${sev}] (${typ}) ${
      callbackData?.pMessage ?? 'unknown'
    } <${userData}>`,
  )
  return false
}

export const setupDebugMessenger = (instance: VkInstance) => {
  const debugMessenger = new VkDebugUtilsMessengerEXT()

  const createDebugUtilsMessenger = (): VkResult => {
    const debugMessengerCreateInfo = new VkDebugUtilsMessengerCreateInfoEXT({
      messageSeverity:
        VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT |
        VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT |
        VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT |
        VkDebugUtilsMessageSeverityFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT,
      messageType:
        VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT |
        VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT |
        VkDebugUtilsMessageTypeFlagBitsEXT.VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT,
      pfnUserCallback: debugCallback,
      pUserData: null,
    })

    return vkCreateDebugUtilsMessengerEXT(
      instance,
      debugMessengerCreateInfo,
      null,
      debugMessenger,
    )
  }

  const result = createDebugUtilsMessenger()
  ASSERT_VK_RESULT(result, 'Unable to create a debug messenger')

  return () => {
    vkDestroyDebugUtilsMessengerEXT(instance, debugMessenger, null)
  }
}
