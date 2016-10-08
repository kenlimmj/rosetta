import test from 'ava';

import BlockNode, { BLOCK_TYPE } from '../../ast/BlockNode';
import RawTextNode from '../../ast/RawTextNode';
import BlockChunker from '../BlockChunker';

const det = new BlockChunker();

test('should correctly split paragraphs', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\ndolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with extended but identical intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\n\n\n\n\ndolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with mixed intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\n\r\n\n\rdolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with spaces in front of intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\n  \n\ndolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with tabs in front of intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\n \t\n\ndolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with trailing intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('Lorem ipsum\n\ndolor sit\n\n', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly split paragraphs with opening intersital spacing', t => {
  const [input, expectedOutput] =
    generateNodePair('\r\nLorem ipsum\n\ndolor sit', ['Lorem ipsum', 'dolor sit']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly handle the empty string', t => {
  const [input, expectedOutput] = generateNodePair('', ['']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should correctly handle a single sentence', t => {
  const [input, expectedOutput] = generateNodePair('Lorem ipsum', ['Lorem ipsum']);
  t.deepEqual(det.process(input), expectedOutput);
});

test('should ignore single line breaks', t => {
  const [input, expectedOutput] = generateNodePair('Lorem\nipsum', ['Lorem\nipsum']);
  t.deepEqual(det.process(input), expectedOutput);
});

function generateNodePair(input: string, output: string[]): [RawTextNode, BlockNode[]] {
  const outputArr = output.map((e, idx) => new BlockNode(e, BLOCK_TYPE.Unknown, idx));
  return [new RawTextNode(input), outputArr];
}
