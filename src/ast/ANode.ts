import INode from '../interfaces/INode';

/**
 * An abstract AST node that implements functions for a basic n-tree invariant.
 *
 * @abstract
 * @class ANode
 * @implements {INode<T>}
 * @template T
 */
abstract class ANode<T> implements INode<T> {
  constructor(private content_: T, private parent?: INode<any>,
    private children: INode<any>[] = []) { };

  /**
   * Returns the content in this node.
   *
   * @returns {T}
   *
   * @memberOf ANode
   */
  getContent(): T { return this.content_; }

  /**
   * Returns the parent node for this node, if any.
   *
   * @returns {(INode<any> | undefined)}
   *
   * @memberOf ANode
   */
  getParent(): INode<any> | undefined { return this.parent; }

  /**
   * Returns the child nodes for this node.
   *
   * @returns {INode<any>[]}
   *
   * @memberOf ANode
   */
  getChildren(): INode<any>[] { return this.children; }

  /**
   * Sets the content in this node, replacing the previous content, if any.
   *
   * @param {T} c The content to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf ANode
   */
  setContent(c: T): this {
    this.content_ = c;
    return this;
  }

  /**
   * Sets the parent node for this node. Setting this value to {@code null} is
   * equivalent to removing the parent.
   *
   * @param {(INode<any> | undefined)} p The parent node to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf ANode
   */
  setParent(p: INode<any> | undefined): this {
    this.parent = p;
    return this;
  }

  /**
   * Sets the child nodes for this node.
   *
   * @param {INode<any>[]} c The child nodes to be set.
   * @returns {this} {@code this}, for chaining.
   *
   * @memberOf ANode
   */
  setChildren(c: INode<any>[]): this {
    this.children = c;
    return this;
  }

  equals(c: INode<any>): boolean {
    const contentMatch = this.content_ === c.getContent();

    let parentMatch: boolean;
    if (c.getParent && this.parent) {
      parentMatch = this.parent.equals(<INode<any>>c.getParent());
    } else {
      parentMatch = this.parent === c.getParent();
    }

    return contentMatch && parentMatch;
  }
}

export default ANode;
