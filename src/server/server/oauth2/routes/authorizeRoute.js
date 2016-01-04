module.exports = {
    path: '/api/oauth2/authorize',
    method: 'GET',
    config: {
        tags: ['api', 'oauth2'],
        auth: {
            strategy: 'oauth2:client',
            mode: 'optional'
        },
        handler: (request, reply) => {
            reply(request.auth);
        }
    }
};
