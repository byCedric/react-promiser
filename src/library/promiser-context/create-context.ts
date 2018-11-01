import { createContext as createReactContext } from 'react';
import { PromiserRenderState } from '../promiser/types';
import { PromiserRenderContext } from './types';

const initialContext: PromiserRenderState<any> = {
	resolve: () => undefined,
	status: 'idle',
	data: undefined,
	error: undefined,
	isIdle: true,
	isPending: false,
	isRejected: false,
	isFulfilled: false,
};

export default function createContext<T>(): PromiserRenderContext<T> {
	return createReactContext(initialContext);
}
