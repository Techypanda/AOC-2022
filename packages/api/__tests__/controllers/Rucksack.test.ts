import { Rucksack } from "../../src/controllers/Rucksack";

describe('Rucksack works when', () => {
    const exampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
    it('can get compartments from example strings', () => {
        const rs = new Rucksack();
        expect(rs.getCompartments('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual({ compartmentOne: 'vJrwpWtwJgWr', compartmentTwo: 'hcsFMMfFFhFp' });
        expect(rs.getCompartments('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toEqual({ compartmentOne: 'jqHRNqRjqzjGDLGL', compartmentTwo: 'rsFMfFZSrLrFZsSL' });
        expect(rs.getCompartments('PmmdzqPrVvPwwTWBwg')).toEqual({ compartmentOne: 'PmmdzqPrV', compartmentTwo: 'vPwwTWBwg' });
    });
    it('can processLine on multiple base cases', () => {
        const rs = new Rucksack();
        expect(rs.processLine('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual({ existsInBoth: ['p'], sum: 16 });
        expect(rs.processLine('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toEqual({ existsInBoth: ['L'], sum: 38 });
        expect(rs.processLine('PmmdzqPrVvPwwTWBwg')).toEqual({ existsInBoth: ['P'], sum: 42 });
        expect(rs.processLine('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')).toEqual({ existsInBoth: ['v'], sum: 22 });
        expect(rs.processLine('ttgJtRGJQctTZtZT')).toEqual({ existsInBoth: ['t'], sum: 20 });
        expect(rs.processLine('CrZsJsPPZsGzwwsLwLmpwMDw')).toEqual({ existsInBoth: ['s'], sum: 19 });
    });
    it('can process example one', () => {
        const rs = new Rucksack();
        expect(rs.parseText(exampleInput.split('\n'))).toEqual(157);
    });
    it('can process example two', () => {
        const rs = new Rucksack();
        expect(rs.parseGroup(exampleInput.split('\n'))).toEqual(70);
    });
});