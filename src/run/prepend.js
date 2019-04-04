import * as R from 'ramda';

import copy from './copy';
import isNumber from '../utils/isNumber';
import prependIndices from '../indices/prepend';
import glyphFromCodePoint from '../glyph/fromCodePoint';

/**
 * Prepend glyph to run
 *
 * @param  {Object}  glyph
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const prependGlyph = (glyph, run) => {
  const glyphLength = R.length(glyph.codePoints);

  return R.evolve({
    end: R.add(glyphLength),
    glyphIndices: prependIndices(glyphLength),
    glyphs: R.prepend(glyph),
    positions: R.prepend({ xAdvance: glyph.advanceWidth })
  })(run);
};

/**
 * Prepend glyph or code point on run
 *
 * @param  {Object | number}  glyph | codePoint
 * @param  {Object}  run
 * @return {Object} run with glyph
 */
const prepend = (value, run) => {
  if (!value) return copy(run);

  const font = R.path(['attributes', 'font'], run);
  const glyph = isNumber(value) ? glyphFromCodePoint(value, font) : value;

  return prependGlyph(glyph, run);
};

export default R.curryN(2, prepend);