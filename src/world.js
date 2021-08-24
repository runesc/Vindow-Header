/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable one-var */
/* eslint-disable no-unused-vars */
import { createGUIController } from '@/components/guiControls'
import { createScene } from '@/components/scene'
import { createLights } from '@/components/lights/ambientLight'
import { createRenderer } from '@/systems/renderer'
import { Resizer } from '@/systems/resizer'

import { SceneLoader } from '@/systems/loaders/sceneLoader'
import { startPostProcessing } from '@/postprocesing/effectComposer'
import { useBloom } from '@/postprocesing/useBloom'
import { Loop } from '@/systems/loop'
import { isDevMode } from '@/debug'

/*
  ! These variables are module-scoped:
  * we cannot access them from outside the module
*/
let container, scene, renderer, loop, controls, camera

class World {
  // Create an instance of the World app
  constructor(cont) {
    container = cont
    scene = createScene()
    renderer = createRenderer(container)
  }

  // Load Scene
  async init() {
    // Load model and get cmera
    const { modelo } = await SceneLoader()
    modelo.traverse((child) => {
      if (child.isCamera) {
        camera = child
      }
    })

    // continue lifecycle
    const effectComposer = startPostProcessing(
      renderer,
      scene,
      camera,
      container
    )
    const resizer = new Resizer(camera, renderer, effectComposer, container)

    // create lights and add all to scene
    const { ambientLight, mainLight } = createLights()
    scene.add(ambientLight, mainLight, modelo)

    // start animations
    loop = new Loop(camera, scene, renderer, effectComposer)
    loop.updatables.push(modelo)

    if (isDevMode()) {
      createGUIController({
        ambientLight,
        mainLight,
        modelo,
        camera,
        renderer,
      })
      const gui = document.querySelector('.dg')
      gui.style.zIndex = 100
    }
  }

  // Start the animation loop in 'systems/loop.js'
  start() {
    loop.start()
  }

  // Stop the animation loop
  stop() {
    loop.stop()
  }
}

export { World }
