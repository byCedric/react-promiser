import { PromiseStatus, PromiseRendererHelpers } from './types';

/**
 * Create the helper flags for a promise status.
 */
export default (status: PromiseStatus): PromiseRendererHelpers => ({
	idle: status === undefined,
	pending: status === 'pending',
	fulfilled: status === 'fulfilled',
	rejected: status === 'rejected',
	settled: status === 'fulfilled' || status === 'rejected',
});
