import * as dat from 'dat.gui'
import {
  NoToneMapping,
  LinearToneMapping,
  ReinhardToneMapping,
  ACESFilmicToneMapping,
  LinearEncoding,
  sRGBEncoding,
  RGBEEncoding,
  RGBM7Encoding,
  RGBM16Encoding,
  RGBDEncoding,
  GammaEncoding,
  LogLuvEncoding,
  CineonToneMapping,
} from 'three'

const createGUIController = (e) => {
  const { ambientLight, mainLight, camera, renderer } = e
  const gui = new dat.GUI()

  // Renderer controls
  gui
    .add(renderer, 'toneMapping', {
      No: NoToneMapping,
      Linear: LinearToneMapping,
      Cineon: CineonToneMapping,
      Reinhard: ReinhardToneMapping,
      ACESFilmic: ACESFilmicToneMapping,
    })
    .onFinishChange(() => {
      renderer.toneMapping = Number(renderer.toneMapping)
    })
    .name('toneMapping')
  gui
    .add(renderer, 'outputEncoding', {
      LinearEncoding,
      sRGBEncoding,
      RGBEEncoding,
      RGBM7Encoding,
      RGBM16Encoding,
      RGBDEncoding,
      GammaEncoding,
      LogLuvEncoding,
    })
    .onFinishChange(() => {
      renderer.outputEncoding = Number(renderer.outputEncoding)
    })
    .name('outputEncoding')

  //* Camera controls
  gui.add(camera.position, 'x', -50, 100, 0.01).name('Cam X')
  gui.add(camera.position, 'y', -50, 100, 0.01).name('Cam Y')
  gui.add(camera.position, 'z', -100, 100, 0.01).name('Cam Z')

  gui.add(camera.rotation, 'x', -10, 10, 0.01).name('Cam ROT X')
  gui.add(camera.rotation, 'y', -10, 10, 0.01).name('Cam ROT Y')
  gui.add(camera.rotation, 'z', -10, 10, 0.01).name('Cam ROT Z')

  //* Ambient light controls
  gui.add(ambientLight, 'intensity', 0, 10, 0.01).name('Ambient light')

  //* sun light controls
  gui.add(mainLight, 'intensity', 0, 10, 0.01).name('Sun light')
  gui.add(mainLight.position, 'x', -50, 200, 0.01).name('Sun X')
  gui.add(mainLight.position, 'y', -50, 200, 0.01).name('Sun Y')
  gui.add(mainLight.position, 'z', -50, 200, 0.01).name('Sun Z')
}
export { createGUIController }
