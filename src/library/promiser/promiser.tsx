import React, { Component } from 'react';
import {
	PromiserBehaviour,
	PromiserFactory,
	PromiserRenderProp,
	PromiserState,
	PromiserStatus,
} from './types';

interface Props<T> extends PromiserBehaviour {
	/** A factory to create or start resolving the promise. */
	promise: PromiserFactory<T>;
	/** A render method used for rendering based on the promise states. */
	children: PromiserRenderProp<T>;
}

export default class Promiser<T> extends Component<Props<T>, PromiserState<T>> {
	state: Readonly<PromiserState<T>> = {
		status: 'idle',
		data: undefined,
		error: undefined,
	}

	componentDidMount() {
		if (this.props.auto) {
			this.resolvePromise();
		}
	}

	resolvePromise = () => {
		this.onPromisePending();
		this.props.promise()
			.then(this.onPromiseFulfilled)
			.catch(this.onPromiseRejected);
	}

	onPromisePending = () => {
		this.setState({ status: 'pending', data: undefined, error: undefined });
	}

	onPromiseRejected = (error: Error) => {
		this.setState({ status: 'rejected', data: undefined, error });
	}

	onPromiseFulfilled = (data: T) => {
		this.setState({ status: 'fulfilled', data, error: undefined });
	}

	render() {
		const { status, data, error } = this.state;

		return this.props.children({
			status, data, error,
			isIdle: status === 'idle',
			isPending: status === 'pending',
			isRejected: status === 'rejected',
			isFulfilled: status === 'fulfilled',
			resolve: this.resolvePromise,
		});
	}
}
