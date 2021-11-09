import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Homepage from './components/homepage';
import CryptoDetail from './components/cryptoDetail';
import Cryptocurrencies from './components/cryptocurrencies';
import Exchanges from './components/exchanges';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navigation />
          <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/cryptocurrencies" component={Cryptocurrencies} />
              <Route exact path="/crypto/:coinId" component={CryptoDetail} />
              <Route exact path="/exchanges" component={Exchanges} />
          </Switch>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
