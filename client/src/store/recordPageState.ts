import { atom } from 'recoil';

//Type
import { WordDBType } from '@/types/globaltype';
type CalendarType = {
    id: number;
    learning_date: Date;
    created_at: Date;
    user_id: number;
}

export const recordWordsState = atom<WordDBType[]>({
    key: "recordWordsState",
    default: []
});

export const recordCalendarState = atom<CalendarType[]>({
    key: "recordCalendarState",
    default: []
});