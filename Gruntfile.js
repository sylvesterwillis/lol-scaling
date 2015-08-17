module.exports = function(grunt) {

    // Load the plugins.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');

    // Project configuration.
    grunt.initConfig({
        clean: ['./static/css/dist', './static/js/dist'],

        eslint: {
            target: ['app/*.jsx']
        },
        less: {
            development: {
                options: {
                    paths: ["./static/css"]
                },
                files: {
                    "./static/css/dist/index.css": "./static/css/*.less"
                }
            },
            production: {
                options: {
                    paths: ["./static/css"]
                },
                files: {
                    "./static/css/dist/index.css": "./static/css/*.less"
                }
            }
        },
        "babel": {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: './app',
                        src: ['./*.jsx'],
                        dest: './static/js/dist',
                        ext: '.js'
                    }
                ]
            }
        },
        browserify: {
            dist: {
                files: {
                  './static/js/dist/index.js': ['./static/js/dist/*.js'],
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        watch: {
            scripts: {
                files: ['./app/*.jsx', './static/css/*.less'],
                tasks: ['clean', 'eslint', 'less:development', 'babel', 'browserify', 'nodemon'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'eslint', 'less:development', 'babel', 'browserify', 'nodemon']);
};
