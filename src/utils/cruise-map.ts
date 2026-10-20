export type CruiseMapCoord = {
  lat: number;
  lng: number;
  title?: string;
};

export type CruiseMapLine = {
  title?: string;
  points: CruiseMapCoord[];
};

type CruiseMap = {
  points?: CruiseMapCoord[];
  line?: CruiseMapCoord[];
  lines?: { title?: string; points?: CruiseMapCoord[] }[];
} | undefined;

/**
 * Pins (stations, ports) are separate from tracks. A cruise can use either,
 * both, or neither.
 */
export function cruiseMapPoints(map: CruiseMap): CruiseMapCoord[] {
  return map?.points ?? [];
}

/**
 * One cruise can have several polylines (two legs, two GO-SHIP lines).
 * Older files stored a single track on `map.line`; still read that if
 * `map.lines` is empty so those pages keep drawing.
 */
export function cruiseMapLines(map: CruiseMap): CruiseMapLine[] {
  const groups = (map?.lines ?? [])
    .map((line) => ({
      title: line.title,
      points: line.points ?? [],
    }))
    .filter((line) => line.points.length > 1);

  if (groups.length > 0) return groups;

  const legacy = map?.line ?? [];
  return legacy.length > 1 ? [{ points: legacy }] : [];
}

export function cruiseHasMap(map: CruiseMap): boolean {
  return cruiseMapPoints(map).length > 0 || cruiseMapLines(map).length > 0;
}
