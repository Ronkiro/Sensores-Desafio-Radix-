import React from 'react';
import ReactDOM from 'react-dom';
import FirstTab from './FirstTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirstTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
