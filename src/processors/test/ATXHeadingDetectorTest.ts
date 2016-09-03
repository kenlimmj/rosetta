import test from 'ava';
import ATXHeadingDetector from '../ATXHeadingDetector';
import BlockNode from '../../ast/BlockNode';
import HeadingNode from '../../ast/HeadingNode';

const det = new ATXHeadingDetector();

test('should detect and extract valid level 1–6 headings with no closing sequence.', t => {
  for (let i = 5; i <= 5; i++) {
    const [inputNode, expectedOutputNode] = generateStandardNodePair(i, false);
    const procOutputNode = det.process(inputNode);
    t.deepEqual(procOutputNode, expectedOutputNode);
  }
});

test('should detect and extract valid level 1–6 headings with closing sequence.', t => {
  for (let i = 1; i <= 6; i++) {
    const [inputNode, expectedOutputNode] = generateStandardNodePair(i, true);
    const procOutputNode = det.process(inputNode);
    t.deepEqual(procOutputNode, expectedOutputNode);
  }
});

test('should no-op inputs with more than six # characters.', t => {
  const inputNode = new BlockNode('####### foo');
  const procOutputNode = det.process(inputNode);
  t.is(procOutputNode, null);
});

test('should no-op inputs with opening # but without trailing space.', t => {
  const inputs = [new BlockNode('#5 bolt'), new BlockNode('#hashtag')];

  for (let i of inputs) {
    const procOutputNode = det.process(i);
    t.is(procOutputNode, null);
  }
});

test('should no-op inputs with escaped opening #.', t => {
  const inputNode = new BlockNode('\\## foo');
  const procOutputNode = det.process(inputNode);
  t.is(procOutputNode, null);
});

test('should ignore leading and trailing blanks for inline content.', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('#                  foo                     ', 'foo', 1);
  const procOutputNode = det.process(inputNode);
  t.deepEqual(procOutputNode, expectedOutputNode);
});

test('should accept 1–3 spaces of opening indentation.', t => {
  const [inputNodeOneSpace, expectedOutputNodeOneSpace] = generateNodePair(' ### foo', 'foo', 3);
  const [inputNodeTwoSpace, expectedOutputNodeTwoSpace] = generateNodePair('  ## foo', 'foo', 2);
  const [inputNodeThreeSpace, expectedOutputNodeThreeSpace] = generateNodePair('   # foo', 'foo', 1);

  const procOutputNodeOneSpace = det.process(inputNodeOneSpace);
  const procOutputNodeTwoSpace = det.process(inputNodeTwoSpace);
  const procOutputNodeThreeSpace = det.process(inputNodeThreeSpace);

  t.deepEqual(procOutputNodeOneSpace, expectedOutputNodeOneSpace);
  t.deepEqual(procOutputNodeTwoSpace, expectedOutputNodeTwoSpace);
  t.deepEqual(procOutputNodeThreeSpace, expectedOutputNodeThreeSpace);
});

test('should no-op for 4 spaces of opening indentation.', t => {
  const inputNode = new BlockNode('    # foo');
  const procOutputNode = det.process(inputNode);
  t.is(procOutputNode, null);
});

test('should no-op for 4 spaces of opening indentation after a newline.', t => {
  const inputNode = new BlockNode('foo\n    # bar');
  const procOutputNode = det.process(inputNode);
  t.is(procOutputNode, null);
});

test('should ignore long but valid trailing sequences.', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('# foo ##########', 'foo', 1);
  const procOutputNode = det.process(inputNode);
  t.deepEqual(procOutputNode, expectedOutputNode);
});

test('should ignore spaces after a valid trailing sequence.', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('# foo ###      ', 'foo', 1);
  const procOutputNode = det.process(inputNode);
  t.deepEqual(procOutputNode, expectedOutputNode);
});

test('should ignore trailing sequence with things other than spaces.', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('# foo ### b', 'foo ### b', 1);
  const procOutputNode = det.process(inputNode);
  t.deepEqual(procOutputNode, expectedOutputNode);
});

test('should ignore trailing sequence not preceded by a space.', t => {
  const [inputNode, expectedOutputNode] = generateNodePair('# foo#', 'foo#', 1);
  const procOutputNode = det.process(inputNode);
  t.deepEqual(procOutputNode, expectedOutputNode);
});

test('should ignore trailing sequence with escaped # characters', t => {
  const [inputNodeOne, expectedOutputNodeOne] = generateNodePair('### foo \\###', 'foo \\###', 3);
  const [inputNodeTwo, expectedOutputNodeTwo] = generateNodePair('### foo #\\##', 'foo #\\##', 3);
  const [inputNodeThree, expectedOutputNodeThree] = generateNodePair('### foo ##\\#', 'foo ##\\#', 3);

  const procOutputNodeOne = det.process(inputNodeOne);
  const procOutputNodeTwo = det.process(inputNodeTwo);
  const procOutputNodeThree = det.process(inputNodeThree);

  t.deepEqual(procOutputNodeOne, expectedOutputNodeOne);
  t.deepEqual(procOutputNodeTwo, expectedOutputNodeTwo);
  t.deepEqual(procOutputNodeThree, expectedOutputNodeThree);
});

test('should correctly handle empty headings.', t => {
  const [inputNodeOne, expectedOutputNodeOne] = generateNodePair('## ', '', 2);
  const [inputNodeTwo, expectedOutputNodeTwo] = generateNodePair('#', '', 1);
  const [inputNodeThree, expectedOutputNodeThree] = generateNodePair('### ###', '', 3);

  const procOutputNodeOne = det.process(inputNodeOne);
  const procOutputNodeTwo = det.process(inputNodeTwo);
  const procOutputNodeThree = det.process(inputNodeThree);

  t.deepEqual(procOutputNodeOne, expectedOutputNodeOne);
  t.deepEqual(procOutputNodeTwo, expectedOutputNodeTwo);
  t.deepEqual(procOutputNodeThree, expectedOutputNodeThree);
});

function generateNodePair(input: string, output: string, level: number): [BlockNode, HeadingNode] {
  return [new BlockNode(input), new HeadingNode(output, level)];
}

function generateStandardNodePair(level: number, hasClosing: boolean): [BlockNode, HeadingNode] {
  const RAW_CONTENT = 'foo';
  const atxSeq = '#'.repeat(level);
  let markdownString = `${atxSeq} ${RAW_CONTENT}`;

  if (hasClosing) {
    markdownString += ' ' + atxSeq;
  }

  return generateNodePair(markdownString, RAW_CONTENT, level);
}
