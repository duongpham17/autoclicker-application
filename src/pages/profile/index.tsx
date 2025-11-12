import styles from './Profile.module.scss';
import Logout from './logout';
import Email from './email';
import Password from './password';

const ProfilePage = () => {

    return (
        <div className={styles.container}>
            <Logout />
           
            <Email />
           
            <Password/>
        </div>
    )
}

export default ProfilePage