import { FormEvent, useState } from "react";
import loading from '../../assets/loading.svg';
import { useChallengeThree } from "./ChallengeThreeQueries";
export function ChallengeThree() {
    const [file, setFile] = useState<File>();
    const [v2, setV2] = useState(false);
    const { mutation } = useChallengeThree();
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
            <h2 className='text-lg'>Day 3: Rucksack Reorganization</h2>
            <p className='text-base'>
                One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

                Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

                The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

                The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.
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
                    <h4 className='text-base'>sum: {mutation.data.sum}</h4>
                </section>
            }
        </>
    )
}