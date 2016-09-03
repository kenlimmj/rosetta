import ANode from './ANode';

/**
 * The root of a document. This node stores all document-wide metadata, and cannot have a parent.
 * @extends ANode
 */
export default class DocumentRootNode extends ANode<Object> {
  constructor(content: Object = {}, opt_children = []) {
    super(content, null, opt_children);
  }
}
