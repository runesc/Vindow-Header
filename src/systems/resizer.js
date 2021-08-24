/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

const setSize = (camera, renderer, effectComposer, container) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(container.clientWidth, container.clientHeight)
  effectComposer.setSize(container.clientWidth, container.clientHeight)
  // set pixel ratio  for retina display
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

class Resizer {
  constructor(camera, renderer, effectComposer, container) {
    // set initial size on load
    setSize(camera, renderer, effectComposer, container)

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(camera, renderer, effectComposer, container)
    })
  }
}

export { Resizer }
