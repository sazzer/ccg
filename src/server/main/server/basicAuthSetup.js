import Bunyan from 'bunyan';

const LOG = Bunyan.createLogger({name: 'basicAuthSetup'});

function validate(request, username, password, callback) {
    callback(null, username === password, {id: 1, name: username});
}

export function register(server, options, next) {
    LOG.info('Setting up Basic Auth Setup plugin');
    server.auth.strategy('simple', 'basic', {
        validateFunc: validate
    });
    
    next();
}

register.attributes = {
    name: 'basicAuthSetup',
    version: '0.0.1'
}