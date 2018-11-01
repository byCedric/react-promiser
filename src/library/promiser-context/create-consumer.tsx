import React, { PureComponent } from 'react';
import { PromiserRender, PromiserRenderContext, resolveRender } from './types';
import Promiser, { PromiserRenderProp, PromiserRenderState } from '../promiser';

interface Options<T> {
	/** A name which describes the conditional rendering of the consumer. */
	name: string;
	/** A prepared context instance to consume promiser states. */
	context: PromiserRenderContext<T>;
	/** A method to determine if the consumer is visible or active. */
	visible(state: PromiserRenderState<T>): boolean;
}

interface Props<T> {
	/** A promiser render prop or react nodes to display. */
	children: PromiserRender<T>;
}

export default function createConsumer<T>(options: Options<T>) {
	return class PromiserConsumer extends PureComponent<Props<T>> {
		static displayName = `${options.name}Consumer`;

		renderConsumer: PromiserRenderProp<T> = (state) => (
			options.visible(state) && resolveRender(state, this.props.children)
		);

		render() {
			return (
				<options.context.Consumer>
					{this.renderConsumer}
				</options.context.Consumer>
			);
		}
	}
}
