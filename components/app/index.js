import 'dom4'
import 'svgxuse'
import domready from 'domready'
import Intro from '../intro'

domready(() => {
  new Intro({
    element: document.querySelector('.intro')
  })
})
