import MainPage from './pages/MainPage';
import useMainPageController from './controllers/MainPageController';

function App() {
  const mainPageProps = useMainPageController();
  return <MainPage {...mainPageProps} />;
}

export default App;
