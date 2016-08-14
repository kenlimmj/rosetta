import INode from './INode';

/**
 * An abstract AST node that implements functions for a basic n-tree invariant.
 * @implements INode
 */
abstract class ANode<T> implements INode<T> {
  constructor(private content_: T, private parent_: INode<any> | null = null, private children_: INode<any>[] = []) { };

  /**
   * Returns the content in this node.
   * @method getContent
   * @return {T} The content in this node.
   */
  getContent(): T { return this.content_; }

  /**
   * Returns the parent node for this node, if any.
   * @method getParent
   * @return {INode<any> | null} The parent node for this node.
   */
  getParent(): INode<any> | null { return this.parent_; }

  /**
   * Returns the child nodes for this node.
   * @method getChildren
   * @return {INode<any>[]} The child nodes for this node.
   */
  getChildren(): INode<any>[] { return this.children_; }

  /**
   * Sets the content in this node, replacing the previous content, if any.
   * @method setContent
   * @param  {T} c The content to be set.
   * @return {this} {@code this}, for chaining.
   */
  setContent(c: T): this {
    this.content_ = c;
    return this;
  }

  /**
   * Sets the parent node for this node. Setting this value to {@code null} is equivalent to removing the parent.
   * @method setParent
   * @param  {INode<any> | null} p The parent node to be set.
   * @return {this} {@code this}, for chaining.
   */
  setParent(p: INode<any> | null): this {
    this.parent_ = p;
    return this;
  }

  /**
   * Sets the child nodes for this node.
   * @method setChildren
   * @param  {INode<any>[]} c The child nodes to be set.
   * @return {this} {@code this}, for chaining.
   */
  setChildren(c: INode<any>[]): this {
    this.children_ = c;
    return this;
  }
}

export default ANode;
