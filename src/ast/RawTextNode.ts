import ANode from './ANode';
import DocumentRootNode from './DocumentRootNode';

/**
 * No-op node for raw, unprocessed text, used only for compliance with the type purity of the processing pipeline.
 * A {@code RawTextNode} should not contain any children, and can only have a {@code DocumentRootNode} as its parent, if any.
 * @extends ANode
 */
export default class RawTextNode extends ANode<string> {
  /**
   * Constructs a RawTextNode.
   * @method constructor
   * @param  {string} content The content of this raw text node.
   * @param  {DocumentRootNode | null} opt_parent The parent node of this node. Defaults to {@code null}.
   */
  constructor(content: string, opt_parent: DocumentRootNode | null = null) {
    super(content, opt_parent, []);
  }
}
