import ANode from './ANode';
import INode from './INode';

/**
 * The root of a document. This node stores all document-wide metadata, and cannot have a parent.
 * @extends ANode
 */
export default class DocumentRootNode extends ANode<Object> {
  /**
   * Constructs a DocumentRootNode.
   * @method constructor
   * @param  {Object} content The document metadata. Defaults to an empty object.
   * @param  {INode<any>[]} opt_children The child nodes of this node. Defaults to an empty array.
   */
  constructor(content: Object = {}, opt_children: INode<any>[] = []) {
    super(content, null, opt_children);
  }
}
