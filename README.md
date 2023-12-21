# bible-ref-parser

[![npm version](https://badge.fury.io/js/bible-ref-parser.svg)](https://www.npmjs.com/package/bible-ref-parser)

The most universal module to parse bible reference to an object with the information of the given reference.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
    * [Possible exceptions](#possible-exceptions)
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
    // output : {book: "MT", chapter: "28", startIndex: "18", stopIndex: "20"}
}
catch (e) {
    console.log(`Error ${e.code} as been raised : ${e.message}`)
}
```

⚠️ **The function is likely to throw exceptions**.
Remember to surround it with a `try ... catch` block to ensure your program runs correctly.

<a name="possible-exceptions"></a>
### 🚧 Possible exceptions
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

[bible-ref-parser](https://www.npmjs.com/package/bible-ref-parser) uses the `bookTag` function of the [bible-abbreviation](https://www.npmjs.com/package/bible-abbreviation) module to support a large variety of abbreviations for references.

<a name="contribute"></a>
## 💻 Contribute
**Want to improve the module?** submit a [pull-request](https://github.com/ryan-hmd/bible-ref-parser/pulls) on github or open an [issue](https://github.com/ryan-hmd/bible-ref-parser/issues).

<a name="Todos"></a>
## 📝 Todos
Include the following format support:
- [ ] `<book> <chapter>:<verse1>,<verse2>,...,<verseN>`

## 📜 License
Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
This project is MIT licensed.