import ANode from './ANode';

/**
 * A heading in the document.
 *
 * @extends ANode
 */
export default class HeadingNode extends ANode<string> {
  constructor(content: string, private level: number, opt_parent = null, opt_children = []) {
    super(content, opt_parent, opt_children);
  }

  /**
   * Returns the heading level of the content in this node.
   * @method getLevel
   * @return {number} The heading level.
   */
  getLevel(): number { return this.level; }

  /**
   * Sets the heading level of the content in this node.
   * @method setLevel
   * @param  {number} l The heading level to be set.
   * @return {this} {@code this}, for chaining.
   */
  setLevel(l: number): this {
    this.level = l;
    return this;
  }
}
