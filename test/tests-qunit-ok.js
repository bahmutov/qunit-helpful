(function () {
  QUnit.module('QUnit.ok');

  QUnit.test('QUnit.ok with message', function example() {
    QUnit.ok(true, 'simple ok');
  });

  QUnit.test('QUnit.ok without message', function example() {
    QUnit.ok(true);
  });

  QUnit.test('QUnit.ok expression', function example() {
    // jshint -W109
    QUnit.ok(2 + 2 === 4);
    QUnit.ok('foo' + 'bar' == 'foobar');
    QUnit.ok("foo" + "bar" == 'foobar');
  });
}());
