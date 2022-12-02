import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
interface ExpectedResponse {
    scores: number[];
    sum: number;
}
interface Payload {
    input: File;
    v2: boolean;
}
const fetchAnswer = async (p: Payload) => {
    const formData = new FormData();
    formData.append('data', p.input);
    if (p.v2) {
        formData.append('v2', p.v2.toString());
    }
    return await ky(`${import.meta.env.VITE_API_URI}/2`, {
        method: 'post',
        body: formData
    }).json<ExpectedResponse>();
};

export const useChallengeTwo = () => {
    const mutation = useMutation(fetchAnswer);
    return { mutation };
}