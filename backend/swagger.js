const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
 
// set swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'SA API', // API's title
            version: '1.0.0', // API's version
            description: 'Learning to build Rest API using NodeJS',
        },
        servers: [ // Add server details
            { url: 'http://localhost:3000',
              description: "My API through HTTP"  
            }, // server URL
            { url: 'https://localhost:443',
            description: "My API through HTTPS"  
          }, // server URL
        ]
    },
    apis: ['./routes/*.js'], // Path to all API definitions
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
 
module.exports = { swaggerSpecs, swaggerUI };