# parse-link

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Unified URL parsing API in the browser and Node.

## Installation

[npm][]:

```bash
npm install parse-link
```

## Usage

```js
var parse = require('parse-link')

console.log(parse('http://user:pass@host.com:8080/path?query=string#hash'))
```

Yields:

```js
{
  protocol: 'http:',
  host: 'host.com:8080',
  port: 8080,
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/path',
  href: 'http://user:pass@host.com:8080/path?query=string#hash' }
```

> Node also supports some more properties, like `path`
> (`"/path?query=string"`) and `auth` (`"user:pass"`).

## API

### `parse(url)`

Parses `url` (`string`).  Uses anchor tags in the browser, and Node’s
URL module in Node.

###### Returns

`Object`:

*   `href` (string) — given (cleaned) url
*   `pathname` (string) — path
*   `protocol` (string) — `http:`, `https:`, `mailto:`, etc
*   `hostname` (string) — complete domain, including subdomains and `www.`
*   `host` (string) — `hostname` with port
*   `port` (number) — TCP port
*   `search` (string) — `query` with question mark
*   `query` (string) — GET parameters
*   `hash` (string) — Hash, including pound/octothorp/what-evs

> Node supports a second parameter which the given `url`
> is `relative` to: In the browser, URLs are parsed relative
> to `window.location`, whereas in Node such a thing doesn’t
> exist.

## Todo

There are still some slight differences between the two interfaces: mostly in
non-http settings, or with relative links.  I’d like to make them look more
alike.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/parse-link.svg

[build]: https://travis-ci.org/wooorm/parse-link

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/parse-link.svg

[coverage]: https://codecov.io/github/wooorm/parse-link

[downloads-badge]: https://img.shields.io/npm/dm/parse-link.svg

[downloads]: https://www.npmjs.com/package/parse-link

[size-badge]: https://img.shields.io/bundlephobia/minzip/parse-link.svg

[size]: https://bundlephobia.com/result?p=parse-link

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
