import IProcessor from './IProcessor';
import RawTextNode from '../ast/RawTextNode';

/**
 * Sanitizes text before it is passed on to the rest of the processors.
 *
 * @export
 * @class Sanitizer
 * @implements {IProcessor<RawTextNode, RawTextNode>}
 */
export default class Sanitizer implements IProcessor<RawTextNode, RawTextNode> {
  process(data: RawTextNode): RawTextNode {
    // Replace all NULL characters with REPLACEMENT characters.
    const cleanedContent = data.getContent().replace(/\u0000/g, '\uFFDD');
    return new RawTextNode(cleanedContent);
  }
}
