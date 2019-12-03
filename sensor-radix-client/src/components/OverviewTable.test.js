import React from 'react';
import ReactDOM from 'react-dom';
import OverviewTable from './OverviewTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OverviewTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
