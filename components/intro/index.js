import Counter from '../counter'

/**
 * An intro component containing a counter demo.
 * @author Jayden Seric
 */
export default class Intro {
  /**
   * Constructs a new Intro instance.
   * @param {HTMLElement} element - Containing element.
   */
  constructor (element) {
    // Initialize the counter component
    new Counter(element.query('.counter'))
  }
}
