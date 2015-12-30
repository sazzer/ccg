module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
    
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015-node5']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/server/main',
                    src: ['**/*.js'],
                    dest: 'target/server'
                }]
            }
        },
        clean: ['target'],
        eslint: {
            options: {
                configFile: 'eslintrc'
            }, 
            main: {
                files: [{
                    expand: true,
                    src: ['src/server/main/**/*.js']
                }]
            }
        },
        jest: {
            options: {
                coverage: true,
                verbose: true
            }
        },
        jscpd: {
            options: {
                
            }, 
            main: {
                path: 'src/server/main'
            }
        },
        watch: {
            options: {
                interrupt: true,
                atBegin: true
            },
            test: {
                files: ['src/server/**/*'],
                tasks: ['test']
            }
        }
    });

    grunt.registerTask('build', ['eslint:main', 'jscpd:main', 'babel:main']);
    grunt.registerTask('test', ['build', 'jest']);  
};