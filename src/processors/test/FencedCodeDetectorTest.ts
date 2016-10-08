import test from 'ava';

import BlockNode from '../../ast/BlockNode';
import CodeNode, { BLOCK_TYPE } from '../../ast/CodeNode';
import FencedCodeDetector from '../FencedCodeDetector';

const det = new FencedCodeDetector();

test('should detect backtick code fences', t => {
  const [input, expectedOutput] = generateNodePair('```', '', 0);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should detect tilde code fences', t => {
  const [input, expectedOutput] = generateNodePair('~~~', '', 0);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly capture leading indentation', t => {
  const [input, expectedOutput] = generateNodePair('  ```', '', 2);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should no-op for incorrect fence characters', t => {
  const input = new BlockNode('***')
  t.is(det.process(input), null);
});

test('should no-op for correct but non-homogeneous fence characters', t => {
  const input = new BlockNode('`~`')
  t.is(det.process(input), null);
});

test('should no-op for 4 spaces of opening indentation', t => {
  const input = new BlockNode('    ```')
  t.is(det.process(input), null);
});

test('should no-op for fences containing internal spaces', t => {
  const input = new BlockNode('``` ```')
  t.is(det.process(input), null);
});

test('should correctly extract info string', t => {
  const [input, expectedOutput] = generateNodePair('```js', 'language-js', 0);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should extract only the first word as the info string', t => {
  const [input, expectedOutput] = generateNodePair('~~~~    ruby startline=3', 'language-ruby', 0);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should no-op for info strings containing backticks', t => {
  const input = new BlockNode('``` aa ```')
  t.is(det.process(input), null);
});

function generateNodePair(input: string, infoString: string,
  indentLevel: number): [BlockNode, CodeNode] {
  return [new BlockNode(input), new CodeNode('', BLOCK_TYPE.Fenced, infoString, indentLevel)];
}
