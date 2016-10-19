import Counter from '../counter'

/**
 * An intro component containing a counter demo.
 * @author Jayden Seric
 */
export default class Intro {
  /**
   * Constructs a new intro component.
   * @param {Object} options - Options.
   * @param {HTMLElement} element - Container.
   */
  constructor (options) {
    this.element = options.element
    this.counter = new Counter({
      element: this.element.querySelector('[data-component="counter"]')
    })
  }
}
