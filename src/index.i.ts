interface BibleQuery {
    book: string;
    chapter: string;
    type: string;
    verses?: string[];
    edition: string | undefined
}