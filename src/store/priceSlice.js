export default function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_VALUE':
      const channel = action.channel.toLowerCase();

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
