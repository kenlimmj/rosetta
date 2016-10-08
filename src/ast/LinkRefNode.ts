import ANode from './ANode';

/**
 *
 *
 * @export
 * @class LinkRefNode
 * @extends {ANode<string>}
 */
export default class LinkRefNode extends ANode<string> {
  constructor(private label: string, url: string, private title?: string, parent = undefined) {
    super(url, parent, []);
  }

  /**
   * Returns the link label.
   * @method getLabel
   * @return {string | undefined} The link label.
   */
  getLabel(): string { return this.label; }

  /**
   * Returns the link title, if any.
   * @method getTitle
   * @return {string | undefined} The link title.
   */
  getTitle(): string | undefined { return this.title; }

  /**
   * Sets the link label.
   * @method setLabel
   * @param  {string} l The label to be set.
   * @return {this} {@code this}, for chaining.
   */
  setLabel(l: string): this {
    this.label = l;
    return this;
  }

  /**
   * Sets the link title.
   * @method setTitle
   * @param  {string} t The title to be set.
   * @return {this} {@code this}, for chaining.
   */
  setTitle(t: string): this {
    this.title = t;
    return this;
  }
}
