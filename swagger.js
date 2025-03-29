const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Clients API',
        description: 'API to manage clients and products'
    },
    host: process.env.HOST || 'https://cse341-project2-0dx7.onrender.com',
    schemes: ['https']
    
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);