'use strict';

/**
 * Dependencies.
 */

var parseUrl,
    assert;

try {
    parseUrl = require('parse-' + 'url');
} catch (exception) {
    try {
        parseUrl = require('..');
    } catch (exception2) {
        throw new Error(
            'Could not load parse-url'
        );
    }
}

try {
    assert = require('assert');
} catch (exception) {
    assert = window.assert;
}

/**
 * Tests.
 */

describe('parse-url()', function () {
    it('should be a `function`', function () {
          assert(typeof parseUrl === 'function');
    });

    it('should have a `href` property', function () {
        var url,
            ur2,
            ur3;

        url = parseUrl('http://google.com/foo/bar');
        ur2 = parseUrl('http://google.com/foo/bar/');
        ur3 = parseUrl(
            'http://user:pass@host.com:8080/path?query=string#hash'
        );

        assert(url.href === 'http://google.com/foo/bar');
        assert(ur2.href === 'http://google.com/foo/bar/');
        assert(
            ur3.href ===
            'http://user:pass@host.com:8080/path?query=string#hash'
        );
    });

    it('should have a `pathname` property', function () {
        var url,
            ur2,
            ur3;

        url = parseUrl('http://google.com/foo/bar');
        ur2 = parseUrl('/p/a/t/h');
        ur3 = parseUrl('mailto:test@example.com');

        assert(url.pathname === '/foo/bar');
        assert(ur2.pathname === '/p/a/t/h');

        /* istanbul ignore else: browser */
        if (parseUrl.length === 2) {
            assert(ur3.pathname === '');
        } else {
            assert(ur3.pathname === 'test@example.com');
        }
    });

    it('should have a `protocol` property', function () {
        var url,
            ur2,
            ur3,
            ur4,
            ur5;

        url = parseUrl('http://google.com/foo/bar');
        ur2 = parseUrl('mailto:test+1@gmail.com');
        ur3 = parseUrl('https://example.com');
        ur4 = parseUrl('some-app:in-an-url');
        ur5 = parseUrl('/p/a/t/h');

        assert(url.protocol === 'http:');
        assert(ur2.protocol === 'mailto:');
        assert(ur3.protocol === 'https:');
        assert(ur4.protocol === 'some-app:');

        /* istanbul ignore else: browser */
        if (parseUrl.length === 2) {
            assert(ur5.protocol === '');
        } else {
            assert(ur5.protocol === 'file:');
        }
    });

    it('should have a `hostname` property', function () {
        var url,
            ur2;

        url = parseUrl('http://google.com:3000/foo/bar');

        assert(url.hostname === 'google.com');

        ur2 = parseUrl('/one/two/four');

        assert(ur2.hostname === '');
    });

    it('should have a `host` property', function () {
        var url,
            ur2;

        url = parseUrl('http://google.com:3000/foo/bar');

        assert(url.host === 'google.com:3000');

        ur2 = parseUrl('google.com/foo/bar');

        assert(ur2.host === '');
    });

    it('should have a `port` property', function () {
        var url,
            ur2,
            ur3,
            ur4,
            ur5;

        url = parseUrl('http://google.com/foo/bar');
        ur2 = parseUrl('https://google.com/foo/bar');
        ur3 = parseUrl('http://google.com:80/foo/bar');
        ur4 = parseUrl('http://google.com:3000/foo/bar');
        ur5 = parseUrl('google.com/foo/bar');

        assert(url.port === 80);
        assert(ur2.port === 443);
        assert(ur3.port === 80);
        assert(ur4.port === 3000);
        assert(ur5.port === 80);
    });

    it('should have a `search` property', function () {
        var url,
            ur2;

        url = parseUrl('http://google.com:3000/foo/bar?name=tobi');

        assert(url.search === '?name=tobi');

        ur2 = parseUrl('http://google.com:3000/foo/bar');

        assert(ur2.search === '');
    });

    it('should have a `query` property', function () {
        var url,
            ur2;

        url = parseUrl('http://google.com:3000/foo/bar?name=tobi');

        assert(url.query === 'name=tobi');

        ur2 = parseUrl('http://google.com:3000/foo/bar');

        assert(ur2.query === '');
    });

    it('should have a `hash` property', function () {
        var url,
            ur2;

        url = parseUrl('http://google.com:3000/foo/bar#something');

        assert(url.hash === '#something');

        ur2 = parseUrl('http://google.com:3000/foo/bar');

        assert(ur2.hash === '');
    });
});

/**
 * Node.js specific `location`-like relative.
 */

if (parseUrl.length === 2) {
    describe('parse-url(url, relative)', function () {
        it('should work with relative paths', function () {
            assert(
                parseUrl('/one/two/three', 'four').pathname ===
                '/one/two/four'
            );
        });

        it('should work with absolute paths', function () {
            assert(
                parseUrl('http://example.com/', '/one').href ===
                'http://example.com/one'
            );
        });
    });
}
