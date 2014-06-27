(function () {
  QUnit.module('QUnit.equal');

  QUnit.test('QUnit.equal expressions', function () {
    QUnit.equal(2 + 3 + 4, 10 - 1);
    QUnit.equal('foo', 'fo' + 'o', 'comparing foo strings');
  });
}());
