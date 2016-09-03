import test from 'ava';

import BlockNode from '../../ast/BlockNode';
import CodeNode, { BLOCK_TYPE } from '../../ast/CodeNode';
import IndentedCodeDetector from '../IndentedCodeDetector';

const det = new IndentedCodeDetector();

test('should detect valid indented code', t => {
  const [input, expectedOutput] = generateNodePair('    a simple', 'a simple');
  t.deepEqual(det.process(input), expectedOutput);
});

test('should accept more than 4 opening spaces', t => {
  const [input, expectedOutput] = generateNodePair('      a simple', '  a simple');
  t.deepEqual(det.process(input), expectedOutput);
});

test('should not prune trailing spaces', t => {
  const [input, expectedOutput] = generateNodePair('    a simple   ', 'a simple   ');
  t.deepEqual(det.process(input), expectedOutput);
});

function generateNodePair(input: string, output: string): [BlockNode, CodeNode] {
  return [new BlockNode(input), new CodeNode(output, BLOCK_TYPE.Indented)];
}
