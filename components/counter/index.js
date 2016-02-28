export default class Counter {
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
  resume () {
    this.counter = setInterval(() => {
      this.output.innerHTML = ++this.time
    }, 1000)
    this.paused = false
    this.element.classList.remove('paused')
  }
  pause () {
    clearInterval(this.counter)
    this.counter = null
    this.paused = true
    this.element.classList.add('paused')
  }
}
