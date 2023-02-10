import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import Feedback from '../pages/Feedback';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { wait } from '@testing-library/user-event/dist/utils';

describe('Teste o componente Feedback.js', () => {
  it('Testa se os componentes renderizam na tela', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const headerText = screen.getByTestId('header-text');
    const feedbackText = screen.getByTestId('feedback-text');
    const allBtn = screen.getAllByRole('button');

    expect(feedbackText).toHaveTextContent('Could be better...');
    expect(headerText).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(allBtn).toHaveLength(2);
  });
  it('Testa mensagem negativa de acertos', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />);
    store.getState().player.assertions = 5;
    act(() => {
      history.push('/feedback');
    })
    await waitFor(() => {
      const feedbackText = screen.getByTestId('feedback-text');
      expect(feedbackText).toHaveTextContent('Well Done!');
    }, 2000);

  });
  it('Testa clique do botão Play Again', async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    expect(history.location.pathname).toBe('/feedback')
    await waitFor(() => {
      const playAgainBtn = screen.getByTestId('btn-play-again');
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/')
    }, 2000);
  })
  it('Testa clique do botão Ranking', async() => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/feedback');
    });
    expect(history.location.pathname).toBe('/feedback')
    await waitFor(() => {
      const playAgainBtn = screen.getByTestId('btn-ranking');
      userEvent.click(playAgainBtn);
      expect(history.location.pathname).toBe('/ranking')
    }, 2000);
  })
});