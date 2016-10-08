import IProcessor from './IProcessor';

import BlockNode from '../ast/BlockNode';
import CodeNode, { BLOCK_TYPE } from '../ast/CodeNode';

/**
 * Detects indented code.
 *
 * @export
 * @class IndentedCodeDetector
 * @implements {IProcessor<BlockNode, CodeNode>}
 */
export default class IndentedCodeDetector implements IProcessor<BlockNode, CodeNode> {
  process(node: BlockNode): CodeNode | null {
    const nodeContent = node.getContent();
    if (nodeContent.substring(0, 4).trim().length === 0) {
      return new CodeNode(nodeContent.substring(4, nodeContent.length), BLOCK_TYPE.Indented);
    } else {
      return null;
    }
  }
}
