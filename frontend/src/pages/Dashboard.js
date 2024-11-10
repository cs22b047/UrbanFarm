import PlantList from '../components/PlantDisplay';
import WeatherComponent from '../components/WeatherAPI';
// import './dashboard.css';

const Dashboard = () => {
    return (
        <>
            <div className='m-10 flex'>
                <WeatherComponent></WeatherComponent>
                <PlantList></PlantList>
            </div>
        </>
    )
}

export default Dashboard;