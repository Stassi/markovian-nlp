# markovian-nlp
[![build status][shields travis]][travis markovian-nlp]
[![npm dependencies][shields dependencies]][markovian-nlp package]
[![npm dev dependencies][shields dev dependencies]][markovian-nlp package]
[![license][shields license]][markovian-nlp license]
[![npm bundle size (minified)][shields min]][bundlephobia markovian-nlp]
[![npm bundle size (minified + gzip)][shields minzip]][bundlephobia markovian-nlp]
[![node version compatibility][shields node]][markovian-nlp package]
[![npm current version][shields npm]][npm markovian-nlp]

## Quick start
As an isomorphic JavaScript package, there are multiple ways for clients, servers, and bundlers to start using this library. Several methods do not require installation.

### RunKit
RunKit provides one of the least difficult ways to get started:
* [test with RunKit][runkit markovian-nlp]

### CodePen
Declare imports in the `JS` section to get started:
```es6
import {
  ngramsDistribution,
  sentences,
} from 'https://unpkg.com/markovian-nlp@latest?module';
```

```es6
const sentence = sentences({ document: 'oh me, oh my' });
console.log(sentence);
// example output: 'oh me oh me oh my'
```
* [test with CodePen][codepen new]

### Browsers
Insert the following element within the `<head>` tag of an HTML document:
```html
<script src="https://unpkg.com/markovian-nlp@latest"></script>
```

After the script is loaded, the `markovian` browser global is exposed:
```es6
const sentence = markovian.sentences({ document: 'oh me, oh my' });
console.log(sentence);
// example output: ['oh me oh me oh my']
```

## Node.js
With [`npm` installed][npm install], run terminal command:
```shell
npm i markovian-nlp
```
* [npm package][npm markovian-nlp]

Once installed, declare method imports at the top of each JavaScript file they will be used.

### ES2015
__Recommended__
```es6
import {
  ngramsDistribution,
  sentences,
} from 'markovian-nlp';
```

### CommonJS
```javascript
const {
  ngramsDistribution,
  sentences,
} = require('markovian-nlp');
```

## Usage
### Markov text generation
_[**Generate text sentences**][wikipedia markov text generators] from a Markov process._

Potential applications: [Natural language generation][wikipedia natural language generation]

#### Generate sentences
Optionally providing a `seed` generates deterministic sentences.

In this example, `document` is text from [this source][wikisource locke wandering]:

```es6
sentences({
  count: 3,
  document: 'That there is constant succession and flux of ideas in our minds...',
  seed: 1,
});

// output: [
//   'i would promote introduce a constant succession and hindering the path...',
//   'he that train they seem to be glad to be done as may be avoided of our thoughts...',
//   'this wandering of attention and yet for ought i know this wandering thoughts i would promote...',
// ]
```
* [test with RunKit][runkit markovian-nlp]

### View _n_-grams distribution
_View the [__n-grams distribution__][wikipedia n-gram] of text._

Potential applications: [Markov models][wikipedia markov model]

```es6
ngramsDistribution('birds have featured in culture and art since prehistoric times');

// output: {
//   and: { _end: 0, _start: 0, art: 1 },
//   art: { _end: 0, _start: 0, since: 1 },
//   birds: { _end: 0, _start: 1, have: 1 },
//   culture: { _end: 0, _start: 0, and: 1 },
//   featured: { _end: 0, _start: 0, in: 1 },
//   have: { _end: 0, _start: 0, featured: 1 },
//   in: { _end: 0, _start: 0, culture: 1 },
//   prehistoric: { _end: 0, _start: 0, times: 1 },
//   since: { _end: 0, _start: 0, prehistoric: 1 },
//   times: { _end: 1, _start: 0 },
// }
```

Each number represents the sum of occurrences.

startgram | endgram | bigrams
--------- | ------- | -------
"birds" | "times" | _all remaining keys_ ("have **featured**", "featured **in**", etc.)

* [test with RunKit][runkit markovian-nlp]

## API
### ngramsDistribution(document || ngramsDistribution)
#### ngramsDistribution(Array(document || ngramsDistribution[, ...]))
##### Input
type | description
---- | -----------
[String][mdn string] | `document` (corpus or text)
[Object][mdn object] | `ngramsDistribution` (equivalent to `identity`, i.e.: this method's output)
[Array][mdn array][[Strings][mdn string]...] | combine multiple `document`
[Array][mdn array][[Objects][mdn object]...] | combine multiple `ngramsDistribution`
[Array][mdn array][[Strings][mdn string], [Objects][mdn object]...] | combine multiple `document` and `ngramsDistribution`

##### Return value
type | description
---- | -----------
[Object][mdn object] | distributions of unigrams to startgrams, endgrams, and following bigrams

```es6
// pseudocode signature representation (does not run)
ngramsDistribution(document) => ({
  ...unigrams: {
    ...{ ...bigram: bigramsDistribution },
    _end: endgramsDistribution,
    _start: startgramsDistribution,
  },
});
```

### sentences({ distribution || document[, count][, seed] })
##### Input
user-defined parameter | type | optional | default value | implements | description
---------------------- | ---- | -------- | ------------- | ---------- | -----------
`options.count` | [Number][mdn number] | true |`1` | | Number of sentences to output.
`options.distribution` | [Object][mdn object] | required if `options.document` omitted | | | _n_-grams distribution used in place of text.
`options.document` | [String][mdn string] | required if `options.distribution` omitted | | [compromise(`document`)][npm compromise] | Text used in place of _n_-grams distribution.
`options.seed` | [Number][mdn number] | true | `undefined` | [Chance(`seed`)][chance seed] | Leave `undefined` (default) for nondeterministic results, or specify `seed` for deterministic results.

##### Return value
type | description
---- | -----------
[Array][mdn array][[Strings][mdn string]...] | generated sentences

## Glossary
Learn more about [computational linguistics][wikipedia computational linguistics] and [natural language processing (NLP)][wikipedia natural language processing] on Wikipedia.

The following terms are used in the API documentation:

term | description
---- | ---
[bigram][wikipedia bigram] | 2-gram sequence
[deterministic][wikipedia deterministic system] | repeatable, non-random
endgram | final gram in a sequence
[_n_-gram][wikipedia n-gram] | contiguous gram (word) sequence
startgram | first gram in a sequence
unigram | 1-gram sequence

[bundlephobia markovian-nlp]: https://bundlephobia.com/result?p=markovian-nlp
    (bundlephobia: markovian-nlp)
[chance seed]: https://chancejs.com/usage/seed.html
    (chance: seed usage)
[codepen new]: https://codepen.io/pen
    (CodePen: Create a New Pen)
[markovian-nlp license]: LICENSE
    (markovian-nlp license)
[markovian-nlp package]: package.json
    (markovian-nlp package.json)
[npm compromise]: https://www.npmjs.com/package/compromise
    (npm: compromise)
[npm install]: https://www.npmjs.com/get-npm
    (npm: install npm with Node.js)
[npm markovian-nlp]: https://www.npmjs.com/package/markovian-nlp
    (npm: markovian-nlp)
[mdn array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
    (MDN JavaScript reference: Array)
[mdn number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
    (MDN JavaScript reference: Number)
[mdn object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
    (MDN JavaScript reference: Object)
[mdn string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    (MDN JavaScript reference: String)
[node esm]: https://nodejs.org/api/esm.html
    (Node.js Documentation: ECMAScript Modules)
[runkit markovian-nlp]: https://npm.runkit.com/markovian-nlp
    (RunKit+npm: test markovian-nlp)
[shields dependencies]: https://img.shields.io/david/Stassi/markovian-nlp.svg
[shields dev dependencies]: https://img.shields.io/david/dev/Stassi/markovian-nlp.svg
[shields license]: https://img.shields.io/npm/l/markovian-nlp.svg
[shields min]: https://img.shields.io/bundlephobia/min/markovian-nlp.svg
[shields minzip]: https://img.shields.io/bundlephobia/minzip/markovian-nlp.svg
[shields node]: https://img.shields.io/node/v/markovian-nlp.svg
[shields npm]: https://img.shields.io/npm/v/markovian-nlp.svg
[shields travis]: https://img.shields.io/travis/com/Stassi/markovian-nlp.svg
[travis markovian-nlp]: https://travis-ci.com/Stassi/markovian-nlp
    (travis: markovian-nlp)
[wikipedia bigram]: https://en.wikipedia.org/wiki/Bigram
    (Wikipedia: Bigram)
[wikipedia computational linguistics]: https://en.wikipedia.org/wiki/Computational_linguistics
    (Wikipedia: Computational linguistics)
[wikipedia deterministic system]: https://en.wikipedia.org/wiki/Deterministic_system
    (Wikipedia: Deterministic system)
[wikipedia markov model]: https://en.wikipedia.org/wiki/Markov_model
    (Wikipedia: Markov model)
[wikipedia markov text generators]: https://en.wikipedia.org/wiki/Markov_chain#Markov_text_generators
    (Wikipedia: Markov text generators)
[wikipedia n-gram]: https://en.wikipedia.org/wiki/N-gram
    (Wikipedia: n-gram)
[wikipedia natural language generation]: https://en.wikipedia.org/wiki/Natural_language_generation
    (Wikipedia: Natural language generation)
[wikipedia natural language processing]: https://en.wikipedia.org/wiki/Natural_language_processing
    (Wikipedia: Natural language processing)
[wikisource locke wandering]: https://en.wikisource.org/wiki/Of_the_Conduct_of_the_Understanding#Section_30._Wandering.
    (Wikisource: Of the Conduct of the Understanding, Section 30. Wandering.)
