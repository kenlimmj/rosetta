import ANode from './ANode';

/**
 * A thematic break in the document.
 *
 * @export
 * @class ThematicBreakNode
 * @extends {ANode<string>}
 */
export default class ThematicBreakNode extends ANode<string> {
  constructor(breakChar: string, parent = undefined, children = []) {
    super(breakChar, parent, children);
  }
}
