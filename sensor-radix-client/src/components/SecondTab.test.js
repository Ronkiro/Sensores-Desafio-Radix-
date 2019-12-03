import React from 'react';
import ReactDOM from 'react-dom';
import SecondTab from './SecondTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SecondTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
