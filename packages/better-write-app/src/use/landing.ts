import { useEventListener } from '@vueuse/core'
import * as THREE from 'three'
import { onMounted } from 'vue'
import { useUtils } from './utils'

export const three = () => {
  let scene
  let camera
  let renderer
  let loader
  let cloud
  let _cloud
  let _cloudMaterial
  let mouse
  let raycaster
  let material
  let intersects
  let font
  const _cloudParticles: any = []
  const meshArray: any = []

  const utils = useUtils()

  const mounted = () => {
    const cameraCreate = () => {
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      camera.position.z = 1
      camera.rotation.x = 1.16
      camera.rotation.y = -0.12
      camera.rotation.z = 0.57
    }

    const rendererCreate = () => {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('landing-canvas') as HTMLCanvasElement,
      })
      renderer.setSize(window.innerWidth - 10, document.body.offsetHeight)
      scene.fog = new THREE.FogExp2(0x0f172a, 0.001)
      renderer.setClearColor(scene.fog.color)
      document.getElementById('landing-base')?.appendChild(renderer.domElement)
    }

    const loaderSmoke = () => {
      loader = new THREE.TextureLoader()
      loader.load('three/smoke.png', (texture) => {
        _cloud = new THREE.PlaneBufferGeometry(800, 800)
        _cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
        })
        for (let i = 0; i < 60; i++) {
          cloud = new THREE.Mesh(_cloud, _cloudMaterial)
          cloud.position.set(
            Math.random() * 1700 - 500,
            Math.random() * 1000 - 200,
            Math.random() * 1000 - 1000
          )
          cloud.rotation.x = 1.16
          cloud.rotation.y = -0.12
          cloud.rotation.z = Math.random() * 360
          cloud.material.opacity = 0.1
          // @ts-ignore
          _cloudParticles.push(cloud)
          scene.add(cloud)
        }
      })
    }

    const contextResize = () => {
      useEventListener('resize', () => {
        renderer.setSize(window.innerWidth - 10, document.body.offsetHeight)
        camera.aspect = window.innerWidth / document.body.offsetHeight
        camera.updateProjectionMatrix()
      })
    }

    const createLight = () => {
      const light = new THREE.AmbientLight(0x5480e8)
      light.position.set(0, 0, 0)
      scene.add(light)
      const light2 = new THREE.PointLight(0x0f172a, 50, 2.0)
      light2.castShadow = true
      light2.position.set(0, 0, 0)
      light2.shadow.camera.near = 1
      light2.shadow.camera.far = 60
      light2.shadow.bias = -0.005
      scene.add(light2)
      const light3 = new THREE.DirectionalLight(0xffeedd)
      light3.position.set(0, 0, 1)
      scene.add(light3)
    }

    const onMouseDown = (event) => {
      event.preventDefault()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      intersects = raycaster.intersectObjects(scene.children, true)
      for (let i = 0; i < intersects?.length; i++) {
        if (
          intersects[i].object.geometry.type === 'SphereGeometry' ||
          intersects[i].object.geometry.type === 'IcosahedronGeometry'
        ) {
          intersects[i].object.scale.x += 10
          intersects[i].object.scale.y += 10
          intersects[i].object.scale.z += 10
        }
      }
    }

    const render = () => {
      _cloudParticles.forEach((p) => {
        p.rotation.z -= 0.005
      })
      requestAnimationFrame(render)
      renderer.render(scene, camera)
      /*
      for (let i = 0; i < meshArray.length; i++) {
        const particle = meshArray[i]
        particle.position.z += 0.5
        particle.rotation.x += 0.01
        particle.rotation.y += particle['__Z__']
        if (particle.position.z > 1000) {
          particle.position.z -= 2000
        }
      }
      */
    }

    const createContext = () => {
      const canvas = document.createElement('canvas')
      canvas.id = 'landing-canvas'
      canvas.style.position = 'absolute'
      canvas.style.overflow = 'hidden'

      document.querySelector('#landing-base')?.appendChild(canvas)
    }
    createContext()
    scene = new THREE.Scene()
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()
    cameraCreate()
    rendererCreate()
    loaderSmoke()
    contextResize()
    // createNodes()
    createLight()
    render()
  }

  const unmounted = () => {
    scene.remove.apply(scene, scene.children)
  }

  return [mounted, unmounted]
}

export const useLanding = () => {
  const init = () => {
    const [mounted] = three()

    onMounted(() => {
      mounted()
    })
  }

  return { init }
}
