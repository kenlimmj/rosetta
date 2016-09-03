import IProcessor from './IProcessor';

import BlockNode from '../ast/BlockNode';
import CodeNode, { BLOCK_TYPE } from '../ast/CodeNode';

export default class FencedCodeDetector implements IProcessor<BlockNode, CodeNode> {
  process(node: BlockNode): CodeNode | null {
    const nodeContent = node.getContent();

    const fenceChar = nodeContent.trim().charAt(0);
    const fenceStart = nodeContent.substring(0, 4).indexOf(fenceChar);

    if (fenceStart !== -1) {
      const fenceEnd = nodeContent.lastIndexOf(fenceChar);
    } else {
      return null;
    }
  }
}
