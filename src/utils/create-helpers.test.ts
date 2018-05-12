import { PromiseRendererHelpers } from './types';
import createHelpers from './create-helpers';

describe('utils/create-helpers', () => {
	it('returns proper helpers for undefined status', () => {
		expect(createHelpers(undefined)).toMatchObject({
			idle: true,
			pending: false,
			fulfilled: false,
			rejected: false,
			settled: false,
		} as PromiseRendererHelpers);
	});

	it('returns proper helpers for pending status', () => {
		expect(createHelpers('pending')).toMatchObject({
			idle: false,
			pending: true,
			fulfilled: false,
			rejected: false,
			settled: false,
		} as PromiseRendererHelpers);
	});

	it('returns proper helpers for fulfilled status', () => {
		expect(createHelpers('fulfilled')).toMatchObject({
			idle: false,
			pending: false,
			fulfilled: true,
			rejected: false,
			settled: true,
		} as PromiseRendererHelpers);
	});

	it('returns proper helpers for rejected status', () => {
		expect(createHelpers('rejected')).toMatchObject({
			idle: false,
			pending: false,
			fulfilled: false,
			rejected: true,
			settled: true,
		} as PromiseRendererHelpers);
	});
});
