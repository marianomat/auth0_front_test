import logo from './logo.svg';
import './App.css';
import LoginButton from "./components/login";
import Profile from "./components/profile";
import LogoutButton from "./components/logout";

function App() {
  return (
    <div className="App">
      <LoginButton/>
        <Profile/>
        <LogoutButton/>
    </div>
  );
}

export default App;
