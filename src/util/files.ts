import { join } from 'node:path';

export const planetFile = join(__dirname, '../../temp/osm.pbf');
export const allNamesFile = join(__dirname, '../../temp/osm.json');

export const likelyFile = join(__dirname, '../../temp/likely.csv');
export const veryLikelyFile = join(__dirname, '../../temp/veryLikely.csv');

export const osmPatchFile = join(__dirname, '../../temp/out.osmPatch.geo.json');
