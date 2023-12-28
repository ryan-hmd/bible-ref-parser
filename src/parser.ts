const { bookTag } = require('bible-abbreviation');
/**
 * Parse a biblical reference into a JSON object containing all the reference information.
 * ```js
 * parseQuery("Matthew 28:18-20");
 * // output : { book: "MT", chapter: "28", type: "RANGE", verses: ["18", "20"] }
 * ```
*/
export const parseQuery = (ref: string) : BibleQuery => {
    const splitter = new RegExp(/((?:\d ?)?[A-Za-zÀ-ÿ]+) (\d+)(?::((?:\d+[a-zA-Z]?)(?:(?:-\d+[a-zA-Z]?)|(?:,\d+[a-zA-Z]?)+){0,1}))?/);
    if (!splitter.test(ref)) throw {code: 400, message: 'No valid reference to match'};
    const [, book, chapter, indexs] = ref.match(splitter)!;

    const tag = bookTag(book);
    if (!tag) throw {code: 404, message: "No book founded for the given reference"};

    if (!indexs) {
        return {
            book: tag,
            chapter: chapter,
            type: "WHOLE_CHAPTER"
        };
    }
    else {
        if (indexs.includes("-")) {
            const [startIndex, stopIndex] = indexs.split('-').map(x => x.toUpperCase());
            if (startIndex === stopIndex) throw {code: 400, message: "Nonsense range"};
            return {
                book: tag,
                chapter: chapter,
                type: "RANGE",
                verses: [startIndex, stopIndex]
            };
        }
        else if (indexs.includes(",")) {
            const versesMap = indexs.split(',').map(x => x.toUpperCase());
            const reducedMap = Array.from(new Set(versesMap));
            return {
                book: tag,
                chapter: chapter,
                type: "MAP",
                verses: reducedMap
            };
        }
        else {
            return {
                book: tag,
                chapter: chapter,
                type: "MAP",
                verses: [indexs]
            };
        }
    }
}
