import { Component } from 'react';
import { Promiser } from './index';

describe('index', () => {
	it('exports Promiser component', () => {
		expect(Promiser).toBeInstanceOf(Function);
	});
})
