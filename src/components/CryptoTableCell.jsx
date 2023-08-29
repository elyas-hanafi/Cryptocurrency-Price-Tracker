import React, { useContext, useEffect } from 'react';
import { useConnect } from '@/utils/socket';
import { TableCell, TableRow } from '@mui/material';
import { CryptoFilter } from '@/store/StoreProvider';

export default function CryptoTableCell({ channel = 'live_trades_btcusd' }) {
  const { connect } = useConnect(channel);
  const { state } = useContext(CryptoFilter);
  useEffect(() => {
    connect();
    const disconnect = connect();
    return () => disconnect();
  }, []);

  let tableCellData = state.pairs[channel];

  return (
    <TableRow>
      <TableCell>{tableCellData.pair ? tableCellData.pair : ''}</TableCell>
      <TableCell align="right">
        {state.status === 'loading' ? 'Loading' : tableCellData.price}
      </TableCell>
    </TableRow>
  );
}
