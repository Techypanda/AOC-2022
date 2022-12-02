import { FormEvent, useState } from "react";
import loading from '../../assets/loading.svg';
import { useChallengeTwo } from "./ChallengeTwoQueries";
export function ChallengeTwo() {
    const [file, setFile] = useState<File>();
    const [v2, setV2] = useState(false);
    const { mutation } = useChallengeTwo();
    async function handleForm(e: FormEvent) {
        e.preventDefault();
        if (!file) {
            alert('upload a file');
        } else {
            mutation.mutate({ input: file, v2 });
        }
    }
    return (
        <>
            <iframe className='mx-auto' src='https://gfycat.com/ifr/IncompleteParallelDeer' frameBorder='0' scrolling='no' allowFullScreen width='640' height='404'></iframe>
            <h2 className='text-lg'>Day 2: Rock Paper Scissors</h2>
            <p className='text-base'>
                The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress.

                Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.

                Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
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
                            <label htmlFor='v2' className='text-xs'>Calculate Top X Elves:</label>
                            <input type='checkbox' id='v2' name='v2' onChange={(e) => setV2(e.target.checked)} />
                        </div>
                        <button className='border-2 p-2 bg-slate-300' type='submit'>Calculate</button>
                        {mutation.error && <p className='text-xs text-red-600'>Failed to process input, please try again</p>}
                    </>
                </form>}
            {mutation.data &&
                <section id='answer' className='mt-4'>
                    <h3 className='text-lg'>Response</h3>
                    <h4 className='text-base'>scores ({mutation.data.scores.length}): <span className="text-xs">{mutation.data.scores.join(' ')}</span></h4>
                    <h4 className='text-base'>sum: {mutation.data.sum}</h4>
                </section>
            }
        </>
    )
}