import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";

const fastify: FastifyInstance = Fastify({
	logger: true,
});

await fastify.register(cors, {
  origin: '*',
})

fastify.get("/", (request, reply) => {
	reply.send("Hello World");
});

fastify.listen({ port: 3000 }, (err, address) => {
	fastify.log.info(`server listening on ${address}`);
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
