import { FastifyReply } from "fastify";
import { logger } from "../utils/logger";

interface TuningRequest {
    data: string;
    sequenceCount: number;
}

export class Tuning {
    detect(input: string, target = 4) {
        target -= 1;
        const chars = input.split('');
        let i = 0;
        for (i; i < chars.length - target; i++) {
            const asciiCodes: number[] = [];
            for (let k = i; k <= i + target; k++) {
                asciiCodes.push(chars[k].charCodeAt(0));
            }
            if (asciiCodes.sort((x, y) => x - y).filter((v, i, self) => self.indexOf(v) === i).length === (target+1)) {
                break;
            }
        }
        return i + target;
    }
    async post(request: TuningRequest, reply: FastifyReply) {
        logger.info('Tuning', { data: request.data, sequenceCount: request.sequenceCount });
        const packetMarker = this.detect(request.data, request.sequenceCount) + 1;
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ packetMarker });
    }
}