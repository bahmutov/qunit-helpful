# qunit-inject

QUnit plugin to add dependency injection from module to unit tests.

[Test page](http://glebbahmutov.com/qunit-inject/)

[![NPM][qunit-inject-icon]][qunit-inject-url]

[![Build status][qunit-inject-ci-image]][qunit-inject-ci-url]
[![dependencies][qunit-inject-dependencies-image]][qunit-inject-dependencies-url]
[![devdependencies][qunit-inject-devdependencies-image]][qunit-inject-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

## Example:

```js
QUnit.module('inject two variable', {
  a: 10,
  b: 32
});

QUnit.test('injected values', function (a, b) {
  QUnit.equal(a, 10, 'valua a injected');
  QUnit.equal(b, 32, 'valua b injected');
});
```

You can create / modify values to be injected in `setup` function

```js
QUnit.module('inject with setup', {
  a: 10,
  setup: function () {
    this.a = 42;
  }
});
// a = 42 in each unit test that needs it
```

## Install

Node:

```
npm install qunit-inject --save-dev
// load qunit-inject before unit tests
```

Browser:

```
bower install qunit-inject
// include the qunit js script first, then
<script src="bower_components/qunit-inject/qunit-inject-browser.js"></script>
// then include user tests
```

## Partial injection

*qunit-inject* correctly handles `assert` argument in each test using
[partial injection](https://github.com/bahmutov/heroin#partial-dependency-injection).

```js
QUnit.module('QUnit.assert tests WITH injection', {
  a: 42,
  b: 1
});
QUnit.test('injection sandwich', function (b, assert, a) {
  assert.equal(a, 42, 'assert works');
  assert.equal(b, 1, 'b value');
});
```

## Related

Dependency injection implemented using [heroin](https://github.com/bahmutov/heroin)

Other QUnit plugins I made:

* [qunit-once](https://github.com/bahmutov/qunit-once)
* [qunit-promises](https://github.com/bahmutov/qunit-promises)

## Limitation

The injection is not minification safe, since minifier shortens the argument names.

## Small print

Author: Gleb Bahmutov &copy; 2014 @bahmutov

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[qunit-inject-icon]: https://nodei.co/npm/qunit-inject.png?downloads=true
[qunit-inject-url]: https://npmjs.org/package/qunit-inject
[qunit-inject-ci-image]: https://travis-ci.org/bahmutov/qunit-inject.png?branch=master
[qunit-inject-ci-url]: https://travis-ci.org/bahmutov/qunit-inject
[qunit-inject-dependencies-image]: https://david-dm.org/bahmutov/qunit-inject.png
[qunit-inject-dependencies-url]: https://david-dm.org/bahmutov/qunit-inject
[qunit-inject-devdependencies-image]: https://david-dm.org/bahmutov/qunit-inject/dev-status.png
[qunit-inject-devdependencies-url]: https://david-dm.org/bahmutov/qunit-inject#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
