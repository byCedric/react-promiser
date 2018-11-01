import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-chain';
import 'jest-enzyme';

configure({ adapter: new Adapter() });
