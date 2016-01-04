import Boom from 'boom';
import {createLogger} from '../../log';
const LOG = createLogger('oauth2:clientAuth');

/**
 * Attempt to authenticate a request. Much of this was taken from the hapi-basic-auth module, but then tweaked to give
 * better error responses to OAuth2 clients.
 * @param {Request} request The request
 * @param {Reply} reply The mechanism to indicate authentication success or failure
 * @return {Any} the result of the authentication
 */
function authenticate(request, reply) {
    const req = request.raw.req;
    const authorization = req.headers.authorization;
    if (!authorization) {
        // No Authorization header
        const error = Boom.unauthorized(null, 'Basic');
        error.output.payload = {error: 'invalid_client', error_description: 'No authentication provided'};
        return reply(error);
    }
    
    const parts = authorization.split(/\s+/);
    if (parts[0].toLowerCase() !== 'basic') {
        // Authorization header is present but isn't for Basic auth
        return reply({error: 'invalid_client', error_description: 'Unsupported authentication scheme'})
            .code(401);
    }
    
    if (parts.length !== 2) {
        // Authorization header either has no or badly encoded credentials
        return reply({error: 'invalid_client', error_description: 'Bad HTTP authentication header format'})
            .code(400);
    }
    
    const credentials = new Buffer(parts[1], 'base64').toString();
    const sep = credentials.indexOf(':');
    if (sep === -1) {
        // Decoded credentials are malformed
        return reply({error: 'invalid_client', error_description: 'Bad header internal syntax'})
            .code(400);
    }
    
    const username = credentials.slice(0, sep);
    const password = credentials.slice(sep + 1);
    
    if (username === '') {
        // No username was present
        return reply({error: 'invalid_client', error_description: 'No Client ID provided'})
            .code(401);
    }
    
    if (password === '') {
        // No password was present
        return reply({error: 'invalid_client', error_description: 'No Client Password provided'})
            .code(401);
    }
    
    return reply.continue({
        credentials: {
            username,
            password
        }
    });
}

/**
 * The actual OAuth2 Client Authentication scheme
 * @param {Server} server The server
 * @param {Object} options The Authentication scheme options
 * @return {Object} the authentication scheme configuration
 */
function oauth2ClientAuth(server, options) {
    return {
        authenticate
    };
}

/**
 * Hapi Plugin Registration.
 * This registers the OAuth2 Client Authentication scheme with the Hapi Server
 * @param {Server} server The Server to register the authentication scheme with
 * @param {Object} options The options for the plugin. Unused
 * @param {Function} next The callback when registration is finished
 */
export function register(server, options, next) {
    LOG.debug('Setting up OAuth2 Client Authentication Scheme');
    
    server.auth.scheme('oauth2:client', oauth2ClientAuth);
    next();
}

register.attributes = {
    name: 'oauth2ClientAuth',
    version: '0.0.1'
}
