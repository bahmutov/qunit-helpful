(function () {
  QUnit.module('works with named or anonymous tests');

  QUnit.test('named test', 0, function example() {});

  QUnit.test('anonymous test', 0, function () {});

  QUnit.test('anonymous test with assertion', function () {
    /* global ok */
    ok(2 + 2 === 4);
  });
}());
