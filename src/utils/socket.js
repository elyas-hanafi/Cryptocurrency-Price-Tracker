import { CryptoFilter } from '@/store/StoreProvider';
import { useContext, useEffect } from 'react';

export function useConnect() {
  const { state, dispatch } = useContext(CryptoFilter);
  const cryptoCoins = [
    {
      event: 'bts:subscribe',
      data: { channel: 'live_trades_btcusd' },
    },
    {
      event: 'bts:subscribe',
      data: { channel: 'live_trades_ethusd' },
    },
  ];
  const connect = () => {
    const socketUrl = 'wss://ws.bitstamp.net';
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      console.log('Connected to Bitstamp WebSocket API');

      cryptoCoins.map((coin) => {
        socket.send(JSON.stringify(coin));
      });
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.event === 'trade') {
        dispatch({
          type: 'UPDATE_VALUE',
          channel: data.channel,
          price: data.data.price_str,
        });
      }
    };
    socket.onclose = () => {
      console.log('Disconnected from Bitstamp WebSocket API');
    };

    return () => {
      socket.close();
    };
  };

  return { connect };
}
