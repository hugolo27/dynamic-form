import React from 'react';
import { render, screen } from '@testing-library/react';
import FormDemo from './FormDemo';

test('renders learn react link', () => {
  render(<FormDemo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
