// swagger.ts

import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation for My Application',
    },
    servers: [
      {
        url: process.env.SWAGGER_URL, // Update with your server URL
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', // Path to the API docs
    "./src/constants/schema/**/*.ts", // Include schema files
  ],
};

export default swaggerOptions;
