import ANode from './ANode';

/**
 * The types of blocks that can be found in a document.
 *
 * @export
 * @enum {number}
 */
export enum BLOCK_TYPE {
  Unknown,
  Container,
  Leaf
}

/**
 * A block of content in the document.
 *
 * @export
 * @class BlockNode
 * @extends {ANode<string>}
 */
export default class BlockNode extends ANode<string> {
  constructor(
    content: string,
    private blockType: BLOCK_TYPE = BLOCK_TYPE.Unknown,
    private idx?: number, parent = undefined, children = []) {
    super(content, parent, children);
  }

  /**
   * Returns the type of the block.
   *
   * @returns {BLOCK_TYPE} The type of the block.
   *
   * @memberOf BlockNode
   */
  getBlockType(): BLOCK_TYPE { return this.blockType; }

  /**
   * Returns the index number of the block, if any.
   *
   * @returns {(number | undefined)}
   *
   * @memberOf BlockNode
   */
  getIndex(): number | undefined { return this.idx; }

  /**
   * Sets the type of the block.
   *
   * @param {BLOCK_TYPE} b The block type to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf BlockNode
   */
  setBlockType(b: BLOCK_TYPE): this {
    this.blockType = b;
    return this;
  }

  /**
   * Sets the index number of the block.
   *
   * @param {number} i The index number to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf BlockNode
   */
  setIndex(i: number): this {
    this.idx = i;
    return this;
  }
}
