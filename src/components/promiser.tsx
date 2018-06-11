import * as React from 'react';
import createHandler from '../utils/create-handler';
import createHelpers from '../utils/create-helpers';
import { PromiseState, PromiseProps, PromiseRenderer, PromiseFactory } from '../utils/types';

export interface PromiserProps<T> extends PromiseProps {
	/** The promise renderer with all data. */
	children: (props: PromiseState<T> & PromiseRenderer) => any;
}

export interface PromiserState<T> extends PromiseState<T> {
	/** A method to invoke the managed promise. */
	resolve: PromiseFactory;
}

export default class Promiser<T extends any> extends React.Component<PromiserProps<T>, PromiserState<T>> {
	constructor(props: any) {
		super(props);

		this.state = this.initialiseState();
	}

	initialiseState() {
		return {
			auto: !!this.props.auto,
			resolve: createHandler(this, this.props.promise),
			status: undefined,
			result: undefined,
			error: undefined,
		};
	}

	componentDidMount() {
		if (this.props.auto) {
			this.state.resolve();
		}
	}

	render() {
		return this.props.children({
			...this.state,
			...createHelpers(this.state.status),
		});
	}
}
