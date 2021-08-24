import { WebGLRenderer, sRGBEncoding } from 'three'

const createRenderer = (canvas) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.outputEncoding = sRGBEncoding
  renderer.colorManagement = true
  return renderer
}

export { createRenderer }
