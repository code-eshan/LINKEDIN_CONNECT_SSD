var request = require('request');

function main(authCode, done) {
}

exports.handler = (event, context, callback) => {
    if (event) {
        switch (event.httpMethod) {
            case 'GET':
                if (event && event.queryStringParameters && event.queryStringParameters.code && event.queryStringParameters.state) {
                    var state = decodeURIComponent(event.queryStringParameters.state);
                    var code = decodeURIComponent(event.queryStringParameters.code);
                    main(code, done);
                } else {
                    console.log("ERROR:  Malformed query parameters. Expected code and state.");
                    done(new Error('<h1>Something went wrong. Please go back and use the email signup instead.</h1>'));
                }
                break;
        }
    }
}
