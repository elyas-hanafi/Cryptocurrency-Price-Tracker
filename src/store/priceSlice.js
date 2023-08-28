export const initialState = {
  pairs: {
    live_trades_btcusd: {
      id: 'live_trades_btcusd',
      pair: 'btc/usd',
      price: '26000',
    },
    live_trades_ethusd: {
      id: 'live_trades_ethusd',
      pair: 'eth/usd',
      price: '1600',
    },
  },
  status: 'loading',
};
export default function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      const channel = action.channel;
      console.log(channel);
      return {
        ...state,
        pairs: {
          ...state.pairs,
          [channel]: {
            ...state.pairs[channel],
            price: `${action.price}`,
          },
        },
        status: 'idle',
      };

    default:
      break;
  }
}
