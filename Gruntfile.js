module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            server: {
                files: ['*.js', 'json/*.json']
            },
            compass: {
                files: ['src/scss/*.scss', 'src/scss/_*.scss'],
                tasks: ['compass']
            },
            react: {
                files:['src/jsx/*.jsx'],
                tasks: ['react', 'browserify']
            },
            templates: {
                files:['src/templates/*.rt'],
                tasks: ['react-templates', 'browserify']
            }
        },
        nodemon: {
            all: {
                script: 'server.js'
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['nodemon', 'watch']
            }
        },
        compass: {
            all: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'public/css',
                }
            }
        },
        reactTemplates: {
            src: ['src/templates/*.rt'],
            modules: 'commonjs'
        },
        react: {
            combined_file_output: {
                files: {
                    'src/js/rt-classes.js': ['src/jsx/*.jsx']
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/templates/*.js'],
                dest: 'public/js/rt-components.js',
            },
        },
        browserify: {
          'public/js/rt.js':['src/js/rt-classes.js']
        }

    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['rt', 'compass']);
    grunt.registerTask('default', ['env:dev', 'build', 'concurrent:dev']);
    grunt.registerTask('production', ['env:prod', 'build', 'concurrent:prod']);
    grunt.registerTask('sub:build', ['build']);
    grunt.registerTask('sub:watch', ['watch:compass']);
    grunt.registerTask('rt', ['react-templates', 'react', 'browserify']);

}
