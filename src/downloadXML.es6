import * as http from 'http';

export default (url, cb) => {
    let request = http.get(url, (response) => {
        let xml = '';

        response.on('data', (chunk) => {
            xml += chunk;
        });

        response.on('end', () => {
            cb(xml);
        });
    });

    request.on('error', (err) => { // Handle errors
        if (cb) {
            cb(err.message);
        }
    });
};