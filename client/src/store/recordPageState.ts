import { atom } from 'recoil';

//Type
import { WordDBType } from '@/types/globaltype';

export const recordWordsState = atom<WordDBType[]>({
    key: "recordWordsState",
    default: []
});