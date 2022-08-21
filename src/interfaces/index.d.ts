export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
    createdAt: string;
}

interface ITag {
    id: number;
    title: string;
}

interface ILanguage {
    id: number;
    title: string;
}