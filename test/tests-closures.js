(function (root) {
  QUnit.module('window variables', {
    setup: function () {
      root.foo = 'foo';
    },
    teardown: function () {
      delete root.foo;
    }
  });

  QUnit.test('global variable', function () {
    /* global foo */
    QUnit.equal(foo, 'foo');
  });
}(typeof window !== 'undefined' ? window : global));

/*
(function () {
  QUnit.module('closure variables');

  var foo = 'foo';

  QUnit.test('variable foo', function () {
    QUnit.equal(foo, 'fo');
  });
}());
*/
