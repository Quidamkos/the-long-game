import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal"
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";

function App() {

    // Étape 1 : Initialisation des données
  /*const storedSettings = JSON.parse(localStorage.getItem('player')) || {};
  const storedRanks = JSON.parse(localStorage.getItem('ranks')) || { rank: [] };
  const defaultPhoto = localStorage.getItem('picture') || personna;

  // Étape 2 : Utilisation de useState
  const [userData, setUserData] = useState({
    birth: storedSettings.birth || '',
    nickname: storedSettings.nickname || '',
    experience: storedSettings.experience || 0,
    money: storedSettings.money || 0,
    rank: storedRanks.rank,
    imageBase64: defaultPhoto,
  });

  // Étape 3 : Synchronisation avec useEffect
  useEffect(() => {
    localStorage.setItem('player', JSON.stringify({
      birth: userData.birth,
      nickname: userData.nickname,
      experience: userData.experience,
      money: userData.money
    }));
    localStorage.setItem('ranks', JSON.stringify({ rank: userData.rank }));
  }, [userData]);

  // Fonction pour mettre à jour userData
  const updateUserData = (newData) => {
    setUserData(prevUserData => ({ ...prevUserData, ...newData }));
  };*/

    return (
      <>
        <SignUpModal />
        <SignInModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/private" element={<Private />}>
            <Route path="/private/private-home" element={<PrivateHome />} />
          </Route>
        </Routes>
      </>
    );
  }
  
  export default App;