import IProcessor from './IProcessor';

import BlockNode from '../ast/BlockNode';
import CodeNode, { BLOCK_TYPE } from '../ast/CodeNode';

/**
 * Detects fenced code blocks.
 *
 * @export
 * @class FencedCodeDetector
 * @implements {IProcessor<BlockNode, CodeNode>}
 */
export default class FencedCodeDetector implements IProcessor<BlockNode, CodeNode> {
  private INFO_STRING_PREFIX = 'language';

  process(node: BlockNode): CodeNode | null {
    const nodeContent = node.getContent();

    // A valid fence starts with either a tilde or a backtick.
    const fenceChar = nodeContent.trim().charAt(0);
    if (fenceChar === '`' || fenceChar === '~') {
      // Allow no more than 3 leading spaces in front of the fence start.
      const fenceStart = nodeContent.substring(0, 4).indexOf(fenceChar);
      if (fenceStart !== -1) {
        const fenceEnd = nodeContent.lastIndexOf(fenceChar);
        const fenceString = nodeContent.substring(fenceStart, fenceEnd + 1);

        // All characters in the fence must be the same.
        if (fenceString === fenceChar.repeat(fenceString.length)) {
          // The info string is everything that follows after the end of the
          // code fence.
          const infoString =
            this.checkAndGetInfoString(
              nodeContent.substring(fenceEnd + 1), fenceChar);

          if (infoString !== null) {
            return new CodeNode('', BLOCK_TYPE.Fenced, infoString, fenceStart);
          }
        }
      }
    }

    return null;
  }

  /**
   * Extracts the info string from the provided info string candidate, taking
   * into account the type of fence character. If the fence character is a
   * backtick, it additionally checks that the info string does not contain a
   * backtick.
   *
   * @param  {string} candidate The info string candidate.
   * @param  {string} fenceChar The fence character.
   * @return {string | null} The info string, or null if the backtick check
   *  fails.
   */
  private checkAndGetInfoString(candidate: string, fenceChar?: string): string | null {
    // Trim spaces and extract the first word.
    const rawInfoString = candidate.trim().split(' ', 1)[0];

    let isValidInfoString = true;
    if (fenceChar === '`') {
      // The info string for backtick code blocks cannot contain backticks.
      isValidInfoString = !rawInfoString.includes(fenceChar);
    }

    if (isValidInfoString) {
      return rawInfoString ? `${this.INFO_STRING_PREFIX}-${rawInfoString}` : '';
    } else {
      return null;
    }
  }
}
