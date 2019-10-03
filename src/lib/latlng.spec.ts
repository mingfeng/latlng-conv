// tslint:disable:no-expression-statement
import test from 'ava';
import { dd2ddm, dd2dms, ddm2dd, dms2dd, format, parse } from './latlng';

test('dd2ddm', t => {
  t.deepEqual(dd2ddm(10.1234), { degrees: 10, minutes: 7.404 });
  t.deepEqual(dd2ddm(-10.1234), { degrees: 10, minutes: 7.404 });
  t.deepEqual(dd2ddm(10.1234, 'lat'), {
    degrees: 10,
    minutes: 7.404,
    direction: 'N'
  });
  t.deepEqual(dd2ddm(-10.1234, 'lat'), {
    degrees: 10,
    minutes: 7.404,
    direction: 'S'
  });
  t.deepEqual(dd2ddm(10.1234, 'lng'), {
    degrees: 10,
    minutes: 7.404,
    direction: 'E'
  });
  t.deepEqual(dd2ddm(-10.1234, 'lng'), {
    degrees: 10,
    minutes: 7.404,
    direction: 'W'
  });
  t.deepEqual(dd2ddm(10.99999999), { degrees: 11, minutes: 0 });
  t.deepEqual(dd2ddm(10.00000001), { degrees: 10, minutes: 0 });
});

test('ddm2dd', t => {
  t.is(ddm2dd({ degrees: 10, minutes: 7.404 }), 10.1234);
  t.is(ddm2dd({ degrees: 10, minutes: 7.404, direction: 'W' }), -10.1234);
  t.is(ddm2dd({ degrees: 10, minutes: 7.404, direction: 'S' }), -10.1234);
});

test('dd2dms', t => {
  t.deepEqual(dd2dms(10.1234), { degrees: 10, minutes: 7, seconds: 24.24 });
  t.deepEqual(dd2dms(-10.1234), { degrees: 10, minutes: 7, seconds: 24.24 });
  t.deepEqual(dd2dms(10.1234, 'lat'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24,
    direction: 'N'
  });
  t.deepEqual(dd2dms(-10.1234, 'lat'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24,
    direction: 'S'
  });
  t.deepEqual(dd2dms(10.1234, 'lng'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24,
    direction: 'E'
  });
  t.deepEqual(dd2dms(-10.1234, 'lng'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24,
    direction: 'W'
  });
  t.deepEqual(dd2dms(10.99999999), { degrees: 11, minutes: 0, seconds: 0 });
  t.deepEqual(dd2dms(10.00000001), { degrees: 10, minutes: 0, seconds: 0 });
});

test('dms2dd', t => {
  t.is(dms2dd({ degrees: 10, minutes: 7, seconds: 24.24 }), 10.1234);
  t.is(
    dms2dd({ degrees: 10, minutes: 7, seconds: 24.24, direction: 'W' }),
    -10.1234
  );
  t.is(
    dms2dd({ degrees: 10, minutes: 7, seconds: 24.24, direction: 'S' }),
    -10.1234
  );
  t.is(
    dms2dd({ degrees: 10, minutes: 7, seconds: 24.240032456, direction: 'S' }),
    -10.1234
  );
});

test('format', t => {
  t.is(format({ degrees: 10, minutes: 7, seconds: 24.24 }), '10° 7\' 24.24"');
  t.is(
    format({ degrees: 10, minutes: 7, seconds: 24.24, direction: 'N' }),
    '10° 7\' 24.24" N'
  );
});

test('parse', t => {
  t.deepEqual(parse('10° 7\' 24.24"'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24
  });
  t.deepEqual(parse('10° 0\' 0"'), { degrees: 10, minutes: 0, seconds: 0 });
  t.deepEqual(parse('10° 7\' 24.24" N'), {
    degrees: 10,
    minutes: 7,
    seconds: 24.24,
    direction: 'N'
  });

  const error = t.throws(() => {
    parse('10°');
  }, Error);
  t.is(error.message, 'Invalid coordinate string');
});
