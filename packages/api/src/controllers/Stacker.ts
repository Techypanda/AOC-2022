import { FastifyReply } from "fastify";
import { logger } from "../utils/logger"

export class SupplyStack {
    constructor(private m: Record<number, string[]> = {}) { }
    add(val: string, position: number) {
        if (this.m[position]) {
            this.m[position].unshift(val);
        } else {
            this.m[position] = [val];
        }
    }
    constructWithLength(len: number) {
        for (let i = 1; i <= len; i++) {
            if (!this.m[i]) {
                this.m[i] = [];
            }
        }
    }
    move(from: number, to: number, amount = 1) {
        const toMove: string[] = [];
        for (let i = 0; i < amount; i++) {
            toMove.unshift(this.m[from].pop() as string);
        }
        this.m[to] = [...this.m[to], ...toMove];
    }
    top(n: number) { return this.m[n][this.m[n].length - 1] }
    get length() { return Object.keys(this.m).length }
}
export interface MoveOperation {
    amount: number;
    from: number;
    to: number;
}

interface StackRequest {
    data: string[];
    v2: boolean;
}

export class Stacker {
    parse(input: string[]) {
        const stack = new SupplyStack();
        let size = -1;
        let instructionsStart = -1;
        for (let i = 0; i < input.length; i++) {
            const line = input[i];
            const row = line.split('');
            let idx = 1;
            let curr = 1;
            while (curr < line.length) {
                if (row[curr] != ' ' && isNaN(Number.parseInt(row[curr]))) {
                    stack.add(row[curr], idx);
                }
                curr += 4;
                idx += 1;
            }
            size = Math.max(size, idx - 1);
            if (line.length < 2) {
                instructionsStart = i + 1;
                break;
            }
        }
        stack.constructWithLength(size);
        const operations: MoveOperation[] = [];
        for (let i = instructionsStart; i < input.length; i++) {
            const line = input[i].split(' ');
            if (line.length === 6) {
                const operation = {
                    amount: Number.parseInt(line[1]),
                    from: Number.parseInt(line[3]),
                    to: Number.parseInt(line[5])
                }
                operations.push(operation);
            }
        }
        return { stack, operations };
    }

    async post(request: StackRequest, reply: FastifyReply) {
        logger.info('Calculating stack', { data: request.data });
        const { stack, operations } = this.parse(request.data);
        operations.forEach((op) => {
            if (request.v2) {
                stack.move(op.from, op.to, op.amount);
            } else {
                for (let i = 0; i < op.amount; i++) {
                    stack.move(op.from, op.to);
                }
            }
        });
        let str = "";
        for (let i = 1; i <= stack.length; i++) {
            str = `${str}${stack.top(i)}`;
        }
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ str });
    }
}