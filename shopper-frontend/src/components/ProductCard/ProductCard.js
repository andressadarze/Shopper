import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductCardContainer, ProductCardContent } from './styled';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import logo from "../../assets/logo.png"
import GlobalStateContext from '../../global/GlobalStateContex';

const ProductCard = (props) => {

  const { requests } = React.useContext(GlobalStateContext)

  const { product } = props

  return (
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
          <Button size="small" startIcon={<AddShoppingCartIcon />} onClick={() => requests.addToCart(product)}>
            Adicionar ao carrinho
          </Button>
        </CardActions>
      </Card>
    </ProductCardContainer>

  );
}

export default ProductCard