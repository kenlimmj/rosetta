import ANode from './ANode';
import DocumentRootNode from './DocumentRootNode';

/**
 * No-op node for raw, unprocessed text, used only for compliance with the type
 * purity of the processing pipeline. A {@code RawTextNode} should not contain
 * any children, and can only have a {@code DocumentRootNode} as its parent, if
 * any.
 *
 * @export
 * @class RawTextNode
 * @extends {ANode<string>}
 */
export default class RawTextNode extends ANode<string> {
  constructor(content: string, parent?: DocumentRootNode) {
    super(content, parent, []);
  }
}
