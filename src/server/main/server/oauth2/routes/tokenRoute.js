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
            LOG.debug({grantType}, 'Processing Token request');
            reply();
        }
    }
};