// te reo only has 15 letters, not 26, so this a simple first check

import { promises as fs } from 'node:fs';
import { allNamesFile, likelyFile, veryLikelyFile } from './util/files';
import { rankName } from './util/rankName';
import { AllNamesFile } from './util/types';

const toCsv = (rows: string[]) => `\uFEFF${rows.join('\n')}`;

async function main() {
  const allNames: AllNamesFile = JSON.parse(
    await fs.readFile(allNamesFile, 'utf8'),
  );

  console.log('Total', Object.keys(allNames).length);

  const namesToConsider = Object.keys(allNames).filter(
    (name) => name.length > 4,
  );

  const ranked = namesToConsider
    .map((name) => ({
      name,
      rank: rankName(name),
      count: allNames[name].length,
    }))
    .sort((a, b) => b.count - a.count);

  const likely = ranked.filter((x) => x.rank === 0);
  const veryLikely = ranked.filter((x) => x.rank > 0);

  console.log('likely', likely.length);
  console.log('veryLikely', veryLikely.length);

  await fs.writeFile(
    likelyFile,
    toCsv(likely.map((x) => `${x.count},${x.name}`)),
  );
  await fs.writeFile(
    veryLikelyFile,
    toCsv(veryLikely.map((x) => `${x.count},${x.name}`)),
  );
}

main();
