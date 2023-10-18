import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm"; 
import "../assets/css/output.css"

function LoginPage (): JSX.Element {
    return (
      <div className="h-screen">
        <Nav />
        <LoginForm />
      </div>
    );
}

export default LoginPage;
