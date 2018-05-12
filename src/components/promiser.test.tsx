import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import Promiser from './promiser';
import createHelpers from '../utils/create-helpers';

describe('components/promiser', () => {
	it('initialises state when created', () => {
		const children = jest.fn();
		const instance = shallow(
			<Promiser promise={() => Promise.resolve('test')}>
				{children}
			</Promiser>
		);

		expect(instance.state()).toMatchObject({
			auto: false,
			resolve: expect.any(Function),
			status: undefined,
			result: undefined,
			error: undefined,
		});
	});

	it('invokes render child with state and helpers', () => {
		const children = jest.fn(() => null);
		const instance = render(
			<Promiser promise={() => Promise.resolve('test')}>
				{children}
			</Promiser>
		);

		expect(children).toBeCalledWith({
			...createHelpers(undefined),
			auto: false,
			resolve: expect.any(Function),
			status: undefined,
			result: undefined,
			error: undefined,
		});
	});

	it('renders render child return value', () => {
		const instance = render(
			<Promiser promise={() => Promise.resolve('test')}>
				{() => <span>rendered</span>}
			</Promiser>
		);

		expect(instance.text()).toBe('rendered');
	});

	it('handles fulfilled promises', () => {
		expect.assertions(1);

		mount(
			<Promiser auto promise={() => Promise.resolve('test')}>
				{({ fulfilled, result }) => {
					if (fulfilled) {
						expect(result).toBe('test');
					}

					return null;
				}}
			</Promiser>
		);
	});

	it('handles rejected promises', () => {
		expect.assertions(1);

		mount(
			<Promiser auto promise={() => Promise.reject('test')}>
				{({ rejected, error }) => {
					if (rejected) {
						expect(error).toBe('test');
					}

					return null;
				}}
			</Promiser>
		);
	});

	it('invokes promise with resolve handler function', () => {
		expect.assertions(3);

		const instance = mount(
			<Promiser promise={() => Promise.resolve('test')}>
				{({ status, ...helpers }) => {
					switch (status) {
						case undefined: expect(helpers).toMatchObject(createHelpers(undefined)); break;
						case 'pending': expect(helpers).toMatchObject(createHelpers('pending')); break;
						case 'fulfilled': expect(helpers).toMatchObject(createHelpers('fulfilled')); break;
						case 'rejected':
							throw new Error('This should not be invoked');
					}

					return null;
				}}
			</Promiser>
		);

		instance.state().resolve();
	});

	it('invokes promise automatically with "auto"', () => {
		expect.assertions(3);

		mount(
			<Promiser auto promise={() => Promise.resolve('test')}>
				{({ status, ...helpers }) => {
					switch (status) {
						case undefined: expect(helpers).toMatchObject(createHelpers(undefined)); break;
						case 'pending': expect(helpers).toMatchObject(createHelpers('pending')); break;
						case 'fulfilled': expect(helpers).toMatchObject(createHelpers('fulfilled')); break;
						case 'rejected':
							throw new Error('This should not be invoked');
					}

					return null;
				}}
			</Promiser>
		);
	});
});
