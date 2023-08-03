import { atom } from 'recoil';
import { wordList } from '@/utils/words';

//Type
import { WordType, WordDataType } from '@/types/globaltype';

export const dbWordsState = atom<WordDataType[]>({
    key: 'dbWords',
    default: [...wordList]
});

export const remainNumState = atom({
    key: 'remainNumState',
    default: 0
});

export const wordState = atom<WordType>({
    key: 'wordState',
    default: {
        english: '',
        japanese: ''
    }
});

export const wordsState = atom<WordDataType[]>({
    key: 'wordsState',
    default: []
});