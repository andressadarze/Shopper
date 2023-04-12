import { ContainerDiv } from "./styled"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #00A978 ',
    boxShadow: 24,
    p: 4,
};


const OrderSuccessModal = (props) => {

    const { orderSuccessModal, closeModal } = props

    const order = orderSuccessModal.summary
    const open = orderSuccessModal.isActive

    return (
        <ContainerDiv>
            <Modal
                keepMounted
                open={open}
                onClose={closeModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>

                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Pedido realizado com sucesso!
                    </Typography>

                    <Typography id="keep-mounted-modal-title" variant="h5" component="h2">
                        Resumo do Pedido
                    </Typography>

                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <Typography>
                            Id: {order?.id}
                        </Typography>

                        <Typography>
                            Nome: {order?.userName}
                        </Typography>

                        <Typography>
                            Data de entrega: {order?.deliveryDate}
                        </Typography>

                        {order?.shoppingList.map((product) => (
                            <Typography>
                                {`${product.productName} - R$${product.price} X ${product.quantity}`}
                            </Typography>
                        ))}
                        Total: R${order?.total.toFixed(2)}

                    </Typography>
                </Box>
            </Modal>
        </ContainerDiv>
    )
}

export default OrderSuccessModal