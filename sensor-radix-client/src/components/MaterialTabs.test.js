import React from 'react';
import ReactDOM from 'react-dom';
import MaterialTabs from './MaterialTabs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MaterialTabs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
