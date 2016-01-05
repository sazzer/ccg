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
    try {
        const req = request.raw.req;
        const authorization = req.headers.authorization;
        if (!authorization) {
            // No Authorization header
            throw Boom.unauthorized('No authentication provided');
        }

        const parts = authorization.split(/\s+/);
        if (parts[0].toLowerCase() !== 'basic') {
            // Authorization header is present but isn't for Basic auth
            throw Boom.unauthorized('Unsupported authentication scheme');
        }

        if (parts.length !== 2) {
            // Authorization header either has no or badly encoded credentials
            throw Boom.badRequest('Bad HTTP authentication header format');
        }

        const credentials = new Buffer(parts[1], 'base64').toString();
        const sep = credentials.indexOf(':');
        if (sep === -1) {
            // Decoded credentials are malformed
            throw Boom.badRequest('Bad header internal syntax');
        }

        const username = credentials.slice(0, sep);
        const password = credentials.slice(sep + 1);

        if (username === '') {
            // No username was present
            throw Boom.unauthorized('No Client ID provided');
        }

        if (password === '') {
            // No password was present
            throw Boom.unauthorized('No Client Password provided');
        }

        return reply.continue({
            credentials: {
                username,
                password
            }
        });
    } catch (e) {
        if (e.isBoom) {
            e.output.payload = {
                error: 'invalid_client',
                error_description: e.message
            }
            if (e.output.statusCode === 401) {
                e.isMissing = true;
            }
        }
        return reply(e);
    }
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
