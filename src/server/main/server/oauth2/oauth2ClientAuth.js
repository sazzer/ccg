import Bunyan from 'bunyan';
import Boom from 'boom';

const LOG = Bunyan.createLogger({name: 'oauth2ClientAuth'});

/**
 * Attempt to authenticate a request
 * @param {Request} request The request
 * @param {Reply} reply The mechanism to indicate authentication success or failure
 * @return {Any} the result of the authentication
 */
function authenticate(request, reply) {
    const req = request.raw.req;
    const authorization = req.headers.authorization;
    if (!authorization) {
        // No Authorization header
        return reply({'error': 'Oops'}, null, 'Basic')
            .code(401);
        return reply(Boom.unauthorized(null, 'Basic'));
    }
    
    const parts = authorization.split(/\s+/);
    if (parts[0].toLowerCase() !== 'basic') {
        // Authorization header is present but isn't for Basic auth
        return reply(Boom.unauthorized('Unsupported authentication scheme', 'Basic'));
    }
    
    if (parts.length !== 2) {
        // Authorization header either has no or badly encoded credentials
        return reply(Boom.badRequest('Bad HTTP authentication header format', 'Basic'));
    }
    
    const credentials = new Buffer(parts[1], 'base64').toString();
    const sep = credentials.indexOf(':');
    if (sep === -1) {
        // Decoded credentials are malformed
        return reply(Boom.badRequest('Bad header internal syntax', 'Basic'));
    }
    
    const username = credentials.slice(0, sep);
    const password = credentials.slice(sep + 1);
    
    if (username === '') {
        // No username was present
        return reply(Boom.unauthorized('No username provided', 'Basic'));
    }
    
    if (password === '') {
        // No password was present
        return reply(Boom.unauthorized('No password provided', 'Basic'));
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