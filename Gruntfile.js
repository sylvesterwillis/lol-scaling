module.exports = function(grunt) {

    // Load the plugins.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-reactify');

    // Project configuration.
    grunt.initConfig({
        eslint: {
            target: ['app/*.jsx']
        },
        reactify: {
            './static/js': './app/*.jsx'
        },
        // react: {
        //     combined_file_output: {
        //         files: {
        //             './static/js/dist/index.js': [
        //                 './app/championList.js'
        //             ]
        //         }
        //     },
        //     dynamic_mappings: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: './static/js/frontend',
        //                 src: ['**/*.jsx'],
        //                 dest: './static/js/dist/dest',
        //                 ext: '.js'
        //             }
        //         ]
        //     }
        // },
        watch: {
            scripts: {
                files: ['./app/*.jsx'],
                tasks: ['eslint', 'react'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'reactify']);
};
