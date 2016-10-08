import ANode from './ANode';

/**
 * The root of a document. This node stores document-wide metadata, and cannot have a parent.
 *
 * @export
 * @class DocumentRootNode
 * @extends {ANode<Object>}
 */
export default class DocumentRootNode extends ANode<Object> {
  constructor(content: Object = {}, opt_children = []) {
    super(content, undefined, opt_children);
  }
}
