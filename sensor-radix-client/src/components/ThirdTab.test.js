import React from 'react';
import ReactDOM from 'react-dom';
import ThirdTab from './ThirdTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThirdTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
