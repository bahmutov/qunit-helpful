/*global module:false*/
module.exports = function (grunt) {
  module.require('time-grunt')(grunt);

  grunt.initConfig({

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'description', 'homepage', 'license']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-summary')
      },
      default: {
        'src': [ '*.js', '!*-browser.js', 'test/*.js' ]
      }
    },

    complexity: grunt.file.readJSON('configs/complexity.json'),

    browserify: {
      all: {
        src: 'qunit-helpful.js',
        dest: 'qunit-helpful-browser.js'
      }
    },

    qunit: {
      all: ['index.html'],
      inject: ['index-with-inject.html']
    },

    'node-qunit': {
      all: {
        deps: './qunit-helpful.js',
        code: './test/tests.js',
        tests: [
          './test/tests.js',
          './test/tests-ok.js',
          './test/tests-qunit-ok.js',
          './test/tests-equal.js',
          './test/tests-qunit-equal.js',
          './test/tests-closures.js'
        ]
      },
      pureInject: {
        deps: './node_modules/qunit-inject/qunit-inject.js',
        code: './node_modules/qunit-inject/qunit-inject.js',
        tests: [
          './test/tests-with-inject.js'
        ]
      },
      inject: {
        deps: './node_modules/qunit-inject/qunit-inject.js',
        code: './qunit-helpful.js',
        tests: [
          './test/tests-with-inject.js'
        ]
      }
    },

    parallel: {
      test: {
        options: {
          grunt: true
        },
        tasks: ['qunit', 'node-qunit']
      }
    },

    watch: {
      options: {
        atBegin: true
      },
      all: {
        files: ['*.js', 'test/*.js', 'index.html'],
        tasks: ['jshint', 'browserify', 'parallel']
      }
    },

    'gh-pages': {
      options: {
        base: '.'
      },
      src: [
        'index.html',
        'index-with-inject.html',
        'README.md',
        'qunit-helpful-browser.js',
        'test/*.js',
        'node_modules/qunit-inject/qunit-inject-browser.js'
      ]
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['parallel:test']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'sync',
    'jshint', 'complexity', 'browserify', 'test']);
};
