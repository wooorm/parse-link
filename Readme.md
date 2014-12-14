# parse-link [![Build Status](https://img.shields.io/travis/wooorm/parse-link.svg?style=flat)](https://travis-ci.org/wooorm/parse-link) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-link.svg?style=flat)](https://coveralls.io/r/wooorm/parse-link?branch=master)

Unified URL parsing API in the browser and node.

## Installation

npm:
```sh
$ npm install parse-link
```

Component:
```sh
$ component install wooorm/parse-link
```

Note, if you Browserify the `npm` module, you'll include Node's url module, not the anchor-tag browser functionality.

## Usage

```js
var parseLink = require('parse-link');

parseLink('http://user:pass@host.com:8080/path?query=string#hash');
```

Yields:

```json
{
  "protocol": "http:",
  "host": "host.com:8080",
  "port": 8080,
  "hostname": "host.com",
  "hash": "#hash",
  "search": "?query=string",
  "query": "query=string",
  "pathname": "/path",
  "href": "http://user:pass@host.com:8080/path?query=string#hash"
}
```

> Node.js also supports some more properties, like `path` (`"/path?query=string"`) and `auth` (`"user:pass"`), which I’ll work on soon.

## API

### parse-link(url)

Parses `url`. Returns an object with the following properties:

- `href` (string) — given (cleaned) url;
- `pathname` (string) — path;
- `protocol` (string) — `http:`, `https:`, `mailto:`, etc;
- `hostname` (string) — complete domain, including subdomains and `www.`;
- `host` (string) — `hostname` with port;
- `port` (number) — TCP port;
- `search` (string) — `query` with question mark;
- `query` (string) — GET parameters;
- `hash` (string) — Hash with pound/octothorp/what-evs;

> Node supports a second parameter which the given `url` is `relative` to: In the browser, URLs are parsed relative to `window.location`, whereas in Node such a thing doesn’t exist.

## Under the hood

Uses anchor tags in the browser, and Node’s URL module in Node.

## Todo

There are still some slight differences between the two interfaces: mostly in non-http settings, or with relative links. I’d like to make them look more alike.

## License

MIT @ [Titus Wormer](http://wooorm.com)
