import IPipeline, { PipelineElement } from '../interfaces/IPipeline';

/**
 * A pipeline whose components are executed serially.
 *
 * @export
 * @class SerialPipeline
 * @implements {IPipeline<T, U>}
 * @template T The type of the input that is consumed by the serial pipeline.
 * @template U The type of the output that is produced by the serial pipeline.
 */
export default class SerialPipeline<T, U> implements IPipeline<T, U> {
  constructor(private processors: ReadonlyArray<PipelineElement>;) {

  }
}
