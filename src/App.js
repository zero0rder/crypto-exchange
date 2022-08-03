import './App.css';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/layout/mainHeader';
import MainFooter from './components/layout/mainFooter';
import { Layout} from 'antd';
const { Content } = Layout;


function App() {
  return (
    <Layout className="App">
      <MainHeader />
      <Content className="main-content-wrap">
        <Outlet />
      </Content>
      <MainFooter />
    </Layout>
  );
}

export default App;
