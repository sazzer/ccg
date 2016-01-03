import Bunyan from 'bunyan';

const rootLogger = Bunyan.createLogger({
    name: 'ccg',
    level: 'debug'
});

/**
 * Create a logger for the given component name
 * @param {String} name The name of the component
 * @return {Bunyan} The bunyan logger to use
 */
export function createLogger(name) {
    return rootLogger.child({component: name});
}