export type LoginType = {
    email: string;
    password: string;
    name: string;
};

export type UserType = {
    id: number;
    email: string;
    username: string;
    password: string;
    created_at: Date;
    deleted_at: Date | null;
}

export type WordDBType = {
    id: number;
    english: string;
    japanese: string;
    created_at: Date;
    deleted_at: Date | null;
    last_time_at: Date | null;
    complete: boolean
    user_answer: string;
    right_or_wrong: boolean;
    correct_count: number;
    question_count: number;
    correct_rate: number;
    user_word_id: number;
    user_id: number;
}