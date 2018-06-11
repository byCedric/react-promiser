import { Component } from 'react';
import { PromiseFactory } from './types';

export default <T>(manager: Component, promise: PromiseFactory<T>): PromiseFactory<T> => {
	return (...params) => {
		manager.setState({
			status: 'pending',
			result: undefined,
			error: undefined,
		});

		return promise(...params)
			.then(result => {
				manager.setState({
					result,
					status: 'fulfilled',
					error: undefined,
				});

				return result;
			})
			.catch(error => {
				manager.setState({
					status: 'rejected',
					result: undefined,
					error,
				});

				throw error;
			});
	};
}
