// tslint:disable:no-expression-statement
import test from 'ava';
import { dd2dms, dms2dd } from './latlng';

test('dd2dms', t => {
  t.deepEqual(dd2dms(10.1234), {degrees: 10, minutes: 7, seconds: 24.24});
  t.deepEqual(dd2dms(-10.1234), {degrees: 10, minutes: 7, seconds: 24.24});
  t.deepEqual(dd2dms(10.1234, 'lat'), {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'});
  t.deepEqual(dd2dms(-10.1234, 'lat'), {degrees: 10, minutes: 7, seconds: 24.24, direction: 'S'});
  t.deepEqual(dd2dms(10.1234, 'lng'), {degrees: 10, minutes: 7, seconds: 24.24, direction: 'E'});
  t.deepEqual(dd2dms(-10.1234, 'lng'), {degrees: 10, minutes: 7, seconds: 24.24, direction: 'W'});
  t.deepEqual(dd2dms(10.99999999), {degrees: 11, minutes: 0, seconds: 0});
  t.deepEqual(dd2dms(10.00000001), {degrees: 10, minutes: 0, seconds: 0});
});

test('dms2dd', t => {
  t.is(dms2dd({degrees: 10, minutes: 7, seconds: 24.24}), 10.1234);
  t.is(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'W'}), -10.1234);
  t.is(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'S'}), -10.1234);
  t.is(dms2dd({degrees: 10, minutes: 7, seconds: 24.240032456, direction: 'S'}), -10.1234);
});
