import ANode from './ANode';

export enum BLOCK_TYPE {
  Unknown,
  Thematic,
  Leaf
}

export default class BlockNode extends ANode<string> {
  constructor(content_: string, private blockType_: BLOCK_TYPE = BLOCK_TYPE.Unknown, opt_parent = null, opt_children = []) {
    super(content_, opt_parent, opt_children);
  }

  getBlockType(): BLOCK_TYPE { return this.blockType_; }

  setBlockType(b: BLOCK_TYPE): this {
    this.blockType_ = b;
    return this;
  }
}
