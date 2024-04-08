import Button from "react-bootstrap/Button";
import "./home.css";
import LoginForm from "../../components/loginForm/loginForm";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">NetChill</h1>
      <LoginForm />
    </div>
  );
};

export default Home;
