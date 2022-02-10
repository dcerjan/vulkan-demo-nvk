import { VkResult } from 'nvk'

export const ASSERT_VK_RESULT = (result: VkResult, message: string) => {
  if (result !== VkResult.VK_SUCCESS) {
    throw new Error(message)
  }
}
