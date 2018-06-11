/** All possible statuses of a single promise. */
export type PromiseStatus = undefined | 'pending' | 'fulfilled' | 'rejected';
/** A method to resolve the managed promise.  */
export type PromiseFactory<T> = (...params: any[]) => Promise<void>;

export interface PromiseRendererHelpers {
	/** If the promise is neither pending or settled. */
	idle: boolean;
	/** If the promise is pending or loading. */
	pending: boolean;
	/** If the promise is fulfilled or resolved. */
	fulfilled: boolean;
	/** If the promise is rejected or has failed. */
	rejected: boolean;
	/** If the promise is either fulfilled or rejected. */
	settled: boolean;
}

export interface PromiseRenderer<T> extends PromiseRendererHelpers {
	/** A method to execute the promise. */
	resolve: PromiseFactory<T>;
}

export interface PromiseState<T> {
	/** If the promise will be resolved automatically. */
	auto: boolean;
	/** The status of the promise. */
	status: PromiseStatus;
	/** The received error when rejected. */
	error?: Error;
	/** The received result when fulfilled. */
	result?: T;
}

export interface PromiseProps<T> {
	/** The promise factory to manage. */
	promise: PromiseFactory<T>;
	/** If the promise should be resolved automatically. */
	auto?: boolean;
}
