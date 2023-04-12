import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductCardContainer, ProductCardContent } from './styled';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GlobalStateContext from '../../global/GlobalStateContex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCard = (props) => {

  const { requests } = React.useContext(GlobalStateContext)

  const { product } = props

  const notify = () => toast.success('Produto adicionado ao carrinho!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  const handleClick = (product) => {
    requests.addToCart(product)
    notify()
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
            <Button size="small" startIcon={<AddShoppingCartIcon />} onClick={() => handleClick(product)}>
              Adicionar ao carrinho
            </Button>
          </CardActions>
        </Card>
      </ProductCardContainer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
}

export default ProductCard