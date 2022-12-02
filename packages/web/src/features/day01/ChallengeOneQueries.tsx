import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
interface ExpectedResponse {
    max: number[];
    sum: number;
}
interface Payload {
    input: File;
    topX: number;
}
const fetchAnswer = async (p: Payload) => {
    const formData = new FormData();
    formData.append('data', p.input);
    await new Promise(r => setTimeout(r, 5000));
    return await ky(`${import.meta.env.VITE_API_URI}/1/${p.topX}`, {
        method: 'post',
        body: formData
    }).json<ExpectedResponse>();
};

export const useChallengeOne = () => {
    const mutation = useMutation(fetchAnswer);
    return { mutation };
}