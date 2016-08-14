import ANode from './ANode';

/**
 * A heading in the document.
 * @extends ANode
 */
export default class HeadingNode extends ANode<string> {
  /**
   * Constructs a HeadingNode.
   * @method constructor
   * @param  {string} content The content of this node.
   * @param  {number} level_ The heading level of the content in this node.
   * @param  {INode<any> | null} opt_parent The parent node of this node. Defaults to {@code null}.
   * @param  {INode<any>[]} opt_children The child nodes of this node. Defaults to an empty array.
   */
  constructor(content: string, private level_: number, opt_parent = null, opt_children = []) {
    super(content, opt_parent, opt_children);
  }

  /**
   * Returns the heading level of the content in this node.
   * @method getLevel
   * @return {number} The heading level.
   */
  getLevel(): number { return this.level_; }

  /**
   * Sets the heading level of the content in this node.
   * @method setLevel
   * @param  {number} l The heading level to be set.
   * @return {this} {@code this}, for chaining.
   */
  setLevel(l: number): this {
    this.level_ = l;
    return this;
  }
}
