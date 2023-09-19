import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// crate a sphere
const sphere = new THREE.Mesh
  (new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          // value: new THREE.TextureLoader().load('./img/earth.jpg')
          value: new THREE.TextureLoader().load('./img/deathStar.png')
        }
      }
    })
  )


scene.add(sphere)
camera.position.z = 15

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()


