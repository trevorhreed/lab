module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        options: {
          force: true
        },
        src: ['./tmp/*']
      },
    },
    concat: {
      options: {
        process: function (src, path) {
          return '\n\n/* Source: ' + path + ' */\n' + src;
        }
      },
      lib: {
        src: [
          './bower_components/angular/angular.min.js',
          './bower_components/angular-ui-router/release/angular-ui-router.min.js',
          './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ],
        dest: '../gae/www/lib-debug.js'
      },
      lib_css: {
        src: [
          './bower_components/bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: '../gae/www/lib.css'
      },
      js: {
        src: [
          '../src/app.js',
          '../src/**/*.js'
        ],
        dest: './tmp/<%= pkg.name %>-tmp.js'
      },
      scss: {
        src: [
          '../src/app.scss',
          '../src/**/*.scss'
        ],
        dest: './tmp/<%= pkg.name %>.scss'
      }
    },
    ngmin: {
      build: {
        src: './tmp/<%= pkg.name %>-tmp.js',
        dest: '../gae/www/<%=pkg.name %>-debug.js'
      }
    },
    uglify: {
      lib: {
        src: '../gae/www/lib-debug.js',
        dest: '../gae/www/lib.js'
      },
      js: {
        src: '../gae/www/<%= pkg.name %>-debug.js',
        dest: '../gae/www/<%= pkg.name %>.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '../gae/www/<%= pkg.name %>.css': './tmp/<%= pkg.name %>.scss'
        }
      }
    },
    ngtemplates: {
      lab: {
        cwd: '../src',
        src: '**/*.html',
        dest: '../src/templates.js',
        options: {
          url: function (url) {
            url = url.replace('.html', '');
            var i = url.lastIndexOf('/');
            if (i > -1) {
              url = url.substr(i + 1);
            }
            return url;
          },
          module: '<%= pkg.name %>',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        }
      }
    },
    watch: {
      html: {
        files: '../src/**/*.html',
        tasks: ['ngtemplates'],
        options: {
          atBegin: true,
          event: ['all']
        }
      },
      js_concat: {
        files: '../src/**/*.js',
        tasks: ['concat:js'],
        options: {
          atBegin: true,
          event: ['all']
        }
      },
      js_ngmin:{
        files: './tmp/<%= pkg.name %>-tmp.js',
        tasks: ['ngmin'],
        options: {
          atBegin: true,
          event: ['all']
        }
      },
      js_uglify: {
        files: '../gae/www/<%= pkg.name %>-debug.js',
        tasks: ['uglify:js'],
        options: {
          atBegin: true,
          event: ['all']
        }
      },
      scss: {
        files: '../src/**/*.scss',
        tasks: ['concat:scss'],
        options: {
          atBegin: true,
          event: ['all']
        }
      },
      scss_dist: {
        files: './tmp/<%= pkg.name %>.scss',
        tasks: ['sass'],
        options: {
          atBegin: true,
          event: ['all']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['clean', 'watch']);
  grunt.registerTask('build-lib', ['concat:lib_css', 'concat:lib', 'uglify:lib']);

};