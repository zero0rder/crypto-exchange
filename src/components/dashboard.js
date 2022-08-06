import GlobalMetrics from './crypto/globalMetrics';
import Cryptos from './crypto/cryptos';

const Dashboard = () => {

    return (
        <div className="dashboard">
            <GlobalMetrics /> 
            <Cryptos limit={50} />
        </div>
    );
}


export default Dashboard;