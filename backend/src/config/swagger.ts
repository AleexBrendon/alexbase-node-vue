import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "AlexBase API",
      version: "1.0.0",
      description:
        "Base API reutilizável com Node.js + Express + Prisma + PostgreSQL",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
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
  },

  apis: ["./src/modules/**/*.ts"],
});