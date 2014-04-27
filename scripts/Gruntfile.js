module.exports = function(grunt) {
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
                process: function(src, path) {
                    return '\n/* Source: ' + path + ' */\n' + src;
                }
            },
            js: {
                src: [
                  './bower_components/angular/angular.min.js',
                  '../src/app.js',
                  '../src/**/*.js'
                ],
                dest: '../gae/www/<%= pkg.name %>-debug.js'
            },
            scss: {
                src: [
                    '../src/app.scss',
                    '../src/**/*.scss'
                ],
                dest: './tmp/<%= pkg.name %>.scss'
            }
        },
        uglify: {
            build: {
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
            '<%= pkg.name %>': {
                cwd: '../src',
                src: '**/*.html',
                dest: '../src/templates.js',
                options: {
                    url: function(url) {
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
                tasks: ['clean','ngtemplates'],
                options: {
                    atBegin: true,
                    event: ['all']
                }
            },
            js: {
                files: '../src/**/*.js',
                tasks: ['clean','concat:js','uglify'],
                options: {
                    atBegin: true,
                    event: ['all']
                }
            },
            js_dist: {
                files: '../gae/www/<%= pkg.name %>-debug.js',
                tasks: ['clean','uglify'],
                options: {
                    atBegin: true,
                    event: ['all']
                }
            },
            scss: {
                files: '../src/**/*.scss',
                tasks: ['clean', 'concat:scss', 'sass'],
                options: {
                    atBegin: true,
                    event: ['all']
                }
            },
            scss_dist: {
                files: './tmp/<%= pkg.name %>.scss',
                tasks: ['clean','sass'],
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

};
