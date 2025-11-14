
import styles from './Navbar.module.scss';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks/useRedux';
import { base_url_server, environment } from 'environment';
import { MdHome, MdOutlinePerson, MdOutlineQuestionMark, MdDashboardCustomize } from "react-icons/md";
import Flex from '@components/flex/Style1';
import Hover from '@components/hover/Style1';

import Theme from './theme';

const NavbarLayout = () => {

    const { user } = useAppSelector(state => state.authentications);

    return (
        <nav className={styles.container}>
            <Flex>
                {!user &&
                    <Fragment>
                        <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                        <Theme />
                        <Hover message="Login"><Link to="/login">Login</Link></Hover>
                    </Fragment>
                }
            </Flex>
            <Flex>
                {user && 
                    <Fragment>
                        <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                        <Hover message="Dashboard"><Link to="/dashboard"><MdDashboardCustomize/></Link></Hover>
                        <Hover message="Help"><Link to="/help"><MdOutlineQuestionMark/></Link></Hover>
                        <Hover message="Credits"><Link to={base_url_server[environment]} target="_blank" rel="noopener noreferrer">{user.credit || 0}</Link></Hover>
                        <Theme />
                        <Hover message="Profile"><Link to="/profile"><MdOutlinePerson/></Link></Hover>
                    </Fragment>
                }
            </Flex>
        </nav>
    )
}

export default NavbarLayout