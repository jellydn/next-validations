import { getPage } from 'next-page-tester';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Custom API page', () => {
  it('render hello api endpoint', async () => {
    const { render } = await getPage({
      nextRoot: __dirname,
      route: '/api/hello',
    });

    render();
    // FIXME: fix integration test
    expect(screen.getByText('messages')).toBeInTheDocument();
  });
});
