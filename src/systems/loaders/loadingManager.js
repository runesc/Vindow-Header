/* eslint-disable no-console */
import { LoadingManager } from 'three'

const globalLoader = () => {
  let highestNumber = 0
  const cover = document.querySelector('.cover')
  const progressBar = document.querySelector('.progress-bar')
  const body = document.querySelector('body')

  const loadingManager = new LoadingManager(
    // Loaded
    () => {
      window.setTimeout(() => {
        cover.classList.add('ended')
        body.style.overflow = 'auto !important'
      }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      // Calculate the progress and update the loadingBarElement
      let progressRatio = itemsLoaded / itemsTotal
      progressRatio = parseInt(progressRatio * 100, 10)

      // Use single loading bar
      if (progressRatio > highestNumber) {
        highestNumber = progressRatio
        progressBar.style.width = `${progressRatio}%`
      }
    }
  )
  return loadingManager
}

export { globalLoader }
