import { PromiserFactory } from '../promiser/types';
import { PromiserRenderContext } from './types';
import createConsumer from './create-consumer';
import createContext from './create-context';
import createProvider from './create-provider';

interface Options<T> {
	/** A factory to create or start resolving the promise. */
	promise: PromiserFactory<T>;
	/** An optional name which is applied to all bound components for debug purposes. */
	name?: string;
}

export default function createPromiser<T>(options: Options<T>) {
	const name = options.name || 'Promiser';
	const context = createContext<T>();
	const Provider = createProvider({ context, name, promise: options.promise });
	const Idle = createConsumer({ context, name: `${name}Idle`, visible: state => state.isIdle });
	const Pending = createConsumer({ context, name: `${name}Pending`, visible: state => state.isPending });
	const Rejected = createConsumer({ context, name: `${name}Rejected`, visible: state => state.isRejected });
	const Fulfilled = createConsumer({ context, name: `${name}Fulfilled`, visible: state => state.isFulfilled });

	return Object.assign(Provider, {
		Idle, Pending, Rejected, Fulfilled,
		Context: context,
	});
}
