[![Test](https://github.com/k-yle/name-mi/actions/workflows/ci.yml/badge.svg)](https://github.com/k-yle/name-mi/actions/workflows/ci.yml)
![Lines of code](https://img.shields.io/tokei/lines/github/k-yle/name-mi?color=green)

This is a simple tool to automatically detect te reo Māori names in [OpenStreetMap](https://openstreetmap.org) that are defined in the [`name`](https://osm.wiki/Key:name) tag but not in the [`name:mi`](https://osm.wiki/Key:name:mi) tag.

This tool will copy the [`name`](https://osm.wiki/Key:name) tag into [`name:mi`](https://osm.wiki/Key:name:mi):

```diff
  name=Motukiore
+ name:mi=Motukiore
```

How it works:

1. This tool reads an extract of [the planet file](https://planet.osm.org) for New Zealand.
2. It finds all features that have a [`name`](https://osm.wiki/Key:name) tag but no [`name:mi`](https://osm.wiki/Key:name:mi) tag
3. It runs some crude checks to filter out names that are definitely not te reo Māori
4. The remaining names are saved to a CSV file
5. A person manually checks the CSV file
6. The CSV file is converted into an [osmPatch file](https://github.com/osm-nz/linz-address-import/blob/main/SPEC.md), which copies the [`name`](https://osm.wiki/Key:name) tag into [`name:mi`](https://osm.wiki/Key:name:mi)
7. A person uploads the [osmPatch file](https://github.com/osm-nz/linz-address-import/blob/main/SPEC.md) to OSM

The tool was first run in August 2023, and [circa 4,000](https://taginfo.osm.org/keys/name:mi#chronology) `name:mi` tags were added. About 900 false positives were ignored.
It could be useful to run this tool again in the future, perhaps a few times per year.
