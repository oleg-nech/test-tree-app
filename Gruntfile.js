module.exports = function(grunt){
    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [ 'app/css', 'app/fonts', 'app/js' ]
            }
        },

        copy: {
            build: {
                files: [
                    {
                        cwd: 'bower_components/',
                        src: [
                            'open-sans-fontface/open-sans.css',
                            'font-awesome/css/font-awesome.min.css',
                            'bootstrap/dist/css/bootstrap.min.css'
                        ],
                        dest: 'app/css/',
                        expand: true,
                        flatten: true
                    },
                    {
                        cwd: 'bower_components/font-awesome/fonts/',
                        src: ['*'],
                        dest: 'app/fonts/',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/open-sans-fontface/fonts/',
                        src: ['**/*'],
                        dest: 'app/fonts/',
                        expand: true
                    }
                ]
            }
        },

        concat: {
            lib: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/underscore/underscore.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/backbone.marionette/lib/backbone.marionette.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'app/js/lib.js'
            }
        },

        browserify: {
            dist: {
                options: {
                    paths: ['./node_modules','./assets/src'],
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "app/js/app.js": "assets/src/main.js"
                }
            }
        },

        less: {
            build: {
                options: {
                    paths: ['assets/less']
                },
                files: {
                    "app/css/main.css": "assets/less/main.less"
                }
            }
        },

        watch: {
            browserify: {
                files: ['assets/src/**/*.js'],
                tasks: ['browserify']
            },
            less: {
                files: ['assets/less/**/*.less'],
                tasks: ['less']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'app/js/*.js',
                        'app/css/*.css',
                        'app/*.html'
                    ]
                },
                options: {
                    port: 5006,
                    watchTask: true,
                    proxy: "localhost:5005",
                    reloadDelay: 1000
                }
            }
        },

        express: {
            dev: {
                options: {
                    script: 'server/app.js'
                }
            }
        }
    });

    grunt.registerTask('build',  [
        'clean',
        'copy',
        'concat:lib',
        'browserify',
        'less'
    ]);

    grunt.registerTask('default', [
        'build',
        'express:dev',
        'browserSync',
        'watch'
    ]);
};
