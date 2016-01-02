import Boom from 'boom';

module.exports = {
    path: '/api/first',
    method: 'GET',
    config: {
        plugins: {
            policies: ['firstPolicy']
        },
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
};