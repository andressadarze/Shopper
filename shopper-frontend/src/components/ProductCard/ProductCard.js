import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductCardContainer, ProductCardContent } from './styled';

const ProductCard = (props) => {

  const { name, price } = props

  return (
    <ProductCardContainer>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://revistaoeste.com/wp-content/uploads/2021/12/og-logo-600x314.png"
          title="Shopper Product"
        />
        <ProductCardContent>
          <Typography gutterBottom variant="h5" component="div" align="center" color={'primary'}>
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {name}
          </Typography>
        </ProductCardContent>
        <CardActions>
          <Button size="small">Adicionar ao carrinho</Button>
        </CardActions>
      </Card>
    </ProductCardContainer>

  );
}

export default ProductCard