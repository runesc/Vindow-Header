import { DirectionalLight, HemisphereLight } from 'three'

const createLights = () => {
  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    0.2 // intensity
  )
  const mainLight = new DirectionalLight('white', 0.6)
  mainLight.position.set(-50, 55.17, 66)

  return { ambientLight, mainLight }
}
export { createLights }
