import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "AlexBase API",
      version: "1.0.0",
      description: "Documentação da API AlexBase",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/modules/**/routes/*.ts"
  ],
});