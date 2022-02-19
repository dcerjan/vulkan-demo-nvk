import fs from 'fs'
import path from 'path'
import { run } from './app'
import sharp from 'sharp'

const main = async () => {
  const imageBuffer = fs.readFileSync(path.resolve(__dirname, './assets/images/uvgrid_1024.jpg'))
  const image = sharp(imageBuffer).ensureAlpha()
  const metadata = await image.metadata()
  const uvGridImageData = await image.raw().toBuffer()
  run({
    uvGridImage: {
      buffer: uvGridImageData,
      width: metadata.width!,
      height: metadata.height!,
      pixelSize: 4,
    },
  })
}

main()
