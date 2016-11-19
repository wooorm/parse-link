'use strict';

var url = require('url');

module.exports = parse;

var port = 80;

function parse(link, relative) {
  if (relative) {
    link = url.resolve(link, relative);
  }

  link = url.parse(link);

  link.port = Number(link.port) || inferPort(link.protocol) || port;

  if (link.hash === null) {
    link.hash = '';
  }

  if (link.query === null) {
    link.query = '';
  }

  if (link.search === null) {
    link.search = '';
  }

  if (link.host === null) {
    link.host = '';
  }

  if (link.hostname === null) {
    link.hostname = '';
  }

  if (link.protocol === null) {
    link.protocol = '';
  }

  if (link.pathname === null) {
    link.pathname = '';
  }

  return link;
}

/* Infer port from a protocol. */
function inferPort(protocol) {
  if (protocol === 'http:') {
    return 80;
  }

  if (protocol === 'https:') {
    return 443;
  }
}
