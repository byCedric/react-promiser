import { ReactNode } from 'react';

/** A factory to create or start resolving promises. */
export type PromiserFactory<T> = () => Promise<T>;
/** A promise can either be idle, pending, rejected or fulfilled. */
export type PromiserStatus = 'idle' | 'pending' | 'rejected' | 'fulfilled';

export interface PromiserBehaviour {
	/** If the promise should be resolved automatically. */
	auto?: boolean;
}

export interface PromiserControls {
	/** Resolve the promise by executing it and update the state accordingly. */
	resolve(): void;
}

export interface PromiserState<T> {
	/** A promise can only be one of these four types at once. */
	status: PromiserStatus;
	/** The data received from the fulfilled promise. */
	data?: T;
	/** The error received from the rejected promise.. */
	error?: Error;
}

export interface PromiserRenderState<T> extends PromiserControls, PromiserState<T> {
	/** A promise is idle when it is waiting to start resolving. */
	isIdle: boolean;
	/** A promise is pending when it is resolving and did not reach a settled state. */
	isPending: boolean;
	/** A promise is rejected when it failed to resolve and encountered an error. */
	isRejected: boolean;
	/** A promise is fulfilled when it is resolved successfully without errors. */
	isFulfilled: boolean;
}

/** The promiser render prop is a function that uses the render state to return react nodes. */
export type PromiserRenderProp<T> = (state: PromiserRenderState<T>) => ReactNode;
