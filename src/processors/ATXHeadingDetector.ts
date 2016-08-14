import IProcessor from './IProcessor';
import INode from '../ast/INode';
import HeadingNode from '../ast/HeadingNode';

/**
 * A processor to detect heading markup in any text nodes.
 */
export default class ATXHeadingDetector implements IProcessor<INode<string>, HeadingNode> {
  process() {

  }
}
