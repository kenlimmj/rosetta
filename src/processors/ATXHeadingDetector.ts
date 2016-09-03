import IProcessor from './IProcessor';

import BlockNode from '../ast/BlockNode';
import HeadingNode from '../ast/HeadingNode';

/** A processor to detect heading markup in any text nodes. */
export default class ATXHeadingDetector implements IProcessor<BlockNode, HeadingNode> {
  private openSeqRegex: RegExp = /^[ ]{0,3}(#{1,6})[ ]/;

  process(node: BlockNode): HeadingNode | null {
    const nodeContent = node.getContent();
    if (!this.containsATXHeadingAndTrailingSpace_(nodeContent)) {
      if (nodeContent === this.generateATXHeadingFromLevel_(nodeContent.length)) {
        // If the content is solely comprised of an ATX heading and nothing else,
        // it can still be a valid but empty heading node.
        return new HeadingNode('', nodeContent.length);
      } else {
        // No-op if the node does not contain an opening ATX heading.
        return null;
      }
    } else {
      const openMatch = this.openSeqRegex.exec(nodeContent);
      if (openMatch) {
        // Extract the content that comes after the opening ATX heading.
        const restContent = nodeContent.substring(openMatch.index + openMatch[0].length);

        // The heading level is the number of '#' in the capture group.
        const headingLevel = openMatch[1].trim().length;
        const headingContent = this.maybeRemoveClosingSeq_(restContent);

        // Ignore surrounding whitespace on the remaining heading content.
        return new HeadingNode(headingContent.trim(), headingLevel);
      } else {
        console.log(nodeContent);
        return null;
      }
    }
  }

  /**
   * Checks if a string contains a valid ATX heading.
   * @method containsATXHeadingAndTrailingSpace_
   * @param  {String} content The string to be checked.
   * @return {boolean} Whether the string contains a valid ATX heading.
   * @private
   */
  private containsATXHeadingAndTrailingSpace_(content: string): boolean {
    // The 'last chance' for the start of the string to contain a valid
    // ATX heading has to be 3 spaces, followed by a '#'.
    const containsATXHeading = content.substring(0, 4).includes('#');
    const containsTrailingSpace = content.substring(0, 7).includes('# ');
    return containsATXHeading && containsTrailingSpace;
  }

  /**
   * Removes the closing ATX heading sequence from a string if it is a valid sequence.
   * A valid sequence is any number of unescaped # characters following a space.
   * @method maybeRemoveClosingSeq_
   * @param  {string} content The content to be inspected.
   * @param  {number} headingLevel The heading level expected for the content.
   * @return {string} The content after inspection and possible removal of the closing sequence.
   * @private
   */
  private maybeRemoveClosingSeq_(content: string): string {
    const cleanedContent = content.trim();

    // A valid end sequence must be whitespace followed by at least one # character.
    const startIdxOfEndSeq = cleanedContent.lastIndexOf(' #');
    const testEndSeq = cleanedContent.substring(startIdxOfEndSeq + 2);
    const expectedEndSeq = this.generateATXHeadingFromLevel_(testEndSeq.length);

    // The ending sequence is valid if it is only all # characters.
    if (testEndSeq === expectedEndSeq) {
      return cleanedContent.substring(0, startIdxOfEndSeq);
    } else {
      return cleanedContent;
    }
  }

  /**
   * Generates a valid ATX heading sequence.
   * @method generateATXHeadingFromLevel_
   * @param  {number} headingLevel The heading level of the sequence to be generated.
   * @return {string} An ATX heading sequence.
   * @private
   */
  private generateATXHeadingFromLevel_(headingLevel: number): string {
    return '#'.repeat(headingLevel);
  }
}
