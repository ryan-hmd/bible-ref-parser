# bible-ref-parser

[![npm version](https://badge.fury.io/js/bible-ref-parser.svg)](https://www.npmjs.com/package/bible-ref-parser)

The most universal module to parse bible reference to an object with the information of the given reference.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Notes](#Notes)
* [Contribute](#contribute)
* [Todos](#todos)
* [License](#license)


<a name="installation"></a>
## ⚙️ Installation

```bash
npm install bible-ref-parser
```

<a name="usage"></a>
## 📑 Usage

```js
const { parseQuery } = require('bible-ref-parser');

const reference = "Matthew 28:18-20";
try {
    const parsedRef = parseQuery(reference);
    console.log(parsedRef);
    // output : { book: "MT", chapter: "28", type: "RANGE", verses: ["18", "20"] }
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`)
}
```

If all goes well, the returned object will **always** contain the keys `book`, `chapter` and `type`. Depending on the value of `type`, the object may or may not contain the following key: `verses`, which contains the verses to be retrieved. Below the possible `type` :

|        Type       |                 Request prototype                 | is `verses` ? |
|:-----------------:|:-------------------------------------------------:|:-------------:|
|  `WHOLE_CHAPTER`  | `<book> <chapter>`                                |      `No`     |
|      `RANGE`      | `<book> <chapter>:<verseStart>-<verseEnd>`        |      `Yes`    |
|       `MAP`       | `<book> <chapter>:<verse>`                        |      `Yes`    |
|       `MAP`       | `<book> <chapter>:<verse1>,<verse2>,...,<verseN>` |      `Yes`    |

Then, the processing of the reference you've parsed must be conditioned on the value of the `type`. Here are a few examples:

```js
try {
    const parsedRef = parseQuery("Matthew 28:18-20");
    if (parsedRef.type === "RANGE") {
        const [startIndex, stopIndex] = parsedRef.verses
        // you logic for a range
    }
    else if (parsedRef.type === "MAP") {
        for(const verse of parsedRef.verses) {
            // your logic for a single verse or separated verses in a same chapter
        }
    }
    // other cases ...
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`)
}
```

⚠️ **The function is likely to throw exceptions**.
Remember to surround it with a `try ... catch` block to ensure your program runs correctly.

All the exceptions are raised with the following structure:
```js
    { code: HTTP_ERROR_CODE, message: STRING_TO_DISPLAY }
```

- `No valid reference to match` : raised with code `400` when the function receive a string that doesn't contain a biblical reference.
- `No book founded for the given reference`: raised with code `404` when the book of the reference sent is unknown to the canon.
- `Invalid reference`: code `400` when the reference sent contains an range such as `A-A`, which is nonsense.

<a name="notes"></a>
## ❓ Notes
The function supports the following formats:
- `<book> <chapter>`
- `<book> <chapter>:<verse>`
- `<book> <chapter>:<verseStart>-<verseEnd>`
- `<book> <chapter>:<verse1>,<verse2>,...,<verseN>`

[bible-ref-parser](https://www.npmjs.com/package/bible-ref-parser) uses the `bookTag` function of the [bible-abbreviation](https://www.npmjs.com/package/bible-abbreviation) module to support a large variety of abbreviations for references.

<a name="contribute"></a>
## 💻 Contribute
**Want to improve the module?** submit a [pull-request](https://github.com/ryan-hmd/bible-ref-parser/pulls) on github or open an [issue](https://github.com/ryan-hmd/bible-ref-parser/issues).

<a name="license"></a>
## 📜 License
Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
<br>
This project is MIT licensed.