import { CryptoFilter } from '@/store/StoreProvider';
import { useContext, useEffect } from 'react';
const cryptoCoins = [
  {
    event: 'bts:subscribe',
    data: { channel: 'live_trades_btcusd' },
  },
  {
    event: 'bts:subscribe',
    data: { channel: 'live_trades_ethusd' },
  },
  {
    event: 'bts:subscribe',
    data: { channel: 'live_trades_xrpusd' },
  },
  {
    event: 'bts:subscribe',
    data: { channel: 'live_trades_linkusd' },
  },
  {
    event: 'bts:subscribe',
    data: { channel: 'live_trades_manausd' },
  },
];
export function useConnect(live_trades_channel) {
  const { state, dispatch } = useContext(CryptoFilter);
  const connect = () => {
    const socketUrl = 'wss://ws.bitstamp.net';
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      console.log('Connected to Bitstamp WebSocket API');

      socket.send(
        JSON.stringify({
          event: 'bts:subscribe',
          data: { channel: `${live_trades_channel}` },
        })
      );
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('data :', data);
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
