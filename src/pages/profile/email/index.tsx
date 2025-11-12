import { useAppSelector } from '@redux/hooks/useRedux';
import Container from '@components/containers/Style1';
const Email = () => {

    const {user} = useAppSelector(state => state.authentications);

    return (
        <Container>
            <p>{user?.email}</p>
        </Container>
    )
}

export default Email