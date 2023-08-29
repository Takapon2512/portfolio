export type LoginType = {
    email: string,
    name: string,
    password: string
};

export type WordType = {
    english: string,
    japanese: string
};

// export type WordDataType = {
//     id: number,
//     english: string,
//     japanese: string,
//     date: string,
//     editing: boolean,
//     register: string,
//     complete: boolean,
//     yourAnswer: string,
//     rightWrong: boolean,
//     correctAnswer: number,
//     questionNum: number,
//     correctRate: number
// };

export interface WordDataType extends WordDBType {
    editing: boolean,
    question_register: string
}

export interface WordDBType {
    id: number;
    english: string;
    japanese: string;
    created_at: Date;
    deleted_at: Date | null;
    last_time_at: Date | null;
    complete: boolean | null;
    user_answer: string | null;
    right_or_wrong: boolean | null;
    correct_count: number | null;
    question_count: number | null;
    correct_rate: number | null;
    user_word_id: number;
    user_id: number;
}


export type SidebarType = {
    title: string,
    icon: React.JSX.Element,
    link: string,
    active: boolean
};

export type UserInputType = {
    minText: string,
    maxText: string,
    wordText: string
};