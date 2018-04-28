'use strict';

var test = require('tape');
var parse = require('.');

test('parse(url)', function (t) {
  t.equal(
    parse('http://google.com/foo/bar').href,
    'http://google.com/foo/bar',
    '`href`: without trailing slash'
  );

  t.equal(
    parse('http://google.com/foo/bar/').href,
    'http://google.com/foo/bar/',
    '`href`: with trailing slash'
  );

  t.equal(
    parse('http://user:pass@host.com:8080/path?query=string#hash').href,
    'http://user:pass@host.com:8080/path?query=string#hash',
    '`href`: with auth, search, hash'
  );

  t.equal(
    parse('http://google.com/foo/bar').pathname,
    '/foo/bar',
    '`pathname`: absolute'
  );

  t.equal(
    parse('/p/a/t/h').pathname,
    '/p/a/t/h',
    '`pathname`: relative'
  );

  t.equal(
    parse('mailto:test@example.com').pathname,
    '',
    '`pathname`: mailto'
  );

  t.equal(
    parse('http://google.com/foo/bar').protocol,
    'http:',
    '`protocol`: http'
  );

  t.equal(
    parse('mailto:test+1@gmail.com').protocol,
    'mailto:',
    '`protocol`: mailto'
  );

  t.equal(
    parse('https://example.com').protocol,
    'https:',
    '`protocol`: https'
  );

  t.equal(
    parse('some-app:in-an-url').protocol,
    'some-app:',
    '`protocol`: app URL'
  );

  t.equal(
    parse('/p/a/t/h').protocol,
    '',
    '`protocol`: relative'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').hostname,
    'google.com',
    '`hostname`: relative'
  );

  t.equal(
    parse('/one/two/four').hostname,
    '',
    '`hostname`: relative'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').host,
    'google.com:3000',
    '`host`: with protocol'
  );

  t.equal(
    parse('google.com/foo/bar').host,
    '',
    '`host`: without protocol'
  );

  t.equal(
    parse('http://google.com/foo/bar').port,
    80,
    '`port`: portless, on http'
  );

  t.equal(
    parse('https://google.com/foo/bar').port,
    443,
    '`port`: portless, on https'
  );

  t.equal(
    parse('http://google.com:80/foo/bar').port,
    80,
    '`port`: explicit (1)'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').port,
    3000,
    '`port`: explicit (2)'
  );

  t.equal(
    parse('google.com/foo/bar').port,
    80,
    '`port`: missing'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar?name=tobi').search,
    '?name=tobi',
    '`search`'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').search,
    '',
    '`search`: missing'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar?name=tobi').query,
    'name=tobi',
    '`query`'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').query,
    '',
    '`query`: missing'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar#something').hash,
    '#something',
    '`hash`'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').hash,
    '',
    '`hash`: missing'
  );

  t.equal(
    parse('http://google.com:3000/foo/bar').hash,
    '',
    '`hash`: missing'
  );

  t.end();
});

test('parse(url, relative)', function (t) {
  t.equal(
    parse('/one/two/three', 'four').pathname,
    '/one/two/four',
    'should work with relative paths'
  );

  t.equal(
    parse('http://example.com/', '/one').href,
    'http://example.com/one',
    'should work with relative paths'
  );

  t.end();
});
