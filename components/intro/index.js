import Counter from '../counter'

export default class Intro {
  constructor (element) {
    new Counter(element.query('.counter'))
  }
}
