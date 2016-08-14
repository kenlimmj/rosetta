import INode from '../ast/INode';

/**
 * The interface for all processors in the pipeline.
 */
interface IProcessor<T extends INode<any>, U extends INode<any>> {
  process(data: T): U[];
}

export default IProcessor;
