import React from 'react';
import { mount } from 'enzyme';
import Promiser from './promiser';
import { PromiserStatus } from './types';

const createStatus = (status: PromiserStatus) => ({
	status,
	isIdle: status === 'idle',
	isPending: status === 'pending',
	isRejected: status === 'rejected',
	isFulfilled: status === 'fulfilled',
});

describe('library/promiser', () => {
	it('renders the children prop', () => {
		const promise = jest.fn().mockResolvedValue('hello');
		const component = mount(
			<Promiser promise={promise}>
				{() => 'hello'}
			</Promiser>
		);

		expect(component).toIncludeText('hello');
	});

	it('resolves promise through render prop', () => {
		const promise = jest.fn().mockResolvedValue('hello');
		const component = mount(
			<Promiser promise={promise}>
				{state => <button onClick={state.resolve}>hello</button>}
			</Promiser>
		);

		component.find('button')
			.simulate('click');

		expect(promise).toHaveBeenCalled();
	});

	it('automatically resolves the promise', () => {
		const render = jest.fn().mockReturnValue(null);
		const promise = jest.fn().mockResolvedValue('hello');
		const component = mount(
			<Promiser promise={promise} auto>{render}</Promiser>
		);

		expect(promise).toHaveBeenCalled();
	});

	it('renders idle state', () => {
		const render = jest.fn().mockReturnValue(null);
		const promise = jest.fn().mockResolvedValue('hello');
		const component = mount(
			<Promiser promise={promise}>{render}</Promiser>
		);

		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				...createStatus('idle'),
				data: undefined,
				error: undefined,
			})
		);
	});

	it('renders pending state', () => {
		const render = jest.fn().mockReturnValue(null);
		const promise = () => new Promise((resolve, reject) => null);
		const component = mount(
			<Promiser promise={promise} auto>{render}</Promiser>
		);

		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				...createStatus('pending'),
				data: undefined,
				error: undefined,
			})
		);
	});

	it('renders rejected state', async () => {
		const error = new Error();
		const render = jest.fn().mockReturnValue(null);
		const promise = jest.fn().mockRejectedValue(error);
		const component = mount(
			<Promiser promise={promise} auto>{render}</Promiser>
		);

		try {
			await promise();
		} catch (error) {
			// intentional
		}

		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				...createStatus('rejected'),
				error, data: undefined,
			})
		);
	});

	it('renders fulfilled state', async () => {
		const render = jest.fn().mockReturnValue(null);
		const promise = jest.fn().mockResolvedValue('hello');
		const component = mount(
			<Promiser promise={promise} auto>{render}</Promiser>
		);

		await promise();

		expect(render).toHaveBeenCalledWith(
			expect.objectContaining({
				...createStatus('fulfilled'),
				data: 'hello',
				error: undefined,
			})
		);
	});
});
