// @ts-check
import * as THREE from './three.js/build/three.module.js';

/**
*
* @export
* @class Test
* @type {CustomElementConstructor}
*/
export default class Test extends HTMLElement {
  constructor () {
    super()
    
    this.root = this.attachShadow({ mode: 'open' })
    /** @type {string} */
    this.importMetaUrl = import.meta.url.replace(/(.*\/)(.*)$/, '$1')

    this.mousemoveEventListener = event => this.loop(event)
  }
  
  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
    self.addEventListener('mousemove', this.mousemoveEventListener)
  }
  
  disconnectedCallback () {
    self.removeEventListener('mousemove', this.mousemoveEventListener)
  }
  
  /**
  * evaluates if a render is necessary
  *
  * @return {boolean}
  */
  shouldRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }
  
  /**
  * evaluates if a render is necessary
  *
  * @return {boolean}
  */
  shouldRenderHTML () {
    return !this.canvas
  }
  
  /**
  * renders the css
  */
  renderCSS () {
    this.css = /* css */`
    :host {}
    @media only screen and (max-width: _max-width_) {
      :host {}
    }
    `
    return Promise.resolve()
  }
  
  /**
  * Render HTML
  * @returns void
  */
  renderHTML () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    this.cube = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.cube)
    this.camera.position.z = 5
    this.root.appendChild(this.renderer.domElement)
    return Promise.resolve()
  }
  
  loop(event, cube = this.cube, renderer = this.renderer, scene = this.scene, camera = this.camera) {
    if (this.hasAttribute('right')) {
      cube.rotation.x += event.movementY / 100
      cube.rotation.y += event.movementX / 100
    } else {
      cube.rotation.x -= event.movementY / 100
      cube.rotation.y -= event.movementX / 100
    }
    renderer.render(scene, camera)
  }

  get canvas () {
    return this.root.querySelector('canvas')
  }
}
