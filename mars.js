import * as THREE from 'three'
import vertexShader from './shaders/mars/vertex.glsl'
import fragmentShader from './shaders/mars/fragment.glsl'
import gsap from 'gsap'
import atmosphereVertex from './shaders/mars/atmosphereVertex.glsl'
import atmosphereFragment from './shaders/mars/atmosphereFragment.glsl'

const canvasContainer = document.querySelector('#marsCanvas')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector('#marsCanvas canvas')
  // canvas: canvasContainer
})





renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
renderer.setPixelRatio(window.devicePixelRatio)


// crate a sphere
const sphere = new THREE.Mesh
  (new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load('./img/2k_mars.jpg')
          // value: new THREE.TextureLoader().load('./img/deathStar.png')
        }
      }
    })
  )


// create atmosphere
const atmosphere = new THREE.Mesh
  (new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertex,
      fragmentShader: atmosphereFragment,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    })
  )

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)


const StarGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})


const starVertices = []
for (let i = 0;i < 10000;i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x, y, z)
}


StarGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(StarGeometry, starMaterial)
scene.add(stars)

camera.position.z = 15

const mouse = {
  x: 0.1,
  y: 0.1
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y += 0.003

  gsap.to(group.rotation, {
    x: mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2
  })
}

animate()

addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1
  mouse.y = (e.clientY / innerHeight) * 2 + 1
})


