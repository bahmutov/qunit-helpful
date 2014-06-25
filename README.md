# qunit-helpful

> QUnit plugin to automatically show helpful info for failed assertions

[Test page](http://glebbahmutov.com/qunit-helpful/)

[![NPM][qunit-helpful-icon]][qunit-helpful-url]

[![Build status][qunit-helpful-ci-image]][qunit-helpful-ci-url]
[![dependencies][qunit-helpful-dependencies-image]][qunit-helpful-dependencies-url]
[![devdependencies][qunit-helpful-devdependencies-image]][qunit-helpful-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

## Example:

```js
// Standard QUnit
QUnit.test('ok expression', function example() {
  ok(2 + 2 === 5);
});
// output
Errors:
Module: global function syntax (ok, equal) Test: ok expression
// load qunit-helpful.js before tests, same test output
Errors:
Module: global function syntax (ok, equal) Test: ok expression
failed ok "2 + 2 === 5"
```

### QUnit with failed ok(expression)

![qunit-helpful-off](images/qunit-helpful-off.png)

### QUnit + qunit-helpful with failed ok(expression)

![qunit-helpful-on](images/qunit-helpful-on.png)

## Explanation

QUnit (Jasmine, Mocha, etc) first evaluates the arguments, then passes the computed
values to assertion functions. Thus the failed assertion has no idea what the actual expression was
that failed. This forces you to write assertion messages, repeating the test condition

```js
QUnit.ok(2 + 2 === 4, '2 + 2 === 4');
QUnit.equal(foo('a', 1), 'foo-a-1', 'calling foo with "a" and 1 produces "foo-a-1"');
```

*qunit-helpful* automatically rewrites your tests before QUnit executes them,
adding the condition *souce* to the message string. Thus you can skip writing the
same stuff

```js
QUnit.ok(2 + 2 === 4);
// will be evaluated by QUnit as
// QUnit.ok(2 + 2 === 4, 'ok 2 + 2 === 4');
QUnit.equal(foo('a', 1), 'foo-a-1');
// will be evaluated by QUnit as
// QUnit.equal(foo('a', 1), 'foo-a-1', 'equal "foo('a', 1)" and "foo-a-1"');
```

## Install

Node:

```
npm install qunit-helpful --save-dev
// load qunit-helpful before unit tests
```

Browser:

```
bower install qunit-helpful
// include the qunit js script first, then
<script src="bower_components/qunit-helpful/qunit-helpful-browser.js"></script>
// then include user tests
```

## Related

Other QUnit plugins I wrote:

* [qunit-once](https://github.com/bahmutov/qunit-once)
* [qunit-promises](https://github.com/bahmutov/qunit-promises)
* [qunit-inject](https://github.com/bahmutov/qunit-inject)

## Small print

Author: Gleb Bahmutov &copy; 2014 @bahmutov

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[qunit-helpful-icon]: https://nodei.co/npm/qunit-helpful.png?downloads=true
[qunit-helpful-url]: https://npmjs.org/package/qunit-helpful
[qunit-helpful-ci-image]: https://travis-ci.org/bahmutov/qunit-helpful.png?branch=master
[qunit-helpful-ci-url]: https://travis-ci.org/bahmutov/qunit-helpful
[qunit-helpful-dependencies-image]: https://david-dm.org/bahmutov/qunit-helpful.png
[qunit-helpful-dependencies-url]: https://david-dm.org/bahmutov/qunit-helpful
[qunit-helpful-devdependencies-image]: https://david-dm.org/bahmutov/qunit-helpful/dev-status.png
[qunit-helpful-devdependencies-url]: https://david-dm.org/bahmutov/qunit-helpful#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
