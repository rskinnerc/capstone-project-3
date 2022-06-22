import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import App from './App'
import store from './redux/configureStore'

describe("The full App with routes", () => {
  it("should render the home page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('The Games Database')).toBeInTheDocument();
    expect(screen.queryByText('STATS BY GENRE')).toBeInTheDocument();
  });

  it("should render the genre page", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/action']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const breakdownText = await screen.findByText('ACTION GAMES BREAKDOWN', { exact: false });
    const countText = await screen.findByText('Games Count', { exact: false });

    expect(breakdownText).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  })

  it("should get back from the genre page to the home page with the back button", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/genre/action']} initialIndex={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const backButton = await screen.findByTestId('backButton');
    userEvent.click(backButton);

    const headingText = await screen.findByText("The largest video games database.");
    expect(headingText).toBeInTheDocument();
  })
})