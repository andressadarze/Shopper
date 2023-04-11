import { ThemeProvider } from "@mui/material/styles"
import theme from "./constants/theme"
import Header from "./components/Header/Header"
import Router from "./routes/Router"
import { BrowserRouter } from "react-router-dom"
import GlobalState from "./global/GlobalState"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </GlobalState>

    </ThemeProvider>
  );
}

export default App;
