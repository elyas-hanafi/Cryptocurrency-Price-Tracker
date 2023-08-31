import React, { useContext, useEffect } from 'react';
import { useConnect } from '@/utils/socket';
import { TableCell, TableRow } from '@mui/material';
import { CryptoFilter } from '@/store/StoreProvider';

export default function CryptoTableCell({ channel = 'btcusdt' }) {
  const { connect } = useConnect();

  const { state } = useContext(CryptoFilter);

  useEffect(() => {
    connect(channel);

    const disConnect = connect(channel);

    // return clean up
    return () => disConnect();
  }, [channel]);

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
