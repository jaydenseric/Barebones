/**
 * A controllable counter component that tracks time in seconds.
 * @author Jayden Seric
 */
export default class Counter {
  /**
   * Constructs a new counter component.
   * @param {Object} options - Options.
   * @param {HTMLElement} options.element - Container.
   */
  constructor (options) {
    this.element = options.element
    this.button = this.element.querySelector('button')
    this.buttonUse = this.button.querySelector('use')
    this.output = this.element.querySelector('output')
    this.time = parseInt(this.output.textContent)
    this.interval = null
    // Enable toggle button
    this.button.addEventListener('click', ::this.toggle)
  }

  /**
   * Resumes counting.
   */
  resume () {
    // Update the interval
    this.interval = setInterval(() => {
      this.output.innerHTML = ++this.time
    }, 1000)
    // Update toggle button icon
    this.constructor.setSvgUseSymbol(this.buttonUse, 'pause')
  }

  /**
   * Pauses counting.
   */
  pause () {
    // Update the interval
    clearInterval(this.interval)
    this.interval = null
    // Update toggle button icon
    this.constructor.setSvgUseSymbol(this.buttonUse, 'play')
  }

  /**
   * Toggles counting.
   */
  toggle () {
    this.interval === null ? this.resume() : this.pause()
  }

  /**
   * Sets the symbol referenced by an SVG use element.
   * @param {SVGUseElement} useElement - SVG use element.
   * @param {string} symbolId - SVG symbol ID.
   */
  static setSvgUseSymbol (useElement, symbolId) {
    useElement.setAttribute('xlink:href', useElement.getAttribute('xlink:href').replace(/([^#]+$)/, symbolId))
  }
}
