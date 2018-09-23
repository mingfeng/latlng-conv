import { DMS, LatOrLng } from './types';

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
