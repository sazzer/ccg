import Boom from 'boom';

module.exports = [
    {
        path: '/api/first',
        method: 'GET',
        config: {
            tags: ['api'],
            handler: (request, reply) => {
                const url = request.to('secondRoute', {
                    query: {
                        message: 'Oops'
                    }
                });
                reply({
                    hello: 'World',
                    next: url
                });
            }
        }
    }, {
        path: '/api/second',
        method: 'GET',
        config: {
            id: 'secondRoute',
            tags: ['api'],
            handler: (request, reply) => {
                reply(Boom.notFound('second'));
            }
        }
    }
];