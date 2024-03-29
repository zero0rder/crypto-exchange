import { Outlet } from 'react-router-dom'
import { withAuth } from './utils/session/index'
import MainHeader from './components/layout/mainHeader'
import MainFooter from './components/layout/mainFooter'
import { Layout, BackTop } from 'antd'
const { Content } = Layout

function App() {
  return (
      <Layout className="app">
        <MainHeader />
        <Content className="main-content-wrap">
          <Outlet />
        </Content>
        <MainFooter />
        <BackTop />
      </Layout>
  )
}

export default withAuth(App)