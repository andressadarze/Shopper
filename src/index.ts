import app from "./app"
import { orderRouter } from "./router/orderRouter"
import { productRouter } from "./router/productRouter"

app.use("/product", productRouter)
app.use("/order", orderRouter)