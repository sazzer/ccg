import {createLogger} from '../log';
const LOG = createLogger('basicAuthSetup');

function validate(request, username, password, callback) {
    callback(null, username === password, {id: 1, name: username});
}

export function register(server, options, next) {
    LOG.debug('Setting up Basic Auth Setup plugin');
    server.auth.strategy('oauth2:client', 'oauth2:client', {
        validateFunc: validate
    });
    
    next();
}

register.attributes = {
    name: 'basicAuthSetup',
    version: '0.0.1'
}
