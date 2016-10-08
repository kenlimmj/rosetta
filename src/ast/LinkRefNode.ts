import ANode from './ANode';

/**
 * A link reference in the document.
 *
 * @export
 * @class LinkRefNode
 * @extends {ANode<string>}
 */
export default class LinkRefNode extends ANode<string> {
  constructor(
    private label: string,
    url: string,
    private title?: string,
    parent = undefined) {
    super(url, parent, []);
  }

  /**
   * Returns the link label.
   *
   * @returns {string} The link label.
   *
   * @memberOf LinkRefNode
   */
  getLabel(): string { return this.label; }

  /**
   * Returns the link title, if any.
   *
   * @returns {(string | undefined)} The link title.
   *
   * @memberOf LinkRefNode
   */
  getTitle(): string | undefined { return this.title; }

  /**
   * Sets the link label.
   *
   * @param {string} l The label to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf LinkRefNode
   */
  setLabel(l: string): this {
    this.label = l;
    return this;
  }

  /**
   * Sets the link title.
   *
   * @param {string} t The title to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf LinkRefNode
   */
  setTitle(t: string): this {
    this.title = t;
    return this;
  }
}
