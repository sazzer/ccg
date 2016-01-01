import {createServer} from './server';

createServer(3000).then((server) => {
    console.log('Created server');
    server.start(() => {
        console.log('Server Started: ' + server.info.uri);
    });
}, (err) => {
    console.log('Error creating server: ' + err);
})