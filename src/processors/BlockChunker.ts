import { CommonMarkConstants } from '../constants';
import BlockNode from '../ast/BlockNode';
import IProcessor from './IProcessor';
import RawTextNode from '../ast/RawTextNode';

/**
 * A processor to split raw text into blocks. Blocks are split by paragraphs breaks.
 * This does not triage blocks into container or leaf blocks. It merely detects _a_ block.
 * @implements IProcessor
 */
export default class BlockChunker implements IProcessor<RawTextNode, BlockNode> {
  // Paragraph breaks are defined by two or more consecutive EOLs.
  // The second EOL (and beyond) in the sequence can be preceded by any number of whitespace or tabs.
  // This matches any number of whitespace/tabs, followed by one or more EOLs.
  private paragraphBreakRegex_: RegExp = new RegExp(`([ \t]*(${CommonMarkConstants.EOL.join('|')}))+`, 'g');

  process(data: RawTextNode): BlockNode[] {
    return data.getContent().split(this.paragraphBreakRegex_).map(t => new BlockNode(t));
  }
}
