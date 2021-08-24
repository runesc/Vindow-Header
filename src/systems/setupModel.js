/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { AnimationMixer, MeshStandardMaterial, Mesh, LoopOnce } from 'three'

const setupModel = (data) => {
  const model = data.scene
  const label = document.querySelector('.label-container')

  // Fix model position and size
  const robot = data.scene.children[1]
  robot.position.set(5, -1.2, 0)
  robot.scale.set(1.3, 1.3, 1.3)

  model.traverse((child) => {
    child.frustumCulled = false

    if (
      child instanceof Mesh &&
      child.material instanceof MeshStandardMaterial
    ) {
      if (child.name === 'casco') child.material.metalness = 0.2
      if (child.name === 'cabeza') child.material.metalness = 1
    }
  })

  //* Init animations
  const mixer = new AnimationMixer(data.scene)

  data.animations.forEach((clip) => {
    const action = mixer.clipAction(clip.optimize())
    action.clampWhenFinished = true
    action.setLoop(LoopOnce)
    action.play()
  })

  // Handle animation events
  mixer.addEventListener('finished', (e) => {
    if (e.action._clip.name === 'flama esphereAction') {
      label.classList.add('show')
    }
  })

  model.tick = (delta) => mixer.update(delta)

  return model
}

export { setupModel }
