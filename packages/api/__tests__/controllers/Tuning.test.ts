import { Tuning } from "../../src/controllers/Tuning"

describe("Tuning works when", () => {
    it('can detect each sample correctly', () => {
        const t = new Tuning();
        expect(t.detect("mjqjpqmgbljsphdztnvjfqwrcgsmlb") + 1).toEqual(7);
        expect(t.detect("bvwbjplbgvbhsrlpgdmjqwftvncz") + 1).toEqual(5);
        expect(t.detect("nppdvjthqldpwncqszvftbrmjlhg") + 1).toEqual(6);
        expect(t.detect("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg") + 1).toEqual(10);
        expect(t.detect("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw") + 1).toEqual(11);
    });
    it('can detect each sample correctly for part 2', () => {
        const t = new Tuning();
        expect(t.detect("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14) + 1).toEqual(19);
        expect(t.detect("bvwbjplbgvbhsrlpgdmjqwftvncz", 14) + 1).toEqual(23);
        expect(t.detect("nppdvjthqldpwncqszvftbrmjlhg", 14) + 1).toEqual(23);
        expect(t.detect("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14) + 1).toEqual(29);
        expect(t.detect("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14) + 1).toEqual(26);
    })
});