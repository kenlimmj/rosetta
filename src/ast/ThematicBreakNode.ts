import ANode from './ANode';

/**
 * A thematic break in the document.
 *
 * @extends ANode
 */
export default class ThematicBreakNode extends ANode<string> {
  constructor(breakChar: string, opt_parent = null, opt_children = []) {
    super(breakChar, opt_parent, opt_children);
  }
}
