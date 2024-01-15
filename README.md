# bible-ref-parser

[![npm version](https://badge.fury.io/js/bible-ref-parser.svg)](https://www.npmjs.com/package/bible-ref-parser)

The most universal module to parse bible reference to an object with the information of the given reference.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Bible editions](#editions)
* [Known issues](#issues)
* [Notes](#Notes)
* [Contribute](#contribute)
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
    // output : { book: "MT", chapter: "28", type: "RANGE", verses: ["18", "20"], edition: undefined }
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`);
}
```

If all goes well, the returned object will **always** contain the keys `version`, `book`, `chapter` and `type`. Depending on the value of `type`, the object may or may not contain the following key: `verses`, which contains the verses to be retrieved. Below the possible `type` :

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
        const [startIndex, stopIndex] = parsedRef.verses;
        // your logic for a range
    }
    else if (parsedRef.type === "MAP") {
        for(const verse of parsedRef.verses) {
            // your logic for a single verse or separated verses in a same chapter
        }
    }
    // other cases ...
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`);
}
```

🤔 **Why return only the starting and ending verses?** Some versions of the Bible have non-linear indexing or verses with letter indexes. It is therefore not possible to generate an array containing the indexes between two given values. The most general way of managing references in ranges is to provide only the starting and ending verses. A well thought-out logic allows you to retrieve all the verses between.

⚠️ **The function is likely to throw exceptions**.
Remember to surround it with a `try ... catch` block to ensure your program runs correctly.

All the exceptions are raised with the following structure:

```js
{ code: HTTP_ERROR_CODE, message: STRING_TO_DISPLAY }
```

- `No valid reference to match` : raised with code `400` when the function receive a string that doesn't contain a biblical reference.
- `No book founded for the given reference`: raised with code `404` when the book of the reference sent is unknown to the canon.
- `Invalid reference`: code `400` when the reference sent contains an range such as `A-A`, which is nonsense.

<a name="editions"></a>
## ✏️ Bible editions
The module also extracts a desired edition of the Bible, if known to the parser.

```js
try {
    const parsed1 = parseQuery("Luke 13:34 KJV");
    console.log(parsed.edition); // output: "KJV"

    const parsed2 = parseQuery("Matthew 28:18-20 Foo");
    console.log(parsed.edition); // output: undefined
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`);
}
```

Si l'édition n'est pas connue, le parser renverra `undefined` ; vous pouvez alors redéfinir la valeur selon votre préférence. 
Ci-dessous l'ensemble des éditions supportés :

|                Edition             |  Abbreviation  | Language |
|:----------------------------------:|:--------------:|:--------:|
| King James Version                 | `KJV`          | English  |
| New King James Version             | `NKJV`         | English  |
| Revised Standard Version           | `RSV`          | English  |
| The Jerusalem Bible                | `TJB`          | English  |
| Vulgate                            | `VULG`         | Latin    |   
| Bible de Jérusalem                 | `BDJ`          | French   |
| Bible catholique Crampon 1928      | `BCC1928`      | French   |
| Bible Fillion                      | `BF`           | French   |
| Traduction officielle Liturgique   | `AELF`         | French   |
| Traduction OEcuménique de la Bible | `TOB`          | French   |
| Parole de vie                      | `PDV`          | French   |
| Bible du semeur                    | `BDS`          | French   |
| Bible Louis Segond                 | `LSG`          | French   |

**Want a specific edition?** submit a [pull-request](https://github.com/ryan-hmd/bible-ref-parser/pulls) on github.

<a name="issues"></a>
## 🛑 Known issues

The regex works great for isolated references (see next section), but can return unexpected values <u>**if the input is a whole text containing the references**</u>. Indeed, if you try "I want 2 John 5:7", you'll get two matches: 'want 2' and 'John 5:7' (or only the first one if the regex is set without the `g` flag) whereas the expected match is '2 John 5:7'.

The best solution I can provide at the moment <u>**if your input is whole text**</u> is to ignore the *whole chapter* format using the following regex:

```
\b((?:\d ?)?[A-Za-zÀ-ÿ]+) (\d+):((?:\d+[a-zA-Z]?)(?:(?:-\d+[a-zA-Z]?)|(?:,\d+[a-zA-Z]?)+){0,1})\b
```

Keep in mind that **there is no problem if all of your inputs are standalone ref**, the issue only concern input that are plain text like paragraph etc.

<a name="notes"></a>
## ❓ Notes

The function fully supports the following formats:
- `<book> <chapter>`
- `<book> <chapter>:<verse>`
- `<book> <chapter>:<verseStart>-<verseEnd>`
- `<book> <chapter>:<verse1>,<verse2>,...,<verseN>`

[bible-ref-parser](https://www.npmjs.com/package/bible-ref-parser) uses the `bookTag` function of the [bible-abbreviation](https://www.npmjs.com/package/bible-abbreviation/v/0.0.3)`@0.0.3` module to support a large variety of abbreviations for references.

<a name="contribute"></a>
## 💻 Contribute

**Want to improve the module?** submit a [pull-request](https://github.com/ryan-hmd/bible-ref-parser/pulls) on github or open an [issue](https://github.com/ryan-hmd/bible-ref-parser/issues).

<a name="license"></a>
## 📜 License

Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
<br>
This project is MIT licensed.
