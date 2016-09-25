/**
 * A controllable counter component that tracks time in seconds.
 * @author Jayden Seric
 */
export default class Counter {
  /**
   * Constructs a new counter component.
   * @param {Object} options - Options.
   * @param {HTMLElement} options.element - Container.
   * @param {number} [options.time=0] - Start time in seconds.
   */
  constructor ({
    element,
    time = 0
  }) {
    this.element = element
    this.output = element.querySelector('output')
    this.button = element.querySelector('button')
    this.interval = null
    this.time = time
    this.paused = false
    // Enable toggle button
    this.button.addEventListener('click', ::this.toggle)
  }

  /**
   * Resumes counting.
   */
  resume () {
    this.interval = setInterval(() => {
      this.output.innerHTML = ++this.time
    }, 1000)
    this.paused = false
    this.element.classList.remove('paused')
  }

  /**
   * Pauses counting.
   */
  pause () {
    clearInterval(this.interval)
    this.interval = null
    this.paused = true
    this.element.classList.add('paused')
  }

  /**
   * Toggles counting.
   */
  toggle () {
    this.interval === null ? this.resume() : this.pause()
  }
}
