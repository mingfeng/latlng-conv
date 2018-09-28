export type Direction = 'N' | 'S' | 'E' | 'W';

export interface DMS {
  readonly degrees: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly direction?: Direction;
}

export type DecimalCoordinates = [number, number];

export type DMSCoordinates = [string, string];

export type LatOrLng = 'lat' | 'lng';
