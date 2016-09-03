import ANode from './ANode';

export enum BLOCK_TYPE {
  Indented,
  Fenced
}

export default class CodeNode extends ANode<string> {
  constructor(content: string, private blockType: BLOCK_TYPE, opt_parent = null,
    opt_children = []) {
    super(content, opt_parent, opt_children);
  }

  /**
   * Returns the type of the block.
   * @method getBlockType
   * @return {BLOCK_TYPE} The type of the block.
   */
  getBlockType(): BLOCK_TYPE { return this.blockType; }

  /**
   * Sets the type of the block.
   * @method setBlockType
   * @param  {BLOCK_TYPE} b The block type to be set.
   * @return {this} {@code this}, for chaining.
   */
  setBlockType(b: BLOCK_TYPE): this {
    this.blockType = b;
    return this;
  }
}
