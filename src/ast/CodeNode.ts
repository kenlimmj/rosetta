import ANode from './ANode';

export enum BLOCK_TYPE { Indented, Fenced }

/**
 * A block of code.
 *
 * @export
 * @class CodeNode
 * @extends {ANode<string>}
 */
export default class CodeNode extends ANode<string> {
  constructor(content: string, private blockType: BLOCK_TYPE,
    private infoString?: string, private indentLevel?: number,
    parent = undefined, opt_children = []) {
    super(content, parent, opt_children);
  }

  /**
   * Returns the type of the block.
   *
   * @returns {BLOCK_TYPE} The type of the block.
   *
   * @memberOf CodeNode
   */
  getBlockType(): BLOCK_TYPE { return this.blockType; }

  /**
   *Returns the info string for the block, if any.
   *
   * @returns {(string | undefined)} The info string for the block.
   *
   * @memberOf CodeNode
   */
  getInfoString(): string | undefined { return this.infoString; }

  /**
   * Returns the indent level for the block, if any.
   *
   * @returns {(number | undefined)} The indent level for the block.
   *
   * @memberOf CodeNode
   */
  getIndentLevel(): number | undefined { return this.indentLevel; }

  /**
   * Sets the type of the block.
   *
   * @param {BLOCK_TYPE} b The block type to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf CodeNode
   */
  setBlockType(b: BLOCK_TYPE): this {
    this.blockType = b;
    return this;
  }

  /**
   * Sets the info string associated with the block.
   *
   * @param {string} s The info string to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf CodeNode
   */
  setInfoString(s: string): this {
    this.infoString = s;
    return this;
  }

  /**
   * Sets the indent level associated with the block.
   *
   * @param {number} i The indent level to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf CodeNode
   */
  setIndentLevel(i: number): this {
    this.indentLevel = i;
    return this;
  }
}
