import Bunyan from 'bunyan';
import path from 'path';
import GooderBunyan from 'gooder-bunyan';

const LOG = Bunyan.createLogger({name: 'access'});

const HapiLogger = {
    trace: LOG.trace.bind(LOG),
    debug: LOG.debug.bind(LOG),
    info: LOG.info.bind(LOG),
    warn: LOG.warn.bind(LOG),
    error: LOG.error.bind(LOG),
    fatal: LOG.fatal.bind(LOG)
};

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
                    reporters: [
                        new GooderBunyan({
                            response: '*'
                        }, HapiLogger)
                    ]
                }
            }
        }, {
            plugin: 'hapi-auth-basic'
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
            plugin: {
                register: 'mrhorse',
                options: {
                    policyDirectory: path.join(__dirname, 'policies')
                }
            }
        }, {
            plugin: 'vision'
        }, {
            plugin: './basicAuthSetup'
        }, {
            plugin: {
                register: 'hapi-router',
                options: {
                    routes: '**/*Route.js',
                    cwd: path.join(__dirname, 'routes')
                }
            }
        }
    ]
};