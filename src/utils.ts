import { VkResult } from 'nvk'

export const ASSERT_VK_RESULT = (result: VkResult, message: string) => {
  if (result !== VkResult.VK_SUCCESS) {
    throw new Error(message)
  }
}

export const memoryCopy = (dataPtr: BigInt, srcData: ArrayBuffer, byteLen: bigint | number) => {
  // TODO: figure out why type augmentation is not applied correctly
  const dstBuffer = (ArrayBuffer as any).fromAddress(dataPtr, byteLen) as ArrayBuffer
  const srcBuffer = srcData
  const dstView = new Uint8Array(dstBuffer)
  const srcView = new Uint8Array(srcBuffer)
  for (let i = 0; i < byteLen; ++i) {
    dstView[i] = srcView[i]
  }
}
