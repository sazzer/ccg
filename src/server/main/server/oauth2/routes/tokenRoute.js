import {createLogger} from '../../../log';
const LOG = createLogger('oauth2:token');

module.exports = {
    path: '/api/oauth2/token',
    method: 'POST',
    config: {
        tags: ['api', 'oauth2'],
        payload: {
            output: 'data',
            parse: true
        },
        handler: (request, reply) => {
            const grantType = request.payload['grant_type'];
            LOG.debug({requestId: request.id, grantType}, 'Processing Token request');
            
            if (typeof grantType === 'undefined') {
                LOG.warn({requestId: request.id}, 'Request received with no grant type specified');
                reply({
                    error: 'invalid_request'
                }).code(400);
            } else {
                switch (grantType) {
                    case 'authorization_code':
                    case 'password':
                    case 'client_credentials':
                    case 'refresh_token':
                        reply();
                        break;
                    default:
                        LOG.warn({requestId: request.id, grantType}, 'Request received with an unsupported grant type specified');
                        reply({
                            error: 'unsupported_grant_type'
                        }).code(400);
                        break;
                }
            }
        }
    }
};