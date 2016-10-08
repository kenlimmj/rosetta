import IProcessor from '../interfaces/IProcessor';

import BlockNode from '../ast/BlockNode';
import ThematicBreakNode from '../ast/ThematicBreakNode';

/**
 * Detects thematic breaks.
 *
 * @export
 * @class ThematicBreakDetector
 * @implements {IProcessor<BlockNode, ThematicBreakNode>}
 */
export default class ThematicBreakDetector implements IProcessor<BlockNode, ThematicBreakNode> {
  process(node: BlockNode): ThematicBreakNode | null {
    const nodeContent = node.getContent();

    // Perform a quick check: There can be an indent of at most three spaces,
    // followed by a _, -, or *, in order for the thematic break to be valid.
    const checkString = nodeContent.substring(0, 4).trim();
    const breakChar = checkString.length > 0 ? checkString.charAt(0) : null;

    // TODO(kenlimmj): Match against an enum rather than the character itself.
    if (breakChar === '_' || breakChar === '-' || breakChar === '*') {
      // Tokenize the string and ignore all spaces.
      const tokens =
        nodeContent.trim().split('').filter(t => t.trim().length > 0);

      // To be a valid thematic break, there must be at least 3 occurrences of
      // the break character, and no other types of characters.
      if (tokens.every(t => t === breakChar) && tokens.length >= 3) {
        return new ThematicBreakNode(<string>breakChar)
      }
    }

    return null;
  }
}
