import { useEventListener } from '@vueuse/core'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useDefines } from './defines'

export const useWebGL = () => {
  const isLoaded = ref(false)
  let scene
  let camera
  let renderer
  let loader
  let cloud
  let _cloud
  let _cloudMaterial
  let _font
  const _cloudParticles: any = []
  const meshArray: any = []

  const init = () => {
    onMounted(() => {
      if (!WebGL.isWebGLAvailable()) return

      const cameraCreate = () => {
        camera = new THREE.PerspectiveCamera(
          70,
          document.body.offsetWidth / document.body.offsetHeight,
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
          canvas: document.getElementById(
            'landing-canvas'
          ) as HTMLCanvasElement,
        })
        renderer.setSize(document.body.offsetWidth, document.body.offsetHeight)
        scene.fog = new THREE.FogExp2(0x1e293b, 0.001)
        renderer.setClearColor(scene.fog.color)
        document
          .getElementById('landing-base')
          ?.appendChild(renderer.domElement)
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
          renderer.setSize(window.innerWidth, window.innerHeight)
          camera.aspect = window.innerWidth / window.innerHeight
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

      const createNodes = () => {
        for (let i = -1000; i < 1000; i += 50) {
          const paragraph = new TextGeometry(useDefines().landing().name(), {
            font: _font,
            size: Math.floor(Math.random() * 8) + 8,
            height: 1,
          })

          const mesh = new THREE.Mesh(paragraph)
          mesh.position.x = Math.random() * 2000 - 1000 + i
          mesh.position.y = 650 - Math.random() * 170
          mesh.position.z = Math.random() * 2000 - 1000 + i
          mesh.rotation.x = 1.16
          mesh.rotation.y = -0.12
          mesh.rotation.z = 0.57

          meshArray.push(mesh)
          scene.add(mesh)
        }
      }

      const render = () => {
        _cloudParticles.forEach((p) => {
          p.rotation.z -= 0.005
        })
        requestAnimationFrame(render)
        renderer.render(scene, camera)

        for (let i = 0; i < meshArray.length; i++) {
          const particle = meshArray[i]

          particle.position.z += 0.5
          if (particle.position.z > 1000) {
            particle.position.z -= 2600
          }
        }

        return Promise.resolve()
      }

      const createContext = () => {
        const canvas = document.createElement('canvas')
        canvas.id = 'landing-canvas'
        canvas.style.position = 'absolute'
        canvas.style.overflow = 'hidden'
        canvas.style.zIndex = '10'

        document.querySelector('#landing-base')?.appendChild(canvas)
      }

      const l = new FontLoader()

      l.load('three/fonts/poppins.typeface.json', function (font) {
        _font = font

        createContext()
        scene = new THREE.Scene()
        cameraCreate()
        rendererCreate()
        loaderSmoke()
        contextResize()
        createNodes()
        createLight()
        contextResize()
        render().then(() => {
          isLoaded.value = true
        })
      })
    })

    onBeforeUnmount(() => {
      isLoaded.value = false
    })
  }

  const isSupported = () => {
    return WebGL.isWebGLAvailable()
  }

  return { isLoaded, init, isSupported }
}
