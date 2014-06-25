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

    jshint: grunt.file.readJSON('configs/jshint.json'),

    complexity: grunt.file.readJSON('configs/complexity.json'),

    browserify: {
      all: {
        src: 'qunit-helpful.js',
        dest: 'qunit-helpful-browser.js'
      }
    },

    qunit: {
      all: ['index.html']
    },

    'node-qunit': {
      all: {
        deps: './qunit-helpful.js',
        code: './test/tests.js',
        tests: ['./test/tests.js']
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
        'README.md',
        'qunit-helpful-browser.js',
        'test/*.js'
      ]
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['parallel:test']);
  grunt.registerTask('default', ['deps-ok', 'nice-package', 'sync',
    'jshint', 'complexity', 'browserify', 'test']);
};
