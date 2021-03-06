import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/configureStore';
import App from '../App';
import { server } from '../mocks/server';

describe('The home page functionality', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should load the games for a given genre from the API and list them from Redux store', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/action']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    const gamesBreakdownText = await screen.findByText('GAMES BREAKDOWN', { exact: false });
    const votesText = await screen.findAllByText('votes', { exact: false });
    expect(gamesBreakdownText).toBeInTheDocument();
    expect(votesText.length).toBeGreaterThan(0);
  });

  it('should have the heading containing the games count for a given genre', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/action']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    const gamesCountText = await screen.findByText('Games Count:', { exact: false });
    expect(gamesCountText).toBeInTheDocument();
  });

  it('should maintain th sam snapshot between renders', async () => {
    const dom = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/action']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => expect(dom).toMatchSnapshot());
  });
});
