import {
  anyNonTeReoLetters,
  englishPrefixesRegExp,
  englishSuffixesRegExp,
} from './english';

/**
 * The higher the rank, the more likely we think the
 * name could be in te reo māori.
 *
 * A person will still need to manually review each
 * name, but this allows the reviewer to look at the
 * most likely names first, since they're much faster
 * to review.
 */
export function rankName(name: string) {
  if (anyNonTeReoLetters.test(name)) return -5; // very unlikely

  if (englishPrefixesRegExp.test(name) || englishSuffixesRegExp.test(name)) {
    return -4; // very unlikely
  }

  if (/(^| )thai( |$)/i.test(name)) return -1; // unlikely

  // unlikely, ends with a single capital letter
  // e.g. "Pier F" or "Ōtāhuhu - Middlemore B" (high voltage powerline)
  if (/ [A-Z]$/.test(name)) return -1.1;

  // unlikely, starts with a single capital letter that's not O
  // There are lots of survey markers like this
  if (/^[A-NP-Z] /.test(name)) return -1.2;

  // unlikely, ends with mart, e.g. supermart, minimart
  if (/mart$/i.test(name)) return -1.3;

  if (/[āēīōū]/i.test(name)) return 1; // likely

  if (
    name.endsWith(' Marae') ||
    name.endsWith(' Pa') ||
    name.endsWith(' Pā') ||
    name.startsWith('Te ')
  ) {
    return 2; // very likely
  }

  return 0; // 0 is neutral
}
