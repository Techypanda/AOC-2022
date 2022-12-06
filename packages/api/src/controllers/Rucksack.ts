import { FastifyReply } from "fastify";
import { logger } from "../utils/logger";

interface RucksackRequest {
    data: string[];
    v2: boolean;
}

export class Rucksack {
    getCompartments(input: string) {
        const compartmentOne = input.substring(0, input.length/2);
        const compartmentTwo = input.substring(input.length/2, input.length);
        return { compartmentOne, compartmentTwo };
    }
    private doublePointerTrace(compartmentOne: string[], compartmentTwo: string[]): string[] { // O(N) algorithm
        const sortedCompartmentOne = compartmentOne.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
        const sortedCompartmentTwo = compartmentTwo.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
        let i = 0;
        let k = 0;
        const existsInBoth: string[] = [];
        while (i < compartmentOne.length && k < compartmentTwo.length) {
            // logger.info({ iAt: sortedCompartmentOne[i], kAt: sortedCompartmentTwo[k], i, k, iAscii: sortedCompartmentOne[i].charCodeAt(0), kAscii: sortedCompartmentTwo[k].charCodeAt(0) })
            if (sortedCompartmentOne[i] === sortedCompartmentTwo[k]) {
                // SAME
                existsInBoth.push(sortedCompartmentOne[i]);
                let tmpI = i;
                let tmpK = k;
                while (true && i < compartmentOne.length && k < compartmentTwo.length) {
                    if (sortedCompartmentOne[tmpI] === sortedCompartmentOne[i]) {
                        tmpI++;
                    } else if (sortedCompartmentTwo[tmpK] === sortedCompartmentTwo[k]) {
                        tmpK++;
                    } else {
                        break;
                    }
                }
                i = tmpI; k = tmpK;
            } else if (sortedCompartmentOne[i].charCodeAt(0) < sortedCompartmentTwo[k].charCodeAt(0)) {
                i++;
            } else if (sortedCompartmentTwo[k].charCodeAt(0) < sortedCompartmentOne[i].charCodeAt(0)) {
                k++;
            } else {
                i++; k++;
            }
        }
        return existsInBoth;
    }
    private triplePointerTrace(c1: string[], c2: string[], c3: string[]): string[] { // could combine ^ and this with recursion but im lazy and its 9pm
        const sortedC1 = c1.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
        const sortedC2 = c2.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
        const sortedC3 = c3.sort((x, y) => x.charCodeAt(0) - y.charCodeAt(0));
        let i = 0;
        let k = 0;
        let j = 0;
        const existsInBoth: string[] = [];
        while (i < c1.length && k < c2.length && j < c3.length) {
            if (sortedC1[i] === sortedC2[k] && sortedC2[k] === sortedC3[j]) {
                existsInBoth.push(sortedC1[i]);
                let tmpI = i;
                let tmpK = k;
                let tmpJ = j;
                while (true && i < c1.length && k < c2.length && j < c3.length) {
                    if (sortedC1[tmpI] === sortedC1[i]) {
                        tmpI++;
                    } else if (sortedC2[tmpK] === sortedC2[k]) {
                        tmpK++;
                    } else if (sortedC3[tmpJ] === sortedC3[j]) {
                        tmpJ++;  
                    } else {
                        break;
                    }
                }
                i = tmpI; k = tmpK; j = tmpJ;
            } else if (sortedC1[i].charCodeAt(0) < sortedC2[k].charCodeAt(0) && sortedC1[i].charCodeAt(0) < sortedC3[j].charCodeAt(0)) { // i is smallest
                i++;
            } else if (sortedC2[k].charCodeAt(0) < sortedC1[i].charCodeAt(0) && sortedC2[k].charCodeAt(0) < sortedC3[j].charCodeAt(0)) { // k is smallest
                k++;
            } else if (sortedC3[j].charCodeAt(0) < sortedC1[i].charCodeAt(0) && sortedC3[j].charCodeAt(0) < sortedC2[k].charCodeAt(0)) { // j is smallest
                j++;
            } else {
                i++; j++; k++;
            }
        }
        return existsInBoth;
    }
    private asciiToPriority(n: number) {
        return n < 91 ? n - 38 : n - 96;
    }
    processLine(input: string) {
        const compartments = this.getCompartments(input);
        const existsInBoth = this.doublePointerTrace(compartments.compartmentOne.split(''), compartments.compartmentTwo.split(''));
        const sum = existsInBoth.reduce((prev, curr) => prev + this.asciiToPriority(curr.charCodeAt(0)), 0);
        return { existsInBoth, sum };
    }
    parseText(input: string[]) {
        let sum = 0;
        input.forEach((x) => sum += this.processLine(x).sum);
        return sum;
    }
    parseGroup(input: string[], groups = 3) {
        let sum = 0;
        for (let i = 0; i + 2 < input.length; i+=3) {
            const m: Record<string, number> = {};
            const filteredOne = input[i].split('').filter((v, i, s) => s.indexOf(v) === i);
            const filteredTwo = input[i+1].split('').filter((v, i, s) => s.indexOf(v) === i);
            const filteredThree = input[i+2].split('').filter((v, i, s) => s.indexOf(v) === i);
            filteredOne.map((x) => {
                if (m[x]) {
                    m[x] += 1;
                } else {
                    m[x] = 1;
                }
            });
            filteredTwo.map((x) => {
                if (m[x]) {
                    m[x] += 1;
                } else {
                    m[x] = 1;
                }
            });
            filteredThree.map((x) => {
                if (m[x]) {
                    m[x] += 1;
                } else {
                    m[x] = 1;
                }
            });
            sum += Object.entries(m).filter((v) => v[1] === 3).reduce((prev, curr) => prev += this.asciiToPriority(curr[0].charCodeAt(0)), 0);
            // passed in tests but for real thing cant get this approach working so just chose to use a map...
            // logger.info(iteration);
            // const similar = this.triplePointerTrace(input[i].split(''), input[i+1].split(''), input[i+2].split(''));
            // sum += similar.reduce((prev, curr) => prev + this.asciiToPriority(curr.charCodeAt(0)), 0);
        }
        return sum;
    }
    async post(request: RucksackRequest, reply: FastifyReply) {
        logger.info('Calculating rucksack', { data: request.data });
        let sum: number;
        if (request.v2) {
            sum = this.parseGroup(request.data);
        } else {
            sum = this.parseText(request.data);
        }
        logger.info('Calculated rucksack', { sum });
        reply
            .status(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ sum });
    }
}