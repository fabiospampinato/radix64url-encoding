
/* IMPORT */

import fc from 'fast-check';
import {describe} from 'fava';
import {Buffer} from 'node:buffer';
import Radix64urlBrowser from '../dist/browser.js';
import Radix64urlNode from '../dist/node.js';
import Fixtures from './fixtures.js';

/* MAIN */

describe ( 'Radix64url', () => {

  for ( const [Radix64url, name] of [[Radix64urlBrowser, 'browser'], [Radix64urlNode, 'node']] ) {

    describe ( name, it => {

      it ( 'returns an actual Uint8Array', t => {

        t.is ( Radix64url.decode ( 'Zm9v' ).constructor, Uint8Array );

      });

      it ( 'works with strings', t => {

        for ( const fixture of Fixtures ) {

          const encoded = Radix64url.encodeStr ( fixture );
          const decoded = Radix64url.decodeStr ( encoded );

          t.is ( decoded, fixture );

        }

      });

      it ( 'works with Uint8Arrays', t => {

        const encoder = new TextEncoder ();

        for ( const fixture of Fixtures ) {

          const fixtureU8 = encoder.encode ( fixture );

          const encoded = Radix64url.encode ( fixtureU8 );
          const decoded = Radix64url.decode ( encoded );

          t.deepEqual ( decoded, fixtureU8 );

        }

      });

      it ( 'works with fc-generated strings', t => {

        const assert = str => t.true ( !Radix64url.is ( str ) || ( Radix64url.decodeStr ( Radix64url.encodeStr ( str ) ) === str ) );
        const property = fc.property ( fc.fullUnicodeString (), assert );

        fc.assert ( property, { numRuns: 1000000 } );

      });

      it ( 'works like Buffer', t => {

        const assert = str => Radix64url.is ( str ) ? t.deepEqual ( Radix64url.encodeStr ( str ), Buffer.from ( str ).toString ( 'base64url' ) ) : t.pass ();
        const property = fc.property ( fc.fullUnicodeString (), assert );

        fc.assert ( property, { numRuns: 1000000 } );

      });

      it ( 'can detect radix64url-encoded strings', t => {

        const fixtures = [
          ['', true],
          ['a', true],
          ['ab', true],
          ['abc', true],
          ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', true],
          ['+', false],
          ['/', false],
          ['====', false],
          ['a===', false],
          ['aa==', false],
          ['aaa=', false],
          ['aaaa', true],
          ['=aaa', false],
          ['==aa', false],
          ['===a', false],
          ['\uffff\uffff\uffff\uffff', false],
          ['😃', false],
          ['👪', false]
        ];

        for ( const [fixture, result] of fixtures ) {

          t.is ( Radix64url.is ( fixture ), result );

        }

      });

    });

  }

});
