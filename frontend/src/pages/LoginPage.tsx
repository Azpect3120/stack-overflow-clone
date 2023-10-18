import Nav from "../components/Nav";
import GargabeFooter from "../components/GargabeFooter";
import LoginForm from "../components/LoginForm"; 

function LoginPage (): JSX.Element {
    return (
      <>
        <Nav />
        <LoginForm />
        <GargabeFooter />
      </>
    );
}

export default LoginPage;