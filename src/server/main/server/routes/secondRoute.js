import Boom from 'boom';

module.exports = {
    path: '/api/second',
    method: 'GET',
    config: {
        id: 'secondRoute',
        tags: ['api'],
        handler: (request, reply) => {
            reply(Boom.notFound('second'));
        }
    }
};