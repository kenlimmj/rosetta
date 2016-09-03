import test from 'ava';

import BlockNode from '../../ast/BlockNode';
import ThematicBreakDetector from '../ThematicBreakDetector';
import ThematicBreakNode from '../../ast/ThematicBreakNode';

const det = new ThematicBreakDetector();

test('should detect valid thematic breaks.', t => {
  const testNodes = [generateNodePair('***', '*'), generateNodePair('---', '-'), generateNodePair('___', '_')];
  batchTestNodePairs(t, testNodes);
});

test('should no-op invalid thematic breaks.', t => {
  const testNodes = [new BlockNode('+++'), new BlockNode('===')];
  batchTestNoOp(t, testNodes);
});

test('should no-op correct but insufficient break characters.', t => {
  const testNodes = [new BlockNode('--'), new BlockNode('__'), new BlockNode('**')];
  batchTestNoOp(t, testNodes);
});

test('should accept 1–3 spaces of indentation', t => {
  const testNodes = [generateNodePair(' ***', '*'), generateNodePair('  ***', '*'), generateNodePair('   ***', '*')];
  batchTestNodePairs(t, testNodes);
});

test('should no-op for 4 spaces of indentation', t => {
  const testNodes = [new BlockNode('    ***'), new BlockNode('Foo\n    ***')];
  batchTestNoOp(t, testNodes);
});

test('should accept more than 3 of the same valid character', t => {
  const [input, expectedOutput] = generateNodePair('_____________________________________', '_');
  t.deepEqual(det.process(input), expectedOutput);
});

test('should accept spaces between valid characters', t => {
  const testNodes = [
    generateNodePair(' - - -', '-'),
    generateNodePair(' **  * ** * ** * **', '*'),
    generateNodePair('-     -      -      -', '-')
  ];
  batchTestNodePairs(t, testNodes);
});

test('should accept spaces at the end of the string', t => {
  const [input, expectedOutput] = generateNodePair('- - - -    ', '-');
  t.deepEqual(det.process(input), expectedOutput);
});

test('should no-op for mixed characters in the line', t => {
  const testNodes = [new BlockNode('_ _ _ _ a'), new BlockNode('a------'), new BlockNode('---a---')];
  batchTestNoOp(t, testNodes);
});

test('should no-op if characters are valid but not identical', t => {
  t.is(det.process(new BlockNode(' *-*')), null);
});

function generateNodePair(input: string, breakChar: string): [BlockNode, ThematicBreakNode] {
  return [new BlockNode(input), new ThematicBreakNode(breakChar)];
}

function batchTestNodePairs(t: any, nodes: Array<[BlockNode, ThematicBreakNode]>): void {
  for (let [inputNode, expectedOutputNode] of nodes) {
    t.deepEqual(det.process(inputNode), expectedOutputNode);
  }
}

function batchTestNoOp(t: any, nodes: Array<BlockNode>): void {
  for (let inputNode of nodes) {
    t.is(det.process(inputNode), null);
  }
}
