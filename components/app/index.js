import 'dom4'
import 'svgxuse'
import domready from 'domready'
import Counter from '../counter'

domready(() => {
  // Initialize counters
  document.queryAll('[data-component="counter"]').forEach(element => {
    new Counter({
      element
    })
  })
})
