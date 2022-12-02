import { Jajanken } from "../../src/controllers/Jajanken"

describe('Jajaken works when', () => {
    const input = `
A Y
B X
C Z
`
    it('can handle the example from aoc test case 1', async () => {
        const jajanken = new Jajanken();
        const { scores, sum } = await jajanken.runGame(input.split('\n'));
        expect(scores).toEqual([8, 1, 6]);
        expect(sum).toEqual(15);
    });
    it('can handle the example from aoc test case 2', async () => {
        const jajanken = new Jajanken();
        const { scores, sum } = await jajanken.runGame(input.split('\n'), true);
        expect(scores).toEqual([4, 1, 7]);
        expect(sum).toEqual(12);
    });
})