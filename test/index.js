'use strict';

/**
 * Dependencies.
 */

var linq,
    assert;

try {
    linq = require('li' + 'nq');
} catch (exception) {
    try {
        linq = require('..');
    } catch (exception2) {
        throw new Error(
            'Could not load linq'
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

describe('linq()', function () {
    it('should be a `function`', function () {
          assert(typeof linq === 'function');
    });

    it('should have a `href` property', function () {
        var url,
            ur2,
            ur3;

        url = linq('http://google.com/foo/bar');
        ur2 = linq('http://google.com/foo/bar/');
        ur3 = linq('http://user:pass@host.com:8080/path?query=string#hash');

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

        url = linq('http://google.com/foo/bar');
        ur2 = linq('/p/a/t/h');
        ur3 = linq('mailto:test@example.com');

        assert(url.pathname === '/foo/bar');
        assert(ur2.pathname === '/p/a/t/h');

        /* istanbul ignore else: browser */
        if (linq.length === 2) {
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

        url = linq('http://google.com/foo/bar');
        ur2 = linq('mailto:test+1@gmail.com');
        ur3 = linq('https://example.com');
        ur4 = linq('some-app:in-an-url');
        ur5 = linq('/p/a/t/h');

        assert(url.protocol === 'http:');
        assert(ur2.protocol === 'mailto:');
        assert(ur3.protocol === 'https:');
        assert(ur4.protocol === 'some-app:');

        /* istanbul ignore else: browser */
        if (linq.length === 2) {
            assert(ur5.protocol === '');
        } else {
            assert(ur5.protocol === 'file:');
        }
    });

    it('should have a `hostname` property', function () {
        var url,
            ur2;

        url = linq('http://google.com:3000/foo/bar');

        assert(url.hostname === 'google.com');

        ur2 = linq('/one/two/four');

        assert(ur2.hostname === '');
    });

    it('should have a `host` property', function () {
        var url,
            ur2;

        url = linq('http://google.com:3000/foo/bar');

        assert(url.host === 'google.com:3000');

        ur2 = linq('google.com/foo/bar');

        assert(ur2.host === '');
    });

    it('should have a `port` property', function () {
        var url,
            ur2,
            ur3,
            ur4,
            ur5;

        url = linq('http://google.com/foo/bar');
        ur2 = linq('https://google.com/foo/bar');
        ur3 = linq('http://google.com:80/foo/bar');
        ur4 = linq('http://google.com:3000/foo/bar');
        ur5 = linq('google.com/foo/bar');

        assert(url.port === 80);
        assert(ur2.port === 443);
        assert(ur3.port === 80);
        assert(ur4.port === 3000);
        assert(ur5.port === 80);
    });

    it('should have a `search` property', function () {
        var url,
            ur2;

        url = linq('http://google.com:3000/foo/bar?name=tobi');

        assert(url.search === '?name=tobi');

        ur2 = linq('http://google.com:3000/foo/bar');

        assert(ur2.search === '');
    });

    it('should have a `query` property', function () {
        var url,
            ur2;

        url = linq('http://google.com:3000/foo/bar?name=tobi');

        assert(url.query === 'name=tobi');

        ur2 = linq('http://google.com:3000/foo/bar');

        assert(ur2.query === '');
    });

    it('should have a `hash` property', function () {
        var url,
            ur2;

        url = linq('http://google.com:3000/foo/bar#something');

        assert(url.hash === '#something');

        ur2 = linq('http://google.com:3000/foo/bar');

        assert(ur2.hash === '');
    });
});

/**
 * Node.js specific `location`-like relative.
 */

if (linq.length === 2) {
    describe('linq(url, relative)', function () {
        it('should work with relative paths', function () {
            assert(
                linq('/one/two/three', 'four').pathname ===
                '/one/two/four'
            );
        });

        it('should work with absolute paths', function () {
            assert(
                linq('http://example.com/', '/one').href ===
                'http://example.com/one'
            );
        });
    });
}
