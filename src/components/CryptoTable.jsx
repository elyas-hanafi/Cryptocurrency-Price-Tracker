'use client';
import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useConnect } from '@/utils/socket';
import { CryptoFilter } from '@/store/StoreProvider';
export default function CryptoTable() {
  const [searchQuery, setSearchQuery] = useState('');

  const { state } = useContext(CryptoFilter);

  const { connect } = useConnect();

  useEffect(() => {
    connect();
    const disconnect = connect();
    return () => disconnect();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = Object.values(state.pairs).filter((crypto) =>
    crypto.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Container>
      <h1 style={{ color: 'white' }}>Cryptocurrency Price Tracker</h1>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price ( $ )</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((pair) => {
              return (
                <TableRow key={pair.id}>
                  <TableCell>{pair.pair}</TableCell>
                  <TableCell align="right">
                    {state.status === 'loading' ? 'Loading' : pair.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
