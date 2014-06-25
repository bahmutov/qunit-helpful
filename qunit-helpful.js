var check = require('check-types');

(function (env) {
  (function (QUnit) {
    check.verify.object(QUnit, 'undefined QUnit object');
    check.verify.fn(QUnit.test, 'QUnit.test should be a function');

    if (env.__qunit_helpful_initialized) {
      return;
    }
    env.__qunit_helpful_initialized = true;

    var _test = QUnit.test;

    QUnit.test = function (a1, a2) {
      var name = a1, fn = a2;
      if (typeof a1 === 'function') {
        fn = a1;
        name = fn.name;
      }
      check.verify.string(name, 'missing test name string');
      check.verify.fn(fn, 'missing test function');

      _test.call(QUnit, name, fn);
    };
  }(env.QUnit));
}(typeof global === 'object' ? global : window));

