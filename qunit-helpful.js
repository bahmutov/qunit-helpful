var check = require('check-types');
var falafel = require('falafel');

(function (env) {
  function rewriteOkMessage(assertStatement) {
    console.log('rewriting ok');
    console.log(assertStatement.source());
    var conditionNode = assertStatement.expression.arguments[0];
    var condition = conditionNode.source();
    condition = condition.replace(/'/g, '"');
    var helpfulMessage = '\'failed ok [' + condition + ']';

    var msgArg = assertStatement.expression.arguments[1];
    if (msgArg) {
      var message = msgArg.source();
      var strippedQuotes = message.replace(/'/g, '');
      helpfulMessage += ', ' + strippedQuotes + '\'';
      msgArg.update(helpfulMessage);
    } else {
      conditionNode.update(condition + ', ' + helpfulMessage + '\'');
    }
  }

  function rewriteTestFunction(node) {
    if (node.type === 'BlockStatement') {
      node.body.forEach(function (statement) {
        if (statement.type === 'ExpressionStatement' &&
          statement.expression.type === 'CallExpression' &&
          statement.expression.callee.name === 'ok') {
            rewriteOkMessage(statement);
          }

      });
    }
  }

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

      check.verify.unemptyString(fn.name,
        'for now qunit-helpful needs test function to have a name');
      var output = falafel(fn.toString(), rewriteTestFunction);
      console.log('rewritten function\n' + output);
      /* jshint -W061 */
      fn = eval('(' + output + ')');

      _test.call(QUnit, name, fn);
    };
  }(env.QUnit));
}(typeof global === 'object' ? global : window));

