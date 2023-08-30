import { atom } from 'recoil';

//Type
import { WordDataType } from '@/types/globaltype';

export const WordsState = atom<WordDataType[]>({
    key: "free_WordsState",
    default: []
});