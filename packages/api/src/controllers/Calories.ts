import { FastifyReply } from 'fastify';
import { logger } from '../utils/logger';
interface CaloriesRequest {
    data: string[]
}
export class CaloriesController {
    async calculateTopNCalories(input: string[], n = 1) {
        let current = 0;
        const sums: number[] = [];
        input.forEach((x, idx) => {
            if (x === '' || idx === input.length-1) {
                sums.push(current);
                current = 0;
            } else {
                current += Number.parseFloat(x);
            }
        });
        const sorted = sums.sort((a, b) => a - b);
        const max = sorted.slice(n * -1);
        const sum = max.reduce((prev, curr) => prev + curr, 0);
        return { max, sum };
    }
    async get(request: CaloriesRequest, reply: FastifyReply, n = 1) {
        logger.info(`Calculating top ${n} calories`);
        const { max, sum } = await this.calculateTopNCalories(request.data, n);
        logger.info('finished calculating top n calories', { max, sum });
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ max, sum });
    }
}