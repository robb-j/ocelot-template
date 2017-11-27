
import 'purecss/build/base-min.css'
import 'purecss/build/grids-min.css'

import './theme.styl'

import Vue from 'vue/dist/vue.esm.js'
import Tabset from './components/Tabset'
import Tab from './components/Tab'

import scrollToElem from 'scroll-to-element'

function on(selector, eventName, callback) {
  document.querySelectorAll(selector).forEach(elem => {
    elem.addEventListener(eventName, e => callback(e, elem))
  })
}


// Scroll to endpoints when clicking the sidebar
on('ul.endpoint-list li', 'click', (e, elem) => {
  let dest = document.getElementById(elem.dataset.endpoint)
  scrollToElem(dest, { offset: -120 })
})

/* eslint-disable no-new */
new Vue({
  el: '#webapp',
  components: { Tabset, Tab }
})
