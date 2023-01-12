
/* IMPORT */

import U8 from 'uint8-encoding';
import {ALPHABET_ICHARS, ALPHABET_CODES} from './constants';
import {MASK1, MASK2, MASK3, MASK4} from './constants';
import {IMASK1, IMASK2, IMASK3} from './constants';
import is from './is';

/* MAIN */

const Browser = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    const reminder = ( data.length % 3 );
    const length = ( Math.ceil ( data.length / 3 ) * 4 ) - ( reminder === 1 ? 2 : reminder === 2 ? 1 : 0 );
    const u8 = new Uint8Array ( length );

    for ( let i = 0, j = 0, l = data.length; i < l; i += 3 ) {

      const byte1 = data[i] | 0;
      const byte2 = data[i + 1] | 0;
      const byte3 = data[i + 2] | 0;
      const bytes = ( byte1 << 16 ) | ( byte2 << 8 ) | byte3;

      const code1 = ( bytes & MASK1 ) >> 18;
      const code2 = ( bytes & MASK2 ) >> 12;
      const code3 = ( bytes & MASK3 ) >> 6;
      const code4 = ( bytes & MASK4 );

      u8[j++] = ALPHABET_CODES[code1];
      u8[j++] = ALPHABET_CODES[code2];
      u8[j++] = ALPHABET_CODES[code3];
      u8[j++] = ALPHABET_CODES[code4];

    }

    return U8.decode ( u8 );

  },

  encodeStr: ( data: string ): string => {

    return Browser.encode ( U8.encode ( data ) );

  },

  decode: ( data: string ): Uint8Array => {

    const reminder = ( data.length % 4 );
    const length = ( Math.ceil ( data.length / 4 ) * 3 ) - ( reminder === 2 ? 2 : reminder === 3 ? 1 : 0 );
    const u8 = new Uint8Array ( length );

    for ( let i = 0, j = 0, l = data.length; i < l; i += 4 ) {

      const char1 = data[i];
      const char2 = data[i + 1];
      const char3 = data[i + 2];
      const char4 = data[i + 3];

      const code1 = ( ALPHABET_ICHARS[char1] | 0 ) << 18;
      const code2 = ( ALPHABET_ICHARS[char2] | 0 ) << 12;
      const code3 = ( ALPHABET_ICHARS[char3] | 0 ) << 6;
      const code4 = ( ALPHABET_ICHARS[char4] | 0 );

      const bytes = code1 | code2 | code3 | code4;
      const byte1 = ( bytes & IMASK1 ) >> 16;
      const byte2 = ( bytes & IMASK2 ) >> 8;
      const byte3 = ( bytes & IMASK3 );

      u8[j++] = byte1;
      u8[j++] = byte2;
      u8[j++] = byte3;

    }

    return u8;

  },

  decodeStr: ( data: string ): string => {

    return U8.decode ( Browser.decode ( data ) );

  },

  is

};

/* EXPORT */

export default Browser;
