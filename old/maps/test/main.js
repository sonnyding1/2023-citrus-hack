// import * as THREE from 'https://cdn.skypack.dev/three';

// const scene = new  THREE.Scene()
// const camera = new THREE.
// PerspectiveCamera(
//     75,
//     innerWidth / innerHeight,
//     0.1,
//     1000
// )

// const renderer = new THREE.WebGLRenderer(
//     {
//         antialias: true
//     }
// )
// renderer.setSize(innerWidth, innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio)
// document.body.appendChild(renderer.domElement)


// // sphere
// const sphere= new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.MeshBasicMaterial({
//     color: 0xff0000
//     //map: new THREE.TextureLoader().load('./uv.jpeg')
// }))

// scene.add(sphere)


// camera.position.z = 10

// function animate(){
//     requestAnimationFrame(animate)
//     renderer.render(scene, camera)
// }
// animate()
import gsap from 'gsap'
import * as THREE from 'https://cdn.skypack.dev/three';
import vertexShader from './s/vertex.glsl'
import fragmentShader from './s/fragment.glsl'

import atmosphereVertexShader from './s/atmosphereVertex.glsl'
import atmosphereFragmentShader from './s/atmosphereFragment.glsl'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer(
    {
        antialias: true
    }
);
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// sphere
const sphere= new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
 new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('./s/uv,jpeg')
        }
    }
})
)

scene.add(sphere);
// new sphere
const atmosphere= new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
 new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
})
)
atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere);

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

// star
const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices =[]
for (let i =0; i<10000; i++) {
    const x = (Math.random()-0.5) * 2000
    const y = (Math.random()-0.5) * 2000
    const z = Math.random() * 1000
    starVertices.push(x,y,z)
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices,3)) 

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)


camera.position.z = 15;

const mouse = {
    x:undefined,
    y:undefined
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y +=0.001

    gsap.to(group.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
    })
}
animate();



addEventListener('mousemove', ()=> {
    mouse.x = (event.clientX / innerWidth) *2 -1
    mouse.y = -(event.clientY/ innerHeight) *2 +1
})