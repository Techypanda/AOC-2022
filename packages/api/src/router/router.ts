import { FastifyInstance } from "fastify";
import { CaloriesController } from "../controllers/Calories";

export function initializeRoutes(r: FastifyInstance) {
    r.get('/', async (_, reply) => {
        reply.code(200).header('Content-Type', 'text/plain; charset=utf-8').send('heartbeat');
    });
    r.post('/1', async (request, reply) => {
        const data = await request.file();
        if (data) {
            const buffer = await data.toBuffer();
            new CaloriesController().get({ data: buffer.toString().split('\n') }, reply);
        } else {
            reply
                .status(401)
                .send({ error: 'file is missing' });
        }
    });
    r.post('/1/:n', async (request, reply) => {
        const data = await request.file();
        const { n } = request.params as { n: string };
        const inputN = Number.parseInt(n);
        if (data && !isNaN(inputN)) {
            const buffer = await data.toBuffer();
            new CaloriesController().get({ data: buffer.toString().split('\n') }, reply, inputN);
        } else {
            reply
                .status(401)
                .send({ error: 'file is missing' });
        }
    })
}