const { bookTag } = require('bible-abbreviation');
/**
 * Parse a biblical reference into a JSON object containing all the reference information.
 * ```js
 * parseQuery("Matthew 28:18-20");
 * // output : { book: "MT", chapter: "28", startIndex: "18", stopIndex: "20" }
 * ```
*/
export const parseQuery = (ref: string) : BibleQuery => {
    const splitter = new RegExp(/((?:\d\s)?[A-Za-zÀ-ÿ]+)\s(\d+)(?::(\d+[a-zA-Z]?(?:-\d+[a-zA-Z]?)?))?/);
    if (!splitter.test(ref)) throw {code: 400, message: 'No valid reference to match'};
    const [, book, chapter, indexs] = ref.match(splitter)!;
    const tag = bookTag(book);
    if (!tag) throw {code: 404, message: "No book founded for the given reference"};
    const [startIndex, stopIndex] = indexs ? indexs.split('-').map(x => x.toUpperCase()) : [null, null];
    if (startIndex && startIndex === stopIndex) throw {code: 400, message: "Invalid reference"};
    return {
        book: tag,
        chapter: chapter,
        startIndex: startIndex,
        stopIndex: stopIndex || null
    };
}
