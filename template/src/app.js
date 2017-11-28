
import 'purecss/build/base-min.css'
import 'purecss/build/grids-min.css'

import './theme.styl'

import Vue from 'vue/dist/vue.esm.js'
import Tabset from './components/Tabset'
import Tab from './components/Tab'

import scrollToElem from 'scroll-to-element'
import scrollTo from 'scroll-to'

/**
 * Adds even listeners to elements that match a selector
 * @param  {string|EventTarget} selector The selector or a dom element
 * @param  {string}     eventName The event to add listeners for
 * @param  {Function}   callback  The event listener (event, elem)
 * @param  {DOMElement} [parent]  An alternate parent to query from
 */
function on(selector, eventName, callback, parent = null) {
  
  // If passed an EventTarget, add the events to that
  if (selector instanceof EventTarget) {
    selector.addEventListener(eventName, (e) => callback(e, selector))
  }
  else if (typeof eventName === 'string') {
    
    // If passed a string, query the selector
    (parent || document).querySelectorAll(selector).forEach(elem =>
      elem.addEventListener(eventName, e => callback(e, elem)))
  }
}


let currentVersion = null


// Do things when the DOM is ready
on(document, 'DOMContentLoaded', event => {
  
  processWindowHash(window.location.hash)
  
  // Scroll to endpoints when clicking the sidebar
  on('ul.endpoint-list li', 'click', (e, elem) => {
    setActiveEndpoint(elem.dataset.endpoint)
  })
  
  // Process the hash when it manually changes
  on(window, 'hashchange', (e, elem) => {
    processWindowHash(window.location.hash)
  })
  
  // Set the version when the select changes
  on('select.version-picker', 'change', (e, elem) => {
    
    // Scroll to the top, then set the version & hash
    window.scrollTo(0, 0)
    setActiveVersion(e.target.value)
    setWindowHash(`${e.target.value}/`)
  })
  
  // Scroll to the top when clicking the header
  on('header .title', 'click', () => {
    scrollTo(0, 0, { duration: 500, ease: 'inOutCube' })
  })
})


/** Set the windows hash (using history mode if available) */
function setWindowHash(newHash) {
  if (history.pushState) history.pushState(null, null, `#${newHash}`)
  else window.location.hash = '#myhash'
}


/** Process a window's hash into a version / endpoint */
function processWindowHash(hash) {
  
  // If there is a window hash, activate that endpoint
  let [version, endpoint] = (hash || '').replace('#', '').split('/')
  
  // If the version is valid, set it
  if (document.getElementById(version)) {
    setActiveVersion(version)
  }
  else {
    
    // If there isn't one, pick the last version
    let allVersions = document.querySelectorAll('div.version')
    let lastVersion = allVersions[allVersions.length - 1]
    if (lastVersion) setActiveVersion(lastVersion.id)
  }
  
  // If there is a version & an endpoint to select, select it
  if (document.getElementById(`${currentVersion}.${endpoint}`)) {
    setActiveEndpoint(endpoint, false)
  }
}


/** Sets the endpoint to highlight */
function setActiveEndpoint(endpoint, animated = true) {
  
  // Skip if theres no version set
  if (!currentVersion) return
  
  // Scroll to the endpoint definition
  let fullId = `${currentVersion}.${endpoint}`
  scrollToElem(document.getElementById(fullId), {
    offset: -120,
    duration: animated ? 500 : 0,
    ease: 'inOutCube'
  })
  
  // Remove the active class from existing endpoints
  
  document.querySelectorAll('section.group article.endpoint').forEach(elem => {
    let action = elem.id === fullId ? 'add' : 'remove'
    elem.classList[action]('active')
  })
  
  // Update the window's hash
  setWindowHash(`${currentVersion}/${endpoint}`)
}

/** Sets the version to show */
function setActiveVersion(version) {
  
  // Set the current version
  currentVersion = version
  
  // Set the current version to active & others to inactive
  document.querySelectorAll('div.version').forEach(elem => {
    let action = elem.id === version ? 'add' : 'remove'
    elem.classList[action]('active')
  })
  
  // Set all endpoints to inactive
  document.querySelectorAll('section.group article.endpoint').forEach(elem => {
    elem.classList.remove('active')
  })
  
  // Set the picker's value
  let picker = document.querySelector('select.version-picker')
  picker.value = version
}


/* eslint-disable no-new */
// Create the vue app (adds tabbars)
new Vue({
  el: '#webapp',
  components: { Tabset, Tab }
})
