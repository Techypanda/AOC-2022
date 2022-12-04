import { Cleaning, OverlapStatus } from "../../src/controllers/Cleaning"

describe('Camp Cleanup works when', () => {
    it('can parse a line successfully', () => {
        const c = new Cleaning();
        expect(c.parseLine('2-4,6-8')).toEqual([[2, 4], [6, 8]]);
        expect(c.parseLine('2-3,4-5')).toEqual([[2, 3], [4, 5]]);
        expect(c.parseLine('5-7,7-9')).toEqual([[5, 7], [7, 9]]);
    });
    it('can parse the overlaps cases', () => {
        const c = new Cleaning();
        expect(c.overlaps([0,2], [3, 4])).toEqual(OverlapStatus.DoesNot);
        expect(c.overlaps([0,2], [2, 4])).toEqual(OverlapStatus.Overlaps);
        expect(c.overlaps([0, 3], [3, 4])).toEqual(OverlapStatus.Overlaps);
        expect(c.overlaps([3, 6], [0, 3])).toEqual(OverlapStatus.Overlaps);
        expect(c.overlaps([2, 4], [6, 8])).toEqual(OverlapStatus.DoesNot);
        expect(c.overlaps([2, 3], [4, 5])).toEqual(OverlapStatus.DoesNot);
        expect(c.overlaps([5,7], [7, 9])).toEqual(OverlapStatus.Overlaps);
        expect(c.overlaps([2,8], [3,7])).toEqual(OverlapStatus.OverlapsEntirely);
        expect(c.overlaps([6,6], [4,6])).toEqual(OverlapStatus.OverlapsEntirely);
        expect(c.overlaps([2,6], [4,8])).toEqual(OverlapStatus.Overlaps);
    });
    it('can parse the test input', () => {
        const c = new Cleaning();
        expect(c.parseInput(`2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`.split('\n'))).toEqual({ 
            overlapStatuses: [2,2,1,0,0,1],
            sum: 2
        });
    });
})