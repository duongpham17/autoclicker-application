import { useNavigate } from 'react-router-dom';
import { user_authentication } from '@localstorage';
import Container from '@components/containers/Style1';

const Logout = () => {

    const navigate = useNavigate();

    const logout = () => {
        user_authentication.remove();
        navigate("/");
        setTimeout(() => window.location.reload(), 1000)
    };
    
    return (
        <Container>
            <button onClick={logout}>Logout</button>
        </Container>
    )
}

export default Logout