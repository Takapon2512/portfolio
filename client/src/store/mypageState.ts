import { atom } from 'recoil';

//Type
import { WordType, WordDataType, WordDBType } from '@/types/globaltype';

export const dbWordsState = atom<WordDataType[]>({
    key: 'dbWords',
    default: []
});

export const DBState = atom<WordDBType[]>({
    key: 'DBState',
    default: []
})

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

export const alertState = atom<string>({
    key: "alertState",
    default: ""
});