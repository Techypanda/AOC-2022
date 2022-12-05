import { Stacker } from "../../src/controllers/Stacker";
import { logger } from "../../src/utils/logger";

describe("Stacker works when", () => {
    const example = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
    it('can parse the example', () => {
        const stacker = new Stacker();
        const { stack, operations } = stacker.parse(example.split("\n"));
        expect(stack).toMatchSnapshot();
        expect(operations).toMatchSnapshot();
    });

    it('can get correct result in example 1', () => {
        const stacker = new Stacker();
        const { stack, operations } = stacker.parse(example.split("\n"));        
        operations.forEach((op) => {
            for (let i = 0; i < op.amount; i++) {
                stack.move(op.from, op.to);
            }
        });
        expect(stack).toMatchSnapshot();
        expect(stack.length).toBe(3);
        let str = "";
        for (let i = 1; i <= stack.length; i++) {
            str = `${str}${stack.top(i)}`;
        }
        expect(str).toEqual('CMZ');
    });

    it('can get correct result in example 2', () => {
        const stacker = new Stacker();
        const { stack, operations } = stacker.parse(example.split("\n"));  
        operations.forEach((op) => {
            stack.move(op.from, op.to, op.amount);
        });
        expect(stack).toMatchSnapshot();
        expect(stack.length).toBe(3);
        let str = "";
        for (let i = 1; i <= stack.length; i++) {
            str = `${str}${stack.top(i)}`;
        }
        expect(str).toEqual('MCD');
    });
})