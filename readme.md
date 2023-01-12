# Radix64url Encoding

Radix64url encoding, a.k.a. Base64url encoding. An extremely fast and synchronous JS implementation.

## Install

```sh
npm install --save radix64url-encoding
```

## Usage

```ts
import Radix64url from 'radix64url-encoding';

// Uint8Array encoding & decoding

{
  const raw = 'Hello 😃';
  const uint8 = new TextEncoder ().encode ( raw );
  console.log ( uint8 ); // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]

  const encoded = Radix64url.encode ( uint8 );
  console.log ( encoded ); // => 'SGVsbG8g8J-Ygw'

  const decoded = Radix64url.decodeStr ( encoded );
  console.log ( decoded ); // => Uint8Array(10) [ 72, 101, 108, 108, 111,  32, 240, 159, 152, 131 ]
}

// String encoding & decoding

{
  const raw = 'Hello 😃';
  const encoded = Radix64url.encodeStr ( raw );
  console.log ( encoded ); // => 'SGVsbG8g8J-Ygw'

  const decoded = Radix64url.decodeStr ( encoded );
  console.log ( decoded ); // => 'Hello 😃'
}

// Check if a string is radix64url-encoded

{
  console.log ( Radix64url.is ( 'SGVsbG8g8J-Ygw' ) ); // => true
  console.log ( Radix64url.is ( '😃' ) ); // => false
}
```

## License

MIT © Fabio Spampinato
