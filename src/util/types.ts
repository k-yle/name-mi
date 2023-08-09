import type { OsmFeatureType } from 'osm-api';
import type { FeatureCollection, Geometry } from 'geojson';

export type AllNamesFile = {
  [name: string]: {
    lat: number;
    lng: number;
    type: OsmFeatureType;
    id: number;
  }[];
};

export type Tags = Record<string, string>;

export type OsmPatch = FeatureCollection<Geometry, Tags> & {
  size: string;
  changesetTags: Tags;
};
