import { ENGLISH_PREFIXES, ENGLISH_SUFFIXES } from './englishData.json';

// eslint-disable-next-line unicorn/better-regex -- it's more clear written out like this
export const anyNonTeReoLetters = /[^-ghkmnprtw aeiouāēīōū]/i;

export const englishPrefixesRegExp = new RegExp(
  `^(${ENGLISH_PREFIXES.join('|')}) `,
  'i',
);
export const englishSuffixesRegExp = new RegExp(
  ` (${ENGLISH_SUFFIXES.join('|')})$`,
  'i',
);
