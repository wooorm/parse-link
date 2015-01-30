'use strict';

var url;

url = require('url').parse;

/**
 * Parse `link`.
 *
 * @param {string} link
 * @return {Object}
 */
function parseLink(link) {
    link = url(link);

    link.port = Number(link.port) || 80;

    if (link.protocol === 'mailto:' && link.pathname.charAt(0) === '/') {
        link.pathname = link.pathname.slice(1);
    }

    return link;
}

module.exports = parseLink;
