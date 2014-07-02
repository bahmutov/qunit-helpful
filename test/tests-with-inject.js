(function () {
  QUnit.module('using inject', {
    foo: 'foo'
  });

  QUnit.test('just injection', function (foo) {
    console.log('foo is', foo);
    if (typeof foo !== 'string') {
      throw new Error('invalid foo, not a string, but ' + foo);
    }
    if (foo !== 'foo') {
      throw new Error('foo not "foo", but ' + foo);
    }
    QUnit.equal(foo, 'foo');
  });

  QUnit.test('just injection with assertion', function (foo) {
    QUnit.equal(foo, 'foo');
  });
}());

