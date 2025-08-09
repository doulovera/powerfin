import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const fastify: FastifyInstance = Fastify({
	logger: true,
});

await fastify.register(cors, {
  origin: '*',
})

await fastify.register(swagger, {
  openapi: {
    info: {
      title: "Powerfin API",
      description: "API documentation for Powerfin",
      version: "0.0.1",
    },
  },
});

await fastify.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  staticCSP: true,
  logLevel: "warn",
});

fastify.get("/", (request, reply) => {
	reply.send("Hello World");
});

fastify.listen({ port: 3000 }, (err, address) => {
	fastify.log.info(`server listening on ${address}`);
	fastify.log.info(`Swagger UI available at ${address}/docs`);

	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
