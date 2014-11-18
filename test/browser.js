mocha.ui('bdd');
mocha.reporter('html');

window.assert = (function () {
    return function (value) {
        if (!value) {
            throw new Error(value + '!==');
        }
    };
})();
