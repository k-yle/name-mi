import { promises as fs } from 'node:fs';
import pbf2json, { Item } from 'pbf2json';
import through from 'through2';
import { allNamesFile, planetFile } from './util/files';
import { AllNamesFile } from './util/types';

async function main() {
  const out: AllNamesFile = {};

  console.log('Querying planet...');
  await new Promise<void>((resolve, reject) => {
    let index = 0;

    pbf2json
      .createReadStream({
        file: planetFile,
        tags: ['name'],
        leveldb: '/tmposm',
      })
      .pipe(
        through.obj((item: Item, _, next) => {
          if (!(index % 100)) process.stdout.write('.');
          index += 1;

          // extract every feature that has a name tag but no name:mi tag
          const name = item.tags.name;
          const nameMi = item.tags['name:mi'];

          // ignore roads, since that elimates a significant chunk of the
          // database and almost all roads have an english suffix anyway.
          const shouldSkip = !!item.tags.highway;

          if (name && !nameMi && !shouldSkip) {
            const coords = item.type === 'node' ? item : item.centroid;

            out[name] ||= [];
            out[name].push({
              id: item.id,
              type: item.type,
              lat: +coords.lat,
              lng: +coords.lon,
            });
          }

          next();
        }),
      )
      .on('finish', () => {
        resolve();
        console.log(`\n\tdone (${index})`);
      })
      .on('error', reject);
  });

  await fs.writeFile(allNamesFile, JSON.stringify(out));
}

main();
