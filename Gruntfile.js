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
                    cwd: 'src/server',
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
                    src: ['src/server/**/*.js']
                }]
            }
        },
        execute: {
            options: {

            },
            target: {
                src: [
                    'target/server/main.js'
                ]
            }
        },
        jscpd: {
            options: {

            },
            main: {
                path: 'src/server'
            }
        },
        mocha_istanbul: {
            options: {
                reporter: 'spec',
                reportFormats: ['lcov', 'text', 'text-summary'],
                clearRequireCache: true,
                mochaOptions: ['--growl']
            },
            main: {
                root: 'target/server',
                src: [
                    'target/server/**/__tests__/*-test.js'
                ],
                options: {
                    excludes: ['target/server/**/__tests__/*.js'],
                    coverageFolder: 'target/coverage/server'
                }
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
    grunt.registerTask('test', ['build', 'mocha_istanbul']);
    grunt.registerTask('start', ['test', 'execute']);
};
