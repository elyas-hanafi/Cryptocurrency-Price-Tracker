import { CryptoFilter } from '@/store/StoreProvider';
import { useContext } from 'react';

export const useConnect = () => {
  const { state, dispatch } = useContext(CryptoFilter);

  const connect = (channel) => {
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${channel}@trade`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data.p);
      if (data.e == 'trade') {
        dispatch({
          type: 'UPDATE_VALUE',
          channel: data.s,
          price: price,
        });
      }
    };

    ws.onclose = () => {
      console.log('Disconnect To Binance Websocket Api');
    };

    return () => {
      ws.close;
    };
  };
  return { connect };
};
