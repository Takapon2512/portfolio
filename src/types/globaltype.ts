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
    complete: boolean
};

export type SidebarType = {
    title: string,
    icon: React.JSX.Element,
    link: string,
    active: boolean
};