import React, { PureComponent } from 'react';
import { PromiserRender, PromiserRenderContext, resolveRender } from './types';
import Promiser, { PromiserFactory, PromiserRenderProp } from '../promiser';

interface Options<T> {
	/** A name which is merged in the provider component for debug purposes. */
	name: string;
	/** A prepared context instance to provide promiser states. */
	context: PromiserRenderContext<T>;
	/** A factory to create or start resolving the promise. */
	promise(): Promise<T>;
}

interface Props<T> {
	/** If the promise should be resolved automatically. */
	auto?: boolean;
	/** A factory to create or start resolving the promise. */
	promise: PromiserFactory<T>;
	/** A promiser render prop or react nodes to display. */
	children: PromiserRender<T>;
}

export default function createProvider<T>(options: Options<T>) {
	return class PromiserProvider extends PureComponent<Props<T>> {
		static displayName = `${options.name}Provider`;

		renderProvider: PromiserRenderProp<T> = (state) => (
			<options.context.Provider value={state}>
				{resolveRender(state, this.props.children)}
			</options.context.Provider>
		);

		render() {
			return (
				<Promiser promise={options.promise} {...this.props}>
					{this.renderProvider}
				</Promiser>
			);
		}
	}
}
