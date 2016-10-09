/**
 * The interface for a pipeline.
 *
 * @interface Pipeline
 * @template T The type of the input that is consumed by the pipeline.
 * @template U The type of the output that is produced by the pipeline.
 */
export default interface IPipeline<T, U> {
  consume(input: T): void;
  produce(): U;
}

/** A pipeline element can be either a processor or a nested pipeline. */
export type PipelineElement = IProcessor<any, any> | IPipeline<any, any>;
