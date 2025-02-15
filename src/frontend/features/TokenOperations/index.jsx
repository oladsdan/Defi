import { Button, Divider, Grid, Typography, useTheme, TextField } from '@mui/material';
//now we want to perfom token interactions
import { useState, useEffect, useCallbaclk, useCallback } from 'react';
import { ethers } from 'ethers';

import TokenABI from "../../contracts/SimpleDeFiToken.json";
import TokenAddresss from "../../contracts/SimpleDeFiToken-address.json";
import { useWeb3React } from '@web3-react/core'; //this is used to get wallet connection state
import { localProvider } from '../../components/Wallet';

const TokenOperations = () => {
  
  const [totalSupply, setTotalSupply] = useState(0);
  const [yourBalance, setYourBalance] = useState(0);


  const getTotalSupply = useCallback(async () => {
    try {
      const contract = new ethers.Contract(TokenAddresss.address, TokenABI.abi, localProvider);
      const supply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatEther(supply));
    } catch (error) {
      console.error("cannot get total supply", error); 
    }
  }, []);

  const theme = useTheme();

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h6'>Simple DeFi Token</Typography></Grid>
      <Grid item xs={6}>
        <Typography variant='h6'>Total Supply</Typography>
        <Typography>{totalSupply}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h6'>Your Balance</Typography>
        <Typography>{yourBalance}</Typography>
      </Grid>
    </Grid>
    <Divider sx={theme.component.divider} />
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h6'>Normal Transfer</Typography></Grid>
      <Grid item xs={12}>
        <TextField label="Please Enter Recipient's Address" value={""} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Please Enter Amount to transfer" value={""} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Button sx={theme.component.primaryButton} fullWidth>Transfer!</Button>
      </Grid>
    </Grid>
    <Divider sx={theme.component.divider} />
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h6'>Transfer with Burn</Typography></Grid>
      <Grid item xs={12}>
        <TextField label="Please Enter Recipient's Address" value={""} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Please Enter Amount to transfer (10% of tokens will be burnt automatically)" value={""} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Button sx={theme.component.primaryButton} fullWidth>Transfer with Burn!</Button>
      </Grid>
    </Grid>
  </>;
};

export default TokenOperations;