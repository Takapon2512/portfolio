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

export type WordDataType = {
    id: number;
    english: string;
    japanese: string;
    created_at: Date;
    deleted_at: Date | null;
    last_time_date: Date | null;
    complete: boolean | null;
    user_answer: string | null;
    right_or_wrong: boolean | null;
    correct_count: number | null;
    question_count: number | null;
    correct_rate: number | null;
    user_id: number;
}