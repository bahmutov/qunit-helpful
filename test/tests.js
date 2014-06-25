(function () {
  /* global ok */
  QUnit.module('global function syntax: ok, equal');

  QUnit.test('ok with message', function example() {
    ok(true, 'simple ok');
  });

  QUnit.test('ok without message', function example() {
    ok(true);
  });
}());
