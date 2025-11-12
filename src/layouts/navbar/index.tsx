
import styles from './Navbar.module.scss';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks/useRedux';
import { base_url_server, environment } from 'environment';
import { MdHome, MdOutlinePerson, MdOutlineQuestionMark, MdDashboardCustomize } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Hover from '@components/hover/Style1';

import Theme from './theme';

const NavbarLayout = () => {

    const { user } = useAppSelector(state => state.authentications);

    return (
        <nav className={styles.container}>
            <div className={styles.flex}>
                {!user &&
                    <Fragment>
                        <Theme />
                        <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                        <Hover message="Home"><Link to="/local">Local</Link></Hover>
                        <Hover message="Login"><Link to="/login">Login</Link></Hover>
                    </Fragment>
                }
            </div>
            <div className={styles.flex}>
                {user && 
                    <Fragment>
                        <Theme />
                        <Hover message="Home"><Link to="/"><MdHome/></Link></Hover>
                        <Hover message="Dashboard"><Link to="/dashboard"><MdDashboardCustomize/></Link></Hover>
                        <Hover message="Help"><Link to="/help"><MdOutlineQuestionMark/></Link></Hover>
                        <Hover message="Credits"><Link to={base_url_server[environment]} target="_blank" rel="noopener noreferrer">Credits {user.credit || 0}</Link></Hover>
                        <Hover message="Profile"><Link to="/profile"><MdOutlinePerson/></Link></Hover>
                    </Fragment>
                }
            </div>
        </nav>
    )
}

export default NavbarLayout