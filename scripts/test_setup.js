const enzyme = require('enzyme'); // eslint-disable-line
const Adapter = require('enzyme-adapter-react-16'); // eslint-disable-line

enzyme.configure({ adapter: new Adapter() });
