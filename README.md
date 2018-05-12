# React Promiser

[![Latest Release](https://img.shields.io/github/release/bycedric/react-promiser/all.svg?style=flat-square)](https://github.com/bycedric/react-promiser/releases)
[![Build Status](https://img.shields.io/travis/byCedric/react-promiser/master.svg?style=flat-square)](https://travis-ci.org/byCedric/react-promiser)
[![Codecov coverage](https://img.shields.io/codecov/c/github/byCedric/react-promiser.svg?style=flat-square)](https://codecov.io/gh/byCedric/react-promiser)
[![Code Climate grade](https://img.shields.io/codeclimate/maintainability/byCedric/react-promiser.svg?style=flat-square)](https://codeclimate.com/github/byCedric/react-promiser)

A react component to help manage promises

## Example

```jsx
import axios from 'axios';
import Promiser from 'react-promiser';
import { LoadingState, ErrorState, EmptyState, ResultState } from './states';

function MyComponent() {
	return (
		<Promiser auto promise={() => axios.get('https://api.example.com/my-endpoint')}>
			{({ result, error, pending, fulfilled, rejected }) => {
				if (pending) return <LoadingState />;
				if (rejected) return <ErrorState error={error} />;
				if (fulfilled && result) return <ResultState result={result} />;

				return <EmptyState />;
			}}
		</Promiser>
	);
}
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
