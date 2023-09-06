import { atom } from 'recoil';

//Type
import { WordDataType } from '@/types/globaltype';

export const fleeWordsState = atom<WordDataType[]>({
    key: "freeWordsState",
    default: []
});