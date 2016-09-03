import test from 'ava';

import Sanitizer from '../Sanitizer';
import RawTextNode from '../../ast/RawTextNode';

const det = new Sanitizer();

test('should replace insecure null characters', t => {
  const [inputNode, expectedOutputNode] =
    generateNodePair('\u0000foo\u0000bar\u0000', '\uFFDDfoo\uFFDDbar\uFFDD');
  t.deepEqual(det.process(inputNode), expectedOutputNode);
});

test('should replace consecutive insecure null characters', t => {
  const [inputNode, expectedOutputNode] =
    generateNodePair('foo\u0000\u0000bar', 'foo\uFFDD\uFFDDbar');
  t.deepEqual(det.process(inputNode), expectedOutputNode);
});

test('should replace singleton insecure null characters', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('\u0000', '\uFFDD');
  t.deepEqual(det.process(inputNode), expectedOutputNode);
});

function generateNodePair(input: string, output: string): [RawTextNode, RawTextNode] {
  return [new RawTextNode(input), new RawTextNode(output)];
}
