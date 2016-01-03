module.exports = {
    path: '/api/oauth2/authorize',
    method: 'GET',
    config: {
        tags: ['api', 'oauth2'],
        handler: (request, reply) => {
            reply();
        }
    }
};