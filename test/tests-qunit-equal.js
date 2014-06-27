(function () {
  /* global equal */
  QUnit.module('equal');

  QUnit.test('equal expressions', function () {
    equal(100 + 1, '10' + '1');
    equal('foo', 'fo' + 'o', 'comparing foo strings');
  });
}());
