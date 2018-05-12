import { Component } from 'react';
import { Promiser, BulkPromiser } from './index';

describe('index', () => {
	it('exports Promiser component', () => {
		expect(Promiser).toBeInstanceOf(Function);
	});

	it('exports BulkPromiser component', () => {
		expect(BulkPromiser).toBeInstanceOf(Function);
	});
})
