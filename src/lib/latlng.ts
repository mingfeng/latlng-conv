import { Direction, DMS, LatOrLng } from './types';

const DEGREE_PRECISION_FACTOR = 1e7;
const MINUTE_PRECISION_FACTOR = 1e6;
const SECOND_PRECISION_FACTOR = 1e4;

/**
 * Convert a coordinate in decimal degrees (DD) to degrees, minutes and seconds (DMS).
 *
 * ### Example (es module)
 * ```js
 * import { dd2dms } from 'latlng-conv'
 * console.log(dd2dms(10.1234))
 * // => {degrees: 10, minutes: 7, seconds: 24.24}
 * console.log(dd2dms(10.1234, 'lat'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
 * console.log(dd2dms(-10.1234, 'lng'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'W'}
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var dd2dms = require('latlng-conv').dd2dms;
 * console.log(dd2dms(10.1234))
 * // => {degrees: 10, minutes: 7, seconds: 24.24}
 * console.log(dd2dms(10.1234, 'lat'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
 * console.log(dd2dms(-10.1234, 'lng'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'W'}
 * ```
 *
 * @param value A decimal degree coordinate
 * @param latOrLng The type of the coordinate, 'lat' or 'lng'
 * @returns A coordinate in degrees, minutes and seconds
 */
export function dd2dms(value: number, latOrLng?: LatOrLng): DMS {
  const absValue = Math.abs(value);
  const degrees = Math.round(absValue * DEGREE_PRECISION_FACTOR) / DEGREE_PRECISION_FACTOR;
  const minutes = Math.round(degrees % 1 * 60 * MINUTE_PRECISION_FACTOR) / MINUTE_PRECISION_FACTOR;
  const seconds = Math.round(minutes % 1 * 60 * SECOND_PRECISION_FACTOR) / SECOND_PRECISION_FACTOR;
  const dms = {
    degrees: Math.floor(degrees),
    minutes: Math.floor(minutes),
    seconds,
  };

  return latOrLng ? {
    ...dms,
    direction: (latOrLng === 'lat') ? (value > 0 ? 'N' : 'S') : (value > 0 ? 'E' : 'W'),
  } : dms;
}

/**
 * Convert a coordinate in degrees, minutes and seconds (DMS) to decimal degrees (DD).
 *
 * ### Example (es module)
 * ```js
 * import { dms2dd } from 'latlng-conv'
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24}))
 * // => 10.1234
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
 * // => 10.1234
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'S'}))
 * // => -10.1234
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var dms2dd = require('latlng-conv').dms2dd;
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24}))
 * // => 10.1234
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
 * // => 10.1234
 * console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'S'}))
 * // => -10.1234
 * ```
 *
 * @param dms A coordinate in degrees, minutes and seconds
 * @returns A coordinate in decimal degrees
 */
export function dms2dd(dms: DMS): number {
  const { degrees, minutes, seconds, direction } = dms;
  const directionMultiplier = direction === 'W' || direction === 'S' ? -1 : 1;
  return directionMultiplier * Math.round((
    degrees + minutes / 60 + seconds / 3600
  ) * DEGREE_PRECISION_FACTOR) / DEGREE_PRECISION_FACTOR;
}

/**
 * Create a string representation of a coordinate
 *
 *  * ### Example (es module)
 * ```js
 * import { format } from 'latlng-conv'
 * console.log(format({degrees: 10, minutes: 7, seconds: 24.24}))
 * // => 10° 7' 24.24"
 * console.log(format({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
 * // => 10° 7' 24.24" N
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var format = require('latlng-conv').format;
 * console.log(format({degrees: 10, minutes: 7, seconds: 24.24}))
 * // => 10° 7' 24.24"
 * console.log(format({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
 * // => 10° 7' 24.24" N
 * ```
 *
 * @param dms A coordinate in degrees, minutes and seconds
 * @returns A string representation of dms coordinate
 */
export function format(dms: DMS): string {
  const { degrees, minutes, seconds, direction } = dms;
  return direction ? `${degrees}° ${minutes}' ${seconds}" ${direction}` : `${degrees}° ${minutes}' ${seconds}"`;
}

/**
 * Parse a coordinate string and extract degrees, minutes, seconds and direction
 * from it.
 *
 * The coordinate string must be formatted as, for example, 10° 7' 24.24" N,
 * otherwise an error will be thrown.
 *
 *  * ### Example (es module)
 * ```js
 * import { parse } from 'latlng-conv'
 * console.log(parse('10° 7\' 24.24"'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24}
 * console.log(parse('10° 0\' 0"'))
 * // => {degrees: 10, minutes: 0, seconds: 0}
 * console.log(parse('10° 7\' 24.24" N'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var parse = require('latlng-conv').parse;
 * console.log(parse('10° 7\' 24.24"')
 * // => {degrees: 10, minutes: 7, seconds: 24.24}
 * console.log(parse('10° 0\' 0"'))
 * // => {degrees: 10, minutes: 0, seconds: 0}
 * console.log(parse('10° 7\' 24.24" N'))
 * // => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
 * ```
 *
 * @param coordinate A coordinate string formatted as, for example, 10° 7' 24.24" N
 * @returns Extracted degrees, minutes, seconds and direction from coordinate string
 */
export function parse(coordinate: string): DMS {
  const pattern = /^([0-1]?[0-9]?[0-9])°\s([0-5]?[0-9])'\s([0-5]?[0-9](?:.\d+)?)"\s?(N|S|E|W)?$/;
  const results = pattern.exec(coordinate);
  if (!results) {
    throw new Error('Invalid coordinate string');
  }

  const [degrees, minutes, seconds, direction] = results.slice(1, 5);
  const dms = {
    degrees: parseInt(degrees, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseFloat(seconds),
  };
  return direction ? {
    ...dms,
    direction: direction as Direction,
  } : dms;
}
