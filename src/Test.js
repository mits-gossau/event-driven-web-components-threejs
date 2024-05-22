// @ts-check
import * as THREE from './three.js/build/three.module.js';

/**
 * https://docs.auvious.com/docs/get-started/widget/
 *
 * @export
 * @class Auvious
 * @type {CustomElementConstructor}
 */
export default class Auvious extends HTMLElement {
  constructor () {
    super()

    this.root = this.attachShadow({ mode: 'open' })
    /** @type {string} */
    this.importMetaUrl = import.meta.url.replace(/(.*\/)(.*)$/, '$1')
  }

  connectedCallback () {
    this.hidden = true
    const showPromises = []
    if (this.shouldRenderCSS()) showPromises.push(this.renderCSS())
    if (this.shouldRenderHTML()) showPromises.push(this.renderHTML())
    Promise.all(showPromises).then(() => (this.hidden = false))
  }

  disconnectedCallback () {}

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
    return !this.div
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
    console.log('changed', new THREE.Scene());
    this.root.innerHTML = 'hello world'
    return Promise.resolve()
  }
}
