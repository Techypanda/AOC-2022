import { MultipartFile } from "@fastify/multipart";
import { FastifyInstance } from "fastify";
import { CaloriesController } from "../controllers/Calories";
import { Jajanken } from "../controllers/Jajanken";

export function initializeRoutes(r: FastifyInstance) {
    r.get('/', async (_, reply) => {
        reply.code(200).header('Content-Type', 'text/plain; charset=utf-8').send('heartbeat');
    });
    r.post('/1', async (request, reply) => {
        const body = await request.body as { data: MultipartFile };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new CaloriesController().get({ data: buffer.toString().split('\n') }, reply);
        } else {
            reply
                .status(401)
                .send({ error: 'file is missing' });
        }
    });
    r.post('/1/:n', async (request, reply) => {
        const body = await request.body as { data: MultipartFile };
        const { n } = request.params as { n: string };
        const inputN = Number.parseInt(n);
        if (body.data && !isNaN(inputN)) {
            const buffer = await body.data.toBuffer();
            new CaloriesController().get({ data: buffer.toString().split('\n') }, reply, inputN);
        } else {
            reply
                .status(401)
                .send({ error: 'file is missing' });
        }
    });
    r.post('/2', async (request, reply) => {
        const body = await request.body as { data: MultipartFile, v2: boolean };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new Jajanken().post({ data: buffer.toString().split('\n'), v2: body.v2 || false }, reply);
        } else {
            reply
                .status(401)
                .send({ error: 'file is missing' });
        }
    })
}