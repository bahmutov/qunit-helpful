(function () {
  QUnit.module('using inject', {
    foo: 'foo'
  });

  QUnit.test('just injection', 0, function (foo) {
    console.log('foo is', foo);
    if (typeof foo !== 'string') {
      throw new Error('invalid foo, not a string, but ' + foo);
    }
    if (foo !== 'foo') {
      throw new Error('foo not "foo", but ' + foo);
    }
  });

  QUnit.test('just injection with assertion', function (foo) {
    QUnit.equal(foo, 'f' + 'o' + 'o');
  });
}());

