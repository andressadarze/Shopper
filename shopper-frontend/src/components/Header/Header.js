import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { goToStock, goToCart, goToHome} from '../../routes/coordinator'
import { useNavigate } from 'react-router-dom'
import { IconButton } from "@mui/material"
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {grey} from "@mui/material/colors"

const Header = () => {
  const navigate = useNavigate()

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopper.com.br
          </Typography>

          <IconButton aria-label='home' onClick={() => goToHome(navigate)}>
          <HomeOutlinedIcon sx={{color: grey['A100']}} />
          </IconButton>

          <IconButton aria-label="stock" onClick={() => goToStock(navigate)}>
                <Inventory2OutlinedIcon sx={{color: grey['A100']}}/>
          </IconButton>

          <IconButton aria-label="cart" onClick={() => goToCart(navigate)}>
                <ShoppingCartOutlinedIcon sx={{color: grey['A100']}}/>
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>


  );
}

export default Header