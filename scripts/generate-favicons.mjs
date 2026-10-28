import sharp from 'sharp'
import fs from 'fs'

async function generate() {
  const input = 'src/assets/profile_falcon.png'
  
  // 1. Square 512x512
  const squareBuffer = await sharp(input)
    .extract({ left: 0, top: 120, width: 688, height: 688 })
    .resize(512, 512)
    .png()
    .toBuffer()

  // 2. Circular 512x512 with smooth border
  const circleSvg = Buffer.from(`
    <svg width="512" height="512">
      <circle cx="256" cy="256" r="250" fill="white" />
    </svg>
  `)

  // Circular masked
  const circleBuffer = await sharp(squareBuffer)
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png()
    .toBuffer()

  // Save circle favicon.png (main)
  await sharp(circleBuffer).resize(512, 512).toFile('public/favicon-512.png')
  await sharp(circleBuffer).resize(192, 192).toFile('public/favicon-192.png')
  await sharp(circleBuffer).resize(180, 180).toFile('public/apple-touch-icon.png')
  await sharp(circleBuffer).resize(64, 64).toFile('public/favicon.png')
  await sharp(circleBuffer).resize(32, 32).toFile('public/favicon-32x32.png')
  await sharp(circleBuffer).resize(16, 16).toFile('public/favicon-16x16.png')

  // Generate ICO (contains 16, 32, 48) - 32x32 fallback
  await sharp(circleBuffer).resize(32, 32).toFile('public/favicon.ico')

  // Generate SVG favicon with embedded high-res image
  const base64 = circleBuffer.toString('base64')
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="512" height="512"/>
</svg>
`
  fs.writeFileSync('public/favicon.svg', svgContent)

  console.log('All favicons successfully generated!')
}

generate().catch(console.error)
