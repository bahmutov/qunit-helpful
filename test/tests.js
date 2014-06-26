(function () {
  QUnit.module('works with named or anonymous tests');

  QUnit.test('named test', 0, function example() {});

  QUnit.test('anonymous test', 0, function () {});

  QUnit.test('anonymous test with assertion', function () {
    ok(2 + 2 === 4);
  });
}());

(function () {
  /* global ok */
  QUnit.module('ok');

  QUnit.test('ok with message', function example() {
    ok(true, 'simple ok');
  });

  QUnit.test('ok without message', function example() {
    ok(true);
  });

  QUnit.test('ok expression', function example() {
    // jshint -W109
    ok(2 + 2 === 4);
    ok('foo' + 'bar' == 'foobar');
    ok("foo" + "bar" == 'foobar');
  });
}());
