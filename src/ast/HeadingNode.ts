import ANode from './ANode';

/**
 * A heading in the document.
 *
 * @export
 * @class HeadingNode
 * @extends {ANode<string>}
 */
export default class HeadingNode extends ANode<string> {
  constructor(content: string, private level: number, parent = undefined, children = []) {
    super(content, parent, children);
  }

  /**
   * Returns the heading level of the content in this node.
   *
   * @returns {number} The heading level.
   *
   * @memberOf HeadingNode
   */
  getLevel(): number { return this.level; }

  /**
   * Sets the heading level of the content in this node.
   *
   * @param {number} l The heading level to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf HeadingNode
   */
  setLevel(l: number): this {
    this.level = l;
    return this;
  }
}
