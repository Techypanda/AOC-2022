import { FormEvent, useState } from "react";
import { useChallengeOne } from './ChallengeOneQueries';
import loading from '../../assets/loading.svg';
export function ChallengeOne() {
    const [file, setFile] = useState<File>();
    const [topX, setTopX] = useState<number>();
    const { mutation } = useChallengeOne();
    async function handleForm(e: FormEvent) {
        e.preventDefault();
        if (!file) {
            alert('upload a file');
        } else if (!topX) {
            alert('input a number');
        } else if (topX < 1) {
            alert('number must be > 0');
        } else {
            mutation.mutate({ input: file, topX });
        }
    }
    return (
        <>
            <h2 className='text-lg'>Day 1: Calorie Counting</h2>
            <p className='text-base'>
                Santa's reindeer typically eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, their favorite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows.

                To supply enough magical energy, the expedition needs to retrieve a minimum of fifty stars by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.

                Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

                The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input).

                The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.
            </p>
            {mutation.isLoading ? <img src={loading} alt='loading widget' height={35} width={35} /> :
                <form onSubmit={(e) => handleForm(e)}>
                    <>
                        <div className="mt-1">
                            <label className='text-xs' htmlFor='challengeInput'>Upload your challenge input as a txt file</label><br />
                            <input className='text-xs' type='file' id='challengeInput' name='challengeInput' accept='txt' onChange={(e) => setFile(e.target.files ? e.target.files[0] : undefined)} />
                        </div>
                        <br />
                        <div className="mt-1">
                            <label htmlFor='topXSelect' className='text-xs'>Calculate Top X Elves:</label>
                            <input className='border-2 p-1' type='number' id='topXSelect' name='topXSelect' placeholder='0' value={topX} onChange={(e) => setTopX(e.target.valueAsNumber)} />
                        </div>
                        <button className='border-2 p-2 bg-slate-300' type='submit'>Calculate</button>
                        {mutation.error && <p className='text-xs text-red-600'>Failed to process input, please try again</p>}
                    </>
                </form>
            }
            {mutation.data &&
                <section id='answer' className='mt-4'>
                    <h3 className='text-lg'>Computed Calories</h3>
                    <h4 className='text-base'>Top {mutation.data.max.length} calories: <span className="text-xs">{mutation.data.max.join(' ')}</span></h4>
                    <h4 className='text-base'>Sum: {mutation.data.sum}</h4>
                </section>
            }
        </>
    )
}