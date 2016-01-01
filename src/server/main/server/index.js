import Glue from 'glue';
import ServerManifest from './manifest';

/**
 * Actually create the Web Server to use
 * @param {Number} port The port to listen on
 * @return {Promise} A promise for the server
 */
export function createServer(port) {
    return new Promise((resolve, reject) => {
        ServerManifest.connections = [
            {
                port
            }
        ];
        
        Glue.compose(ServerManifest, {}, (err, server) => {
            if (err) {
                reject(err);
            } else {
                resolve(server);
            }
        });
    });
}