import { CaloriesController } from "../../src/controllers/Calories";

describe('Calories is working when', () => {
    const TEST_DATA = `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000
    `.split('\n');
    it('can calculate the top elf carrying calories', async () => {
        const { max, sum } = await new CaloriesController().calculateTopNCalories(TEST_DATA, 1);
        expect(max).toEqual([24000]);
        expect(sum).toEqual(24000);
    });

    it('can calculate the top elf carrying calories', async () => {
        const { max, sum } = await new CaloriesController().calculateTopNCalories(TEST_DATA, 3);
        expect(max).toEqual([10000, 11000, 24000]);
        expect(sum).toEqual(45000);
    });
});