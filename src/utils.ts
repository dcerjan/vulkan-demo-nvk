import vk from 'nvk'

export const ASSERT_VK_RESULT = (result: vk.VkResult, message: string) => {
  if (result !== vk.VkResult.VK_SUCCESS) {
    throw new Error(message)
  }
}
