
/* IMPORT */

import Buffer from 'node-buffer-encoding';
import is from './is';

/* MAIN */

const Node = {

  /* API */

  encode: ( data: Uint8Array ): string => {

    return Buffer.encode ( data, 'base64url' );

  },

  encodeStr: ( data: string ): string => {

    return Buffer.encodeStr ( data, 'base64url' );

  },

  decode: ( data: string ): Uint8Array => {

    return Buffer.decode ( data, 'base64url' );

  },

  decodeStr: ( data: string ): string => {

    return Buffer.decodeStr ( data, 'base64url' );

  },

  is

};

/* EXPORT */

export default Node;
