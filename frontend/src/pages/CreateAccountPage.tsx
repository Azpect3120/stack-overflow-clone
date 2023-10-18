import Nav from "../components/Nav";
import CreateAccountForm from "../components/CreateAccountForm";    
import "../assets/css/output.css"

function CreateAccountPage () {
    return (
        <div className="h-screen">
            <Nav />
            <CreateAccountForm />
        </div>
    );
}

export default CreateAccountPage;   
