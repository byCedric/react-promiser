import { Component } from 'react';
import createHandler from './create-handler';

const FakeComponent = jest.fn<Component>(() => ({
	setState: jest.fn(),
}));

describe('utils/create-handler', () => {
	beforeEach(() => {
		FakeComponent.mockClear();
	});

	it('returns a handler function', () => {
		expect(createHandler(new FakeComponent(), () => Promise.resolve())).toBeInstanceOf(Function);
	});

	it('sets state to "pending" when handler is invoked', () => {
		const component = new FakeComponent();
		const handler = createHandler(component, () => Promise.resolve());

		handler();

		expect(component.setState).toHaveBeenCalledWith({
			status: 'pending',
			result: undefined,
			error: undefined,
		});
	});

	it('sets state to "fulfilled" when handler is invoked and promise is fulfilled', async () => {
		const component = new FakeComponent();
		const handler = createHandler(component, () => Promise.resolve('result'));

		await expect(handler()).resolves.toMatch('result');

		expect(component.setState).toHaveBeenCalledWith({
			status: 'fulfilled',
			result: 'result',
			error: undefined,
		});
	});

	it('sets state to "rejected" when handler is invoked and promise is rejected', async () => {
		const component = new FakeComponent();
		const error = new Error('something went wrong');
		const handler = createHandler(component, () => Promise.reject(error));

		await expect(handler()).rejects.toThrowError(error.message);

		expect(component.setState).toHaveBeenCalledWith({
			status: 'rejected',
			result: undefined,
			error,
		});
	});
});
