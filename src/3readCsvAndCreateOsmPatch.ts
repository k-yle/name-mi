import { promises as fs } from 'node:fs';
import {
  allNamesFile,
  likelyFile,
  osmPatchFile,
  veryLikelyFile,
} from './util/files';
import { AllNamesFile, OsmPatch } from './util/types';

const getIsAccepted = (cell: string) =>
  cell === '1' || cell === 'true' || cell === 'TRUE';

const parseCsv = (csv: string): string[] =>
  csv
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((row) => row.split(','))
    .filter((row) => getIsAccepted(row[2]))
    .map((row) => row[1]);

async function main() {
  const allNames: AllNamesFile = JSON.parse(
    await fs.readFile(allNamesFile, 'utf8'),
  );

  const accepted = [
    ...parseCsv(await fs.readFile(likelyFile, 'utf8')),
    ...parseCsv(await fs.readFile(veryLikelyFile, 'utf8')),
  ];

  console.log(accepted.length, 'names were accepted');

  const osmPatch: OsmPatch = {
    type: 'FeatureCollection',
    size: 'large',
    changesetTags: {
      created_by: 'https://github.com/k-yle/name-mi',
      comment: 'copy the `name` tag into `name:mi`',
    },
    features: [],
  };

  for (const name of accepted) {
    const featuresWithThisName = allNames[name];
    for (const feature of featuresWithThisName) {
      osmPatch.features.push({
        type: 'Feature',
        id: feature.type[0] + feature.id,

        // geometry is only used to cluster features to avoid
        // big changeset bboxes.
        geometry: { type: 'Point', coordinates: [feature.lng, feature.lat] },

        properties: {
          __action: 'edit',
          'name:mi': name,
        },
      });
    }
  }

  await fs.writeFile(osmPatchFile, JSON.stringify(osmPatch, null, 2));
}

main();
