import path from 'path';

export default {
    server: {
        
    },
    registrations: [
        {
            plugin: 'blipp'
        }, {
            plugin: {
                register: 'hapi-info',
                options: {
                    path: '/debug/info'
                }
            }
        }, {
            plugin: {
                register: 'good',
                options: {
                    reporters: [{
                        reporter: require('good-console'),
                        events: { log: '*', response: '*' }
                    }]
                }
            }
        }, {
            plugin: {
                register: 'hapi-router',
                options: {
                    routes: '**/*Route.js',
                    cwd: path.join(__dirname, 'routes')
                }
            }
        }, {
            plugin: 'hapi-routes-status',
            options: {
                routes: {
                    prefix: '/debug'
                }
            }
        }, {
            plugin: {
                register: 'hapi-swaggered',
                options: {
                    endpoint: '/debug/swagger/docs',
                    info: {
                        title: 'CCG',
                        description: 'CCG',
                        version: '0.0.1'
                    }
                }
            }
        }, {
            plugin: {
                register: 'hapi-swaggered-ui',
                options: {
                    title: 'Swagger UI',
                    path: '/debug/swagger/ui'
                }
            }
        }, {
            plugin: 'hapi-to'
        }, {
            plugin: 'inert'
        }, {
            plugin: 'mrhorse'
        }, {
            plugin: 'vision'
        }
    ]
};