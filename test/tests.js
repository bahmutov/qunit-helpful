QUnit.test('test without module', function () {
  QUnit.ok(true, 'test runs');
});

QUnit.module('inject two variable', {
  a: 10,
  b: 32
});

QUnit.test('no injection', function () {
  QUnit.ok(true, 'test runs');
});

QUnit.test('injected values', function (a, b) {
  QUnit.equal(a, 10, 'valua a injected');
  QUnit.equal(b, 32, 'valua b injected');
});

QUnit.module('inject with setup', {
  a: 10,
  setup: function () {
    this.a = 42;
  }
});

QUnit.test('injected from setup', function (a) {
  QUnit.equal(a, 42, 'value was changed by module setup');
});

QUnit.module('create in setup', {
  setup: function () {
    this.a = 42;
  }
});

QUnit.test('injected from setup', function (a) {
  QUnit.equal(a, 42, 'a was created by setup');
});

QUnit.module('teardown', {
  setup: function () {
    if (typeof this.a !== 'undefined') {
      if (this.a !== 1) {
        throw new Error('value a should have been changed by teardown ' + this.a);
      }
    }
    this.a = 42;
  },
  teardown: function () {
    if (this.a !== 42) {
      throw new Error('Expected a to be 42, have ' + this.a);
    }
    this.a = 1;
  }
});

QUnit.test('test 1', function (a) {
  QUnit.equal(a, 42);
});

QUnit.test('test 2', function (a) {
  QUnit.equal(a, 42);
});

// http://api.qunitjs.com/test/
QUnit.module('QUnit.assert tests without injection');

QUnit.test('no injection, just assert', function (assert) {
  QUnit.equal(typeof assert, 'object', 'assert is an object');
  QUnit.equal(typeof assert.ok, 'function', 'assert.ok is a function');
});

QUnit.module('QUnit.assert tests WITH injection', {
  a: 42,
  b: 1
});

QUnit.test('inject and assert', function (a, assert) {
  QUnit.equal(typeof assert, 'object', 'assert is an object');
  QUnit.equal(typeof assert.ok, 'function', 'assert.ok is a function');
  QUnit.equal(a, 42, 'injected value');
  assert.equal(a, 42, 'assert works');
});

QUnit.test('assert and inject', function (assert, a) {
  QUnit.equal(typeof assert, 'object', 'assert is an object');
  QUnit.equal(typeof assert.ok, 'function', 'assert.ok is a function');
  QUnit.equal(a, 42, 'injected value');
  assert.equal(a, 42, 'assert works');
});

QUnit.test('injection sandwich', function (b, assert, a) {
  QUnit.equal(typeof assert, 'object', 'assert is an object');
  QUnit.equal(typeof assert.ok, 'function', 'assert.ok is a function');
  QUnit.equal(a, 42, 'injected value');
  assert.equal(a, 42, 'assert works');
  assert.equal(b, 1, 'b value');
});
