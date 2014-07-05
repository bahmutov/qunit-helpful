(function () {
  /* global equal */
  QUnit.module('equal');

  QUnit.test('equal expressions', function () {
    equal(100 + 1, '10' + '1');
    equal('foo', 'fo' + 'o', 'comparing foo strings');
  });

  QUnit.test('multiline condition', function () {
    equal(2 + 2,
      4 - 0);
  });
}());
