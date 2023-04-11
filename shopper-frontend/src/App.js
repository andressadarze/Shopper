import { ThemeProvider } from "@mui/material/styles"
import theme from "./constants/theme"
import Header from "./components/Header/Header"
import Router from "./routes/Router"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
