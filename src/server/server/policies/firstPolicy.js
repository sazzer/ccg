function firstPolicy(request, reply, next) {
    request.log(request);
    next(null, true);
}

firstPolicy.applyPoint = 'onPreHandler';

module.exports = firstPolicy;