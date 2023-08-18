export type LoginType = {
    email: string,
    name: string,
    password: string
};

export type WordType = {
    english: string,
    japanese: string
};

export type WordDataType = {
    id: number,
    english: string,
    japanese: string,
    date: string,
    editing: boolean,
    register: string,
    complete: boolean,
    yourAnswer: string,
    rightWrong: boolean,
    correctAnswer: number,
    questionNum: number,
    correctRate: number
};

export type SidebarType = {
    title: string,
    icon: React.JSX.Element,
    link: string,
    active: boolean
};