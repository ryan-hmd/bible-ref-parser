import { bookTag } from 'bible-abbreviation';
const knownBibles = ["BDJ", "BCC1928", "BF", "AELF", "TOB", "PDV", "BDS", "LSG", "KJV", "NKJV", "RSV", "TJB", "VULG"];
// If you want the support of a new abbreviation, please open a pull-request here : https://github.com/ryan-hmd/bible-ref-parser/pulls 

/**
 * Parse a biblical reference into a JSON object containing all the reference information.
 * ```js
 * parseQuery("Matthew 28:18-20");
 * // output : { book: "MT", chapter: "28", type: "RANGE", verses: ["18", "20"], edition: undefined }
 * ```
*/
export const parse = (ref: string) : BibleQuery | undefined => {
    const splitter = /((?:\d ?)?[A-Za-zÀ-ÿ]+) (\d+)(?::((?:\d+[a-zA-Z]?)(?:(?:-\d+[a-zA-Z]?)|(?:,\d+[a-zA-Z]?)+){0,1}))?(?: ([a-zA-Z]+))?/;
    if (!splitter.test(ref)) return undefined
    let [, book, chapter, indexs, edition] = ref.match(splitter)!;

    const version = edition && knownBibles.includes(edition.toUpperCase()) ? edition.toUpperCase() : undefined;

    const tag = bookTag(book);
    if (!tag) return undefined

    if (!indexs) return { book: tag, chapter: chapter, type: "WHOLE_CHAPTER", edition: version };

    let verses: string[];
    let type: string;
    
    if (indexs.includes("-")) {
        const [startIndex, stopIndex] = indexs.split('-').map(x => x.toUpperCase());
        if (startIndex === stopIndex) {
            type = "MAP";
            verses = [startIndex];
        }
        else {
            type = "RANGE";
            verses = [startIndex, stopIndex];
        }
    }
    else if (indexs.includes(",")) {
        const versesMap = indexs.split(',').map(x => x.toUpperCase());
        verses = Array.from(new Set(versesMap));
        type = "MAP";
    }
    else {
        type = "MAP";
        verses = [indexs];
    }

    return {
        edition: version,
        book: tag,
        chapter: chapter,
        type: type,
        verses: verses
    };
}
