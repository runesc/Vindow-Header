/* eslint-disable no-console */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { globalLoader } from '@/systems/loaders/loadingManager'
import { setupModel } from '@/systems/setupModel'
import model from '@/assets/models/robotitaDraco.glb'

const SceneLoader = async () => {
  const dracoLoader = new DRACOLoader()
  // eslint-disable-next-line max-len
  dracoLoader.setDecoderPath(
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'
  )

  const gLoader = globalLoader()
  const loader = new GLTFLoader(gLoader)
  loader.setDRACOLoader(dracoLoader)

  const [scene] = await Promise.all([loader.loadAsync(model)])

  const modelo = setupModel(scene)

  return { modelo }
}
export { SceneLoader }
