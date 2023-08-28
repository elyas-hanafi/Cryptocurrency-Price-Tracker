export const initialState = {
  pairs: {
    live_trades_btcusd: {
      id: 'live_trades_btcusd',
      pair: 'btc/usd',
      price: 'Loading',
    },
    live_trades_ethusd: {
      id: 'live_trades_ethusd',
      pair: 'eth/usd',
      price: 'Loading',
    },
    live_trades_xrpusd: {
      id: 'live_trades_xrpusd',
      pair: 'xrp/usd',
      price: 'Loading',
    },
    live_trades_linkusd: {
      id: 'live_trades_linkusd',
      pair: 'link/usd',
      price: 'Loading',
    },
    live_trades_manausd: {
      id: 'live_trades_manausd',
      pair: 'mana/usd',
      price: 'Loading',
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
