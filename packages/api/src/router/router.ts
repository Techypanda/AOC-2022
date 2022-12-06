import { MultipartFile } from "@fastify/multipart";
import { FastifyInstance } from "fastify";
import { CaloriesController } from "../controllers/Calories";
import { Cleaning } from "../controllers/Cleaning";
import { Jajanken } from "../controllers/Jajanken";
import { Rucksack } from "../controllers/Rucksack";
import { Stacker } from "../controllers/Stacker";
import { Tuning } from "../controllers/Tuning";
import { logger } from "../utils/logger";

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
                .status(400)
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
                .status(400)
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
                .status(400)
                .send({ error: 'file is missing' });
        }
    });
    r.post('/3', async (request, reply) => {
        const body = await request.body as { data: MultipartFile, v2: boolean };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new Rucksack().post({ data: buffer.toString().split('\n'), v2: body.v2 || false }, reply);
        } else {
            reply.status(400).send({ error: 'file is missing' });
        }
    });
    r.post('/4', async (request, reply) => {
        const body = await request.body as { data: MultipartFile, v2: boolean };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new Cleaning().post({ data: buffer.toString().split('\n'), v2: body.v2 || false }, reply);
        } else {
            reply.status(400).send({ error: 'file is missing' });
        }
    });
    r.post('/5', async (request, reply) => {
        const body = await request.body as { data: MultipartFile, v2: boolean };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new Stacker().post({ data: buffer.toString().split('\n'), v2: body.v2 || false }, reply);
        } else {
            reply.status(400).send({ error: 'file is missing' });
        }
    });
    r.post('/6', async (request, reply) => {
        const body = await request.body as { data: MultipartFile };
        if (body.data) {
            const buffer = await body.data.toBuffer();
            new Tuning().post({ data: buffer.toString(), sequenceCount: 4 }, reply);
        } else {
            reply
                .status(400)
                .send({ error: 'file is missing' });
        }
    });
    r.post('/6/:n', async (request, reply) => {
        const body = await request.body as { data: MultipartFile };
        const { n } = request.params as { n: string };
        const inputN = Number.parseInt(n);
        if (body.data && !isNaN(inputN)) {
            const buffer = await body.data.toBuffer();
            new Tuning().post({ data: buffer.toString(), sequenceCount: inputN }, reply);
        } else {
            reply.status(400).send({ error: 'file is missing' });
        }
    });
}