(function () {
  QUnit.module('works with named or anonymous tests');

  QUnit.test('named test', 0, function example() {});

  QUnit.test('anonymous test', 0, function () {});

  QUnit.test('anonymous test with assertion', function () {
    /* global ok */
    ok(2 + 2 === 4);
  });

  QUnit.module('works with global test function');

  /* global test */
  test('helpful message in test function', function () {
    ok(2 + 2 === 4);
  });

  test('additional arguments', function () {
    var foo = 'foo';
    ok(foo === 'foo', foo);
  });

  QUnit.module('does not rewrite functions with special suffix');

  // foo cannot be used from unit tests (it is a closure variable)
  var foo = 'foo';

  QUnit.test('access foo', function checkFooNoHelp() {
    QUnit.equal(foo, 'fo' + 'o');
  });

  QUnit.test('access foo', function check_foo_no_help() {
    QUnit.equal(foo, 'fo' + 'o');
  });
}());
