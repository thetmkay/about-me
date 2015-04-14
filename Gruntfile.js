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
                files: ['src/scss/*.scss'],
                tasks: ['compass']
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
            src: ['src/templates/*.rt']
        },
        react: {
            combined_file_output: {
                files: {
                    'public/js/rt-classes.js': ['src/jsx/*.js']
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

    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-react-templates');
    grunt.loadNpmTasks('grunt-react');


    grunt.registerTask('build', ['rt', 'compass']);
    grunt.registerTask('default', ['env:dev', 'build', 'concurrent:dev']);
    grunt.registerTask('production', ['env:prod', 'build', 'concurrent:prod']);
    grunt.registerTask('sub:build', ['build']);
    grunt.registerTask('sub:watch', ['watch:compass']);
    grunt.registerTask('rt', ['react-templates','concat', 'react']);

}
