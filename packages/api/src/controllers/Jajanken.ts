import { FastifyReply } from "fastify";
import { logger } from "../utils/logger";

// https://japaneseanime.fandom.com/wiki/Gon_Freecss#Jajanken_Scissors
enum JajankenMoves {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}
type JajankenScore = Record<JajankenMoves, number>;
type ScoreJajanken = Record<number, JajankenMoves>; // flipped
type JajankenInputs = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
const RockScore: JajankenScore = {
    [JajankenMoves.Rock]: 3,
    [JajankenMoves.Paper]: 0,
    [JajankenMoves.Scissors]: 6
}
const ScoreRock = Object.fromEntries(Object.entries(RockScore).map(([key, value]) => [value, key])) as unknown as ScoreJajanken;
const ScissorsScore: JajankenScore = {
    [JajankenMoves.Rock]: 0,
    [JajankenMoves.Paper]: 6,
    [JajankenMoves.Scissors]: 3
}
const ScoreScissors = Object.fromEntries(Object.entries(ScissorsScore).map(([key, value]) => [value, key])) as unknown as ScoreJajanken;
const PaperScore: JajankenScore = {
    [JajankenMoves.Rock]: 6,
    [JajankenMoves.Paper]: 3,
    [JajankenMoves.Scissors]: 0
}
const ScorePaper = Object.fromEntries(Object.entries(PaperScore).map(([key, value]) => [value, key])) as unknown as ScoreJajanken;
const Score: Record<JajankenMoves, JajankenScore> = {
    [JajankenMoves.Rock]: RockScore,
    [JajankenMoves.Paper]: PaperScore,
    [JajankenMoves.Scissors]: ScissorsScore
}
const ScoreOpposite: Record<JajankenMoves, ScoreJajanken> = {
    [JajankenMoves.Rock]: ScoreRock,
    [JajankenMoves.Paper]: ScorePaper,
    [JajankenMoves.Scissors]: ScoreScissors
}
const StrategyGuide: Record<JajankenInputs, JajankenMoves> = {
    A: JajankenMoves.Rock,
    B: JajankenMoves.Paper,
    C: JajankenMoves.Scissors,
    X: JajankenMoves.Rock,
    Y: JajankenMoves.Paper,
    Z: JajankenMoves.Scissors
}
const StategyGuideV2: Record<'X' | 'Y' | 'Z', number> = {
    X: 0,
    Y: 3,
    Z: 6
}
interface JanjankenGameResponse {
    scores: number[];
    sum: number;
}
interface JanjankenRequest {
    data: string[];
    v2: boolean;
}
export class Jajanken {
    playRound(opposition: JajankenInputs, player: JajankenInputs, v2 = false) {
        if (v2) {
            const chosenByOpponent = StrategyGuide[opposition];
            const pointsNeeded = 6 - StategyGuideV2[player as 'X' | 'Y' | 'Z'];
            const scoreValue = ScoreOpposite[chosenByOpponent][pointsNeeded];
            const score = Number.parseInt(StategyGuideV2[player as 'X' | 'Y' | 'Z']  as unknown as string) + Number.parseInt(scoreValue as unknown as string); // typescript madness happened
            return score;
        }
        return Score[StrategyGuide[player]][StrategyGuide[opposition]] + StrategyGuide[player];
    }
    async runGame(input: string[], v2 = false): Promise<JanjankenGameResponse> {
        const scores: number[] = [];
        let sum = 0;
        input.forEach((line) => {
            const plays = line.split(' ') as JajankenInputs[];
            if (plays.length === 2) {
                const round = this.playRound(plays[0], plays[1], v2);
                scores.push(round);
                sum += round;
            }
        });
        return { scores, sum };
    }
    async post(request: JanjankenRequest, reply: FastifyReply) {
        logger.info('Calculating jajanken game');
        const { scores, sum } = await this.runGame(request.data, request.v2);
        logger.info('finished jajanken game', { scores, sum });
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ scores, sum });
    }
}