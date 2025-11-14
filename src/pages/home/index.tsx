import styles from './Home.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import { base_url_server } from 'environment';
import Container from '@components/containers/Style1';

const HomePage = () => {
  const {user} = useAppSelector(state => state.authentications)

  return (
    <div className={styles.container}>

        <section>
          <Container>
            <Link to={base_url_server.production} target="_blank" rel="noopener noreferrer"><img src={process.env.PUBLIC_URL + '/logo512.png'} alt="Logo" /></Link>
          </Container>
        </section>

        <section>
          <Container>
            {user 
              ? <Link to="/dashboard">Get started making scripts.</Link>
              : <Link to="/login">Login and create an account</Link>
            }
          </Container>
        </section>

        <section>
          <Container>
            <Link to={base_url_server.production} target="_blank" rel="noopener noreferrer">I want to buy more scripts </Link>
          </Container>
        </section>

    </div>
  )
}

export default HomePage