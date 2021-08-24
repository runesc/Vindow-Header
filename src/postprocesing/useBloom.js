/* eslint-disable max-len */
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const useBloom = (effectComposer) => {
  const bloomPass = new UnrealBloomPass()
  effectComposer.addPass(bloomPass)

  bloomPass.strength = 0.79 // original:  1.427
  bloomPass.radius = 0.56
  bloomPass.threshold = 0.54

  return bloomPass
}
export { useBloom }
