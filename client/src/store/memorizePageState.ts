import { atom } from 'recoil';

//Type
import { WordDBType } from '@/types/globaltype';

export const memorizeWordsState = atom<WordDBType[]>({
    key: "memorizeWordsState",
    default: []
});