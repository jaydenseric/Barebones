/**
 * A controllable counter component that tracks time in seconds.
 * @author Jayden Seric
 */
export default class Counter {
  /**
   * Constructs a new Counter instance.
   * @param {HTMLElement} element - Containing element.
   * @param {Number} [time=0] - Start time in seconds.
   */
  constructor (element, time = 0) {
    this.element = element
    this.output = element.query('output')
    this.toggle = element.query('button')
    this.counter = null
    this.time = time
    this.paused = false
    // Enable counter resume/pause toggle button
    this.toggle.addEventListener('click', () => {
      if (this.counter === null) this.resume()
      else this.pause()
    })
  }

  /**
   * Resumes counting.
   */
  resume () {
    this.counter = setInterval(() => {
      this.output.innerHTML = ++this.time
    }, 1000)
    this.paused = false
    this.element.classList.remove('paused')
  }

  /**
   * Pauses counting.
   */
  pause () {
    clearInterval(this.counter)
    this.counter = null
    this.paused = true
    this.element.classList.add('paused')
  }
}
