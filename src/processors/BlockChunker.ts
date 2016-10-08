import IProcessor from './IProcessor';

import BlockNode, { BLOCK_TYPE } from '../ast/BlockNode';
import RawTextNode from '../ast/RawTextNode';

/**
 * A processor to split raw text into blocks. Blocks are split by paragraphs breaks.
 * This does not triage blocks into container or leaf blocks. It merely detects _a_ block.
 *
 * @export
 * @class BlockChunker
 * @implements {IProcessor<RawTextNode, BlockNode>}
 */
export default class BlockChunker implements IProcessor<RawTextNode, BlockNode> {
  // Paragraph breaks are defined by two or more consecutive EOLs. The second EOL (and beyond) in
  // the sequence can be preceded by any number of whitespace or tabs. This regex matches any
  // number of whitespace/tabs, followed by two or more EOLs.
  private paragraphBreakRegex_: RegExp = /(?:[\s\t]*?(?:\n|\r|\r\n)){2,}/g;

  process(data: RawTextNode): BlockNode[] {
    return data.getContent().trim().split(this.paragraphBreakRegex_).map((t, idx) => {
      return new BlockNode(t, BLOCK_TYPE.Unknown, idx);
    });
  }
}
