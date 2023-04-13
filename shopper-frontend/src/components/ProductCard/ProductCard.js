import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ProductCardContainer, ProductCardContent } from './styled'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import GlobalStateContext from '../../global/GlobalStateContex';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductCard = (props) => {

  const { states, requests } = React.useContext(GlobalStateContext)

  const { product } = props

  let availableOrNot = product.qty_stock === 0


  const notifysuccess = () => toast.success('Produto adicionado ao carrinho!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  const notifyAlert = () => toast.info('Produto já foi adicionado ao carrinho!', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleClick = (product) => {
    const foundIndex = states.cart.findIndex((productInCart) => {
      return productInCart.id === product.id
    })

    if (foundIndex >= 0) {
      notifyAlert()
    } else {
      requests.addToCart(product)
      notifysuccess()
    }

  }

  return (
    <div>
      <ProductCardContainer>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={product.image_url}
            title="Shopper Product"
          />
          <ProductCardContent>
            <Typography variant="body2" color="text.secondary" align="center">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" align="center" color={'primary'}>
              {`R$${product.price}`}
            </Typography>
          </ProductCardContent>

          <CardActions>
            {availableOrNot
              ?
              <Button size="medium" fullWidth variant='contained'>
                Indisponível
              </Button>
              :
              <Button size="medium" fullWidth startIcon={<AddShoppingCartIcon />} onClick={() => handleClick(product)}>
                Adicionar ao carrinho
              </Button>
            }
          </CardActions>
        </Card>
      </ProductCardContainer>
      <ToastContainer />
    </div>
  )
}

export default ProductCard