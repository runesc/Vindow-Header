/* eslint-disable no-console */

import '@/assets/scss/index.scss'
import { World } from '@/world'

// code to set up the World App will go here
const main = async () => {
  const canvas = document.querySelector('#scene-container')

  // Create an instance of the World app and render the scene
  const world = new World(canvas)

  // complete async tasks
  await world.init()

  world.start()
}

// Run app
main().catch((err) => {
  console.error(err)
})
