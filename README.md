# latlng-conv

Latitude and longitude coordinates converter.

[API Docs](https://mingfeng.github.io/latlng-conv/)

## Examples

### dd2dms

Convert a coordinate in decimal degrees (DD) to degrees, minutes and seconds (DMS).

```javascript
import { dd2dms } from 'latlng-conv'
console.log(dd2dms(10.1234))
// => {degrees: 10, minutes: 7, seconds: 24.24}
console.log(dd2dms(10.1234, 'lat'))
// => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
console.log(dd2dms(-10.1234, 'lng'))
// => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'W'}
```

### dms2dd

Convert a coordinate in degrees, minutes and seconds (DMS) to decimal degrees (DD).

```javascript
import { dms2dd } from 'latlng-conv'
console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24}))
// => 10.1234
console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
// => 10.1234
console.log(dms2dd({degrees: 10, minutes: 7, seconds: 24.24, direction: 'S'}))
// => -10.1234
```

### format

Create a string representation of a coordinate

```javascript
import { format } from 'latlng-conv'
console.log(format({degrees: 10, minutes: 7, seconds: 24.24}))
// => 10° 7' 24.24"
console.log(format({degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}))
// => 10° 7' 24.24" N
```

### parse

Parse a coordinate string and extract degrees, minutes, seconds and direction from it.

```javascript
import { parse } from 'latlng-conv'
console.log(parse('10° 7\' 24.24"'))
// => {degrees: 10, minutes: 7, seconds: 24.24}
console.log(parse('10° 0\' 0"'))
// => {degrees: 10, minutes: 0, seconds: 0}
console.log(parse('10° 7\' 24.24" N'))
// => {degrees: 10, minutes: 7, seconds: 24.24, direction: 'N'}
```
