'use strict'

var url = require('component-url').parse

module.exports = parse

function parse(link) {
  link = url(link)

  link.port = Number(link.port) || 80

  if (link.protocol === 'mailto:' && link.pathname.charAt(0) === '/') {
    link.pathname = link.pathname.slice(1)
  }

  return link
}
