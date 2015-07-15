module.exports = function(grunt) {

	require('load-grunt-subtasks')(grunt,{
		base:['./..','./node_modules']	
	});

	
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
        react: {
            combined_file_output: {
                files: {
                    'src/js/rt-classes.js': ['src/jsx/*.jsx']
                }
            }
        },
        browserify: {
          'public/js/rt.js':['src/js/rt-classes.js']
        }
    });


    grunt.registerTask('build', ['rt', 'compass']);
    grunt.registerTask('default', ['env:dev', 'build', 'concurrent:dev']);
    grunt.registerTask('production', ['env:prod', 'build', 'concurrent:prod']);
    grunt.registerTask('sub:build', ['build']);
    grunt.registerTask('sub:watch', ['watch:compass']);
    grunt.registerTask('rt', ['react', 'browserify']);

}
