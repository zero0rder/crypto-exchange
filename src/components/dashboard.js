import GlobalMetrics from './crypto/globalMetrics';
import Cryptos from './crypto/cryptos';

const Dashboard = () => {

    return (
        <div className="dashboard">
            <GlobalMetrics /> 
            <Cryptos limit={10}/>
        </div>
    );
}


export default Dashboard;