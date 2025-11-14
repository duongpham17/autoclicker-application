import { useAppSelector } from '@redux/hooks/useRedux';

const Email = () => {

    const {user} = useAppSelector(state => state.authentications);

    return (
        <>
            <p>{user?.email}</p>
        </>
    )
}

export default Email