/**
 * The interface for all nodes in the AST.
 *
 * All getters should use the naming convention {@code get<Variable>}.
 * All setters should use the naming convention {@code set<Variable>}.
 * In addition, all setters should also return {@code this} for chaining.
 *
 * @interface INode
 * @template T
 */
interface INode<T> {
  getContent(): T;
  setContent(c: T): this;

  getParent(): INode<any> | undefined;
  setParent(p: INode<any> | undefined): this;

  getChildren(): INode<any>[];
  setChildren(c: INode<any>[]): this;

  equals(c: INode<any>): boolean;
}

export default INode;
