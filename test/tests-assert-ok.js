(function () {
  QUnit.module('assert.ok');

  QUnit.test('assert.ok with message', function t1(assert) {
    assert.ok(2 + 2 === 5, 'addition equality');
  });

  /*
  QUnit.test('QUnit.ok without message', function (assert) {
    assert.ok(typeof QUnit === 'object');
  });*/
}());
