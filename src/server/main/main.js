import 'source-map-support/register';
import {createServer} from './server';
import Bunyan from 'bunyan';

const LOG = Bunyan.createLogger({name: 'server'});

createServer(3000).then((server) => {
    console.log('Created server');
    server.start(() => {
        LOG.info({uri: server.info.uri}, 'Server Started');
    });
}, (err) => {
    LOG.error({error: err}, 'Error creating server');
})