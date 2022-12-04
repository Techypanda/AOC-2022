import { FastifyReply } from "fastify";
import { logger } from "../utils/logger";

// map abuse again i guess
type MinMaxPair = [number, number]; // Min, Max
export enum OverlapStatus {
    OverlapsEntirely,
    Overlaps,
    DoesNot
}
export interface CleaningResponse {
    overlapStatuses: OverlapStatus[];
    sum: number;
}
interface CleaningRequest {
    data: string[];
    v2: boolean;
}
export class Cleaning {
    parseLine(line: string): [MinMaxPair, MinMaxPair] {
        const pairs = line.split(',');
        const resp = pairs.map((pair) => pair.split('-').map((str) => Number.parseInt(str)));
        return resp as unknown as [MinMaxPair, MinMaxPair];
    }
    overlaps(p1: MinMaxPair, p2: MinMaxPair): OverlapStatus {
        if (p1.length < 2 || p2.length < 2) return OverlapStatus.DoesNot;
        // Ternary Hell
        const OE_CASE_1 = p1[0] >= p2[0] && p1[1] <= p2[1];
        const OE_CASE_2 = p2[0] >= p1[0] && p2[1] <= p1[1];
        // 0, 3, 3, 4 : 0 <= 3 && 3 >= 3 i.e slightly behind
        const O_CASE_1 = p1[0] < p2[0] && p1[1] >= p2[0];
        const O_CASE_2 = p2[0] < p1[0] && p2[1] >= p1[0];
        // 3, 6, 0, 3 : 3 <= 3 && 6 >= 3 i.e slightly ahead
        const O_CASE_3 = p1[0] <= p2[1] && p1[1] >= p2[1];
        const O_CASE_4 = p2[0] <= p1[1] && p2[1] >= p1[1];
        return OE_CASE_1 ? OverlapStatus.OverlapsEntirely // Case 1: P1 INSIDE P2
            : OE_CASE_2 ? OverlapStatus.OverlapsEntirely // Case 2: P2 INSIDE P1
            : O_CASE_1 ? OverlapStatus.Overlaps // Case 3: P1 Overlaps from MIN but goes past p2
            : O_CASE_2 ? OverlapStatus.Overlaps // Case 4: P2 overlaps from MIN but goes past p2
            : O_CASE_3 ? OverlapStatus.Overlaps // Case 5: P1 Overlaps but MIn slightly less, however max is in bounds
            : O_CASE_4 ? OverlapStatus.Overlaps // Case 6: P2 Overlaps but MIn slightly less, however max is in bounds
            : OverlapStatus.DoesNot;
    }
    parseInput(lines: string[], conditionToWatch: OverlapStatus = OverlapStatus.OverlapsEntirely): CleaningResponse {
        let sum = 0;
        const overlapStatuses = lines.map((x) => {
            const parsedLine = this.parseLine(x);
            const overLapStatus = this.overlaps(parsedLine[0], parsedLine[1]);
            sum += overLapStatus === conditionToWatch || overLapStatus === OverlapStatus.OverlapsEntirely ? 1 : 0; // faster then doing another iteration over output array to calculate this
            return overLapStatus;
        });
        return { overlapStatuses, sum };
    }
    async post(request: CleaningRequest, reply: FastifyReply) {
        logger.info('Calculating cleaning overlaps');
        const resp = this.parseInput(request.data, request.v2 ? OverlapStatus.Overlaps : OverlapStatus.OverlapsEntirely);
        logger.info('calculated cleaning overlaps', resp);
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(resp);
    }
}