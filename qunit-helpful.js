var check = require('check-types');
var falafel = require('falafel');

(function (env) {
  function rewriteOkMessage(okStatement) {
    var conditionNode = okStatement.expression.arguments[0];
    var condition = conditionNode.source();
    condition = condition.replace(/'/g, '"');
    var helpfulMessage = '\'QUnit.ok(' + condition;
    helpfulMessage = helpfulMessage.replace('\n', '\\n');

    var msgArg = okStatement.expression.arguments[1];
    if (msgArg) {
      var message = msgArg.source();
      var strippedQuotes = message.replace(/'/g, '');
      helpfulMessage += ', "' + strippedQuotes + '")\'';
      msgArg.update(helpfulMessage);
    } else {
      conditionNode.update(condition + ', ' + helpfulMessage + ')\'');
    }
  }

  function rewriteEqualMessage(statement) {
    if (statement.expression.arguments.length < 2) {
      return;
    }

    var actualNode = statement.expression.arguments[0];
    var actual = actualNode.source();
    actual = actual.replace(/'/g, '"');

    var expectedNode = statement.expression.arguments[1];
    var expected = expectedNode.source();
    expected = expected.replace(/'/g, '"');

    var helpfulMessage = '\'QUnit.equal(' + actual + ', ' + expected;
    helpfulMessage = helpfulMessage.replace('\n', '\\n');

    var msgArg = statement.expression.arguments[2];
    if (msgArg) {
      var message = msgArg.source();
      var strippedQuotes = message.replace(/'/g, '');
      helpfulMessage += ', "' + strippedQuotes + '")\'';
      msgArg.update(helpfulMessage);
    } else {
      expectedNode.update(expected + ', ' + helpfulMessage + ')\'');
    }
  }

  function isOkAssert(statement) {
    function isOk(callee) {
      return callee.name === 'ok';
    }

    function isQunitOk(callee) {
      return callee.type === 'MemberExpression' &&
        callee.object && callee.object.name === 'QUnit' &&
        callee.property && callee.property.name === 'ok';
    }

    return isOk(statement.expression.callee) ||
      isQunitOk(statement.expression.callee);
  }

  function isEqualAssert(statement) {
    function isEqual(callee) {
      return callee.name === 'equal';
    }

    function isQunitEqual(callee) {
      return callee.type === 'MemberExpression' &&
        callee.object && callee.object.name === 'QUnit' &&
        callee.property && callee.property.name === 'equal';
    }
    return isEqual(statement.expression.callee) ||
      isQunitEqual(statement.expression.callee);
  }

  function rewriteTestFunction(node) {
    // console.log('node', node.type);
    /*
    if (node.type === 'FunctionDeclaration') {
      console.log('function with params', node.params);
    }*/

    if (node.type === 'BlockStatement') {
      node.body.forEach(function (statement) {
        if (statement.type === 'ExpressionStatement' &&
          statement.expression.type === 'CallExpression') {

          if (isOkAssert(statement)) {
            rewriteOkMessage(statement);
          } else if (isEqualAssert(statement)) {
            rewriteEqualMessage(statement);
          }
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
    function shouldSkipHelp(testName) {
      return testName &&
        (/noHelp$/i.test(testName) || /no_help$/.test(testName));
    }

    env.test = QUnit.test = function (a1, a2, a3) {
      var name = a1,
        nAssertions = (typeof a2 === 'number' ? a2 : null),
        fn = (typeof a3 === 'function' ? a3 : a2);
      if (typeof a1 === 'function') {
        fn = a1;
        name = fn.name;
      }
      check.verify.string(name, 'missing test name string');
      check.verify.fn(fn, 'missing test function');

      if (!shouldSkipHelp(fn.name)) {
        var testSource = fn.toString();
        if (!fn.name) {
          testSource = '(' + testSource + ')';
        }
        //check.verify.unemptyString(fn.name,
        //  'for now qunit-helpful needs test function to have a name');
        var output = falafel(testSource, rewriteTestFunction);
        // console.log('rewritten function\n' + output);

        /* jshint -W061 */
        fn = eval('(' + output + ')');
      }
      _test.call(QUnit, name, nAssertions, fn);
    };
  }(env.QUnit));
}(typeof global === 'object' ? global : window));

