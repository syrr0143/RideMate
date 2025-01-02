// import { version } from "../../package.json";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { log } from "console";
import YAML from "yamljs";

const userDocs = YAML.load("./src/docs/user.docs.yaml");
const captainDocs = YAML.load("./src/docs/captain.docs.yaml");

// Swagger options configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ridemate API",
      version: "1.0.0",
      description:
        "This API provides a set of operations for ride booking management, specifically designed for captains and riders. It allows captains to sign up, log in, manage their profiles, confirm rides, and handle OTP-based ride confirmations. The API also includes functionalities for fetching available rides, finishing rides, and managing captain sessions (login/logout). This library is built using Express.js and follows best practices for building scalable and secure RESTful APIs, ensuring seamless interaction between captains and riders during the booking and ride process.",
    },
    paths: {
      ...userDocs.paths,
      ...captainDocs.paths,
    },
    tags: [...userDocs.tags, ...captainDocs.tags],
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
    servers: [
      {
        url: "https://ridemate-2iyz.onrender.com/api/v1", // Replace with your API's base URL
        description: "Production server",
      },
    ],
  },
  apis: ["../src/routes/*.js"], // Path to the API docs, adjust according to your project structure
};

// Initialize Swagger documentation
const swaggerSpec = swaggerJSDoc(options);

function SwaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  log(`Swagger docs are available at http://localhost:${port}/api-docs`);
}

export default SwaggerDocs;
