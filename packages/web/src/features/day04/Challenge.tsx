import { FormEvent, useState } from "react";
import loading from '../../assets/loading.svg';
import { useChallengeFour } from "./ChallengeFourQueries";
export function ChallengeFour() {
    const [file, setFile] = useState<File>();
    const [v2, setV2] = useState(false);
    const { mutation } = useChallengeFour();
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
            <h2 className='text-lg'>Day 4: Camp Cleanup</h2>
            <p className='text-base'>
                OSpace needs to be cleared before the last supplies can be unloaded from the ships, and so several Elves have been assigned the job of cleaning up sections of the camp. Every section has a unique ID number, and each Elf is assigned a range of section IDs.

                However, as some of the Elves compare their section assignments with each other, they've noticed that many of the assignments overlap. To try to quickly find overlaps and reduce duplicated effort, the Elves pair up and make a big list of the section assignments for each pair (your puzzle input).
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
                            <label htmlFor='v2' className='text-xs'>Calculate All Overlaps:</label>
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