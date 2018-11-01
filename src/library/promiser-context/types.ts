import { Context, ReactNode } from 'react';
import { PromiserRenderProp, PromiserRenderState } from '../promiser';

/** The promiser render(er) is either a render prop or react nodes. */
export type PromiserRender<T> = PromiserRenderProp<T> | ReactNode;
/** The promiser context provided by the created promiser. */
export type PromiserRenderContext<T> = Context<PromiserRenderState<T>>;

/** A type guard helper to determine if react nodes or a promiser render prop is supplied. */
export function isRenderProp<T>(value: PromiserRender<T>): value is PromiserRenderProp<T> {
	return typeof value === 'function';
}

/** A simple render prop resolver to either invoke the render prop with state, or render react nodes. */
export function resolveRender<T>(state: PromiserRenderState<T>, render: PromiserRender<T>): ReactNode {
	return isRenderProp(render)
		? render(state)
		: render;
}
