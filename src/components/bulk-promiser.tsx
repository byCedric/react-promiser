import * as React from 'react';
import createHandler from '../utils/create-handler';
import createHelpers from '../utils/create-helpers';
import { PromiseState, PromiseProps, PromiseRenderer, PromiseFactory } from '../utils/types';

export interface BulkPromiserProps<T> {
	/** The promise renderer with all data. */
	children: (props: { [key: string]: PromiseState<T> & PromiseRenderer<T> }) => any;
	/** A single promise factory or promise props */
	[key: string]: PromiseFactory<T> | PromiseProps<T>;
}

export interface BulkPromiserState<T> {
	/** A single promise with its state and resolver. */
	[key: string]: PromiseState<T> & { resolve: PromiseFactory<T> };
}

export default class BulkPromiser<T extends any> extends React.Component<BulkPromiserProps<T>, BulkPromiserState<T>> {
	constructor(props) {
		super(props);

		this.state = this.initialiseState();
	}

	initialiseState() {
		const state: BulkPromiserState<T> = {};

		Object.keys(this.props).map(name => {
			const promise = this.props[name];

			const resolve = typeof promise === 'object'
				? (promise as PromiseProps<T>).promise
				: promise;

			state[name] = {
				auto: typeof promise === 'object' && !!(promise as PromiseProps<T>).auto,
				resolve: createHandler(this, resolve),
				status: undefined,
				error: undefined,
				result: undefined,
			};
		});

		return state;
	}

	componentDidMount() {
		Object.keys(this.state).forEach(name => {
			const promise = this.state[name];

			if (promise.auto) {
				promise.resolve();
			}
		});
	}

	render() {
		const stateWithHelpers: { [key:string]: PromiseState<T> & PromiseRenderer<T> } = {};

		Object.keys(this.state).forEach(name => {
			stateWithHelpers[name] = {
				...this.state[name],
				...createHelpers(this.state[name].status),
			};
		});

		return this.props.children(stateWithHelpers);
	}
}
