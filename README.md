# markovian-nlp
[![license][shields license]][markovian-nlp license]
[![npm current version][shields npm]][npm markovian-nlp]

## Setup
### Installation
With [`npm`][npm install] installed, run terminal command:
```shell
npm i markovian-nlp
```
* [npm package][npm markovian-nlp]

## Usage
### Module import
Declare method imports at the top of each JavaScript file they will be used.

#### ES2015
```es6
import {
  ngramsDistribution,
  sentences,
} from 'markovian-nlp';
```

#### CommonJS
```javascript
const {
  ngramsDistribution,
  sentences,
} = require('markovian-nlp');
```

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

## API
### ngramsDistribution(document)
_View the [__n-grams distribution__][wikipedia n-gram] of text._

Potential applications: [Markov models][wikipedia markov model]

#### Example
```es6
ngramsDistribution('birds have featured in culture and art since prehistoric times');
```
* [test with RunKit][runkit markovian-nlp]

##### Output
```es6
{
  and: { _end: 0, _start: 0, art: 1 },
  art: { _end: 0, _start: 0, since: 1 },
  birds: { _end: 0, _start: 1, have: 1 },
  culture: { _end: 0, _start: 0, and: 1 },
  featured: { _end: 0, _start: 0, in: 1 },
  have: { _end: 0, _start: 0, featured: 1 },
  in: { _end: 0, _start: 0, culture: 1 },
  prehistoric: { _end: 0, _start: 0, times: 1 },
  since: { _end: 0, _start: 0, prehistoric: 1 },
  times: { _end: 1, _start: 0 },
}
```
Each number represents the sum of occurrences.

startgram | endgram | bigrams
--------- | ------- | -------
"birds" | "times" | _all remaining keys_ ("have **featured**", "featured **in**", etc.)

#### Input
user-defined parameter | type | implements | intermediate transformations
---------------------- | ---- | ---------- | ----------------------------
`document` | [String][mdn string] | [compromise(`document`)][npm compromise] | [normalization][compromise normalization], [rule-based text parsing][wikipedia rule-based system]

#### Return value
type | description
---- | -----------
[Object][mdn object] | distributions of unigrams to startgrams, endgrams, and following bigrams

##### Signature
```es6
// pseudocode (does not run)
ngramsDistribution(document) => ({
  ...unigrams: {
    ...{ ...bigram: bigramsDistribution },
    _end: endgramsDistribution,
    _start: startgramsDistribution,
  },
});
```

### sentences(document)(seed)
#### sentences({ document[, count][, seed] })
_[**Generate text sentences**][wikipedia markov text generators] from a Markov process._

Potential applications: [Natural language generation][wikipedia natural language generation]

#### Examples
##### One sentence, nondeterministic
```es6
const oneSentence = sentences('birds have featured in culture and art since prehistoric times');

oneSentence();
// output: TODO

oneSentence();
// output: TODO
```

##### One sentence, deterministic
```es6
const oneSentence = sentences('birds have featured in culture and art since prehistoric times');

oneSentence(1);
// output: TODO

oneSentence(2);
// output: TODO
```

##### Multiple sentences
```es6
sentences({
  count: 5,
  document: 'birds have featured in culture and art since prehistoric times',
  seed: 1,
});

// output: TODO
```

* [test with RunKit][runkit markovian-nlp]

#### Input
user-defined parameter | type | optional | default value | implements | description
---------------------- | ---- | -------- | ------------- | ---------- | -----------
`document`, `options.document` | [String][mdn string] | false | | [compromise(`document`)][npm compromise] | Text.
`seed`, `options.seed` | [Number][mdn number] | true | `undefined` | [Chance(`seed`)][chance seed] | Leave `undefined` (default) for nondeterministic results, or specify `seed` for deterministic results.
`options` | [Object][mdn object] | true | | |
`options.count` | [Number][mdn number] | true |`1` | | Number of sentences to output.

#### Return value
type | description
---- | -----------
[Array][mdn array][[Strings][mdn string]...] | generated sentences

[chance seed]: https://chancejs.com/usage/seed.html
    (chance: seed usage)
[compromise normalization]: https://github.com/spencermountain/compromise/wiki/How-it-Works#3-normalization
    (compromise wiki: How normalization works)
[markovian-nlp license]: LICENSE
    (markovian-nlp license)
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
[runkit markovian-nlp]: https://npm.runkit.com/markovian-nlp
    (RunKit+npm: test markovian-nlp)
[shields license]: https://img.shields.io/npm/l/markovian-nlp.svg
[shields npm]: https://img.shields.io/npm/v/markovian-nlp.svg
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
[wikipedia rule-based system]: https://en.wikipedia.org/wiki/Rule-based_system
    (Wikipedia: Rule-based system)
