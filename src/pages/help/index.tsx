import styles from './Help.module.scss';
import {mouseEvents, inputFields, commands, permissions, scripts} from './data';
import Container from '@components/containers/Style1';

const HelpPage = () => {

  return (
    <section className={styles.container}>

      <Container>
        <h2>Scripts & Credits</h2>
        {scripts.map(el => 
          <div key={el.title} className={styles.element}>
            <p>{el.title}</p>
            <p>{el.text}</p>
          </div>
        )}
      </Container>

      <Container>
        <h2>Permissions</h2>
        {permissions.map(el => 
          <div key={el.event} className={styles.element}>
            <p>{el.event}</p>
            <p>{el.text}</p>
          </div>
        )}
      </Container>

      <Container>
        <h2>Commands Layering</h2>
        {commands.map(el => 
          <div key={el.event} className={styles.element}>
            <p>{el.event}</p>
            <p>{el.text}</p>
          </div>
        )}
      </Container>

      <Container>
        <h2>Mouse Events</h2>
        {mouseEvents.map(el => 
          <div key={el.event} className={styles.element}>
            <p>{el.event}</p>
            <p>{el.text}</p>
          </div>
        )}
      </Container>

      <Container>
        <h2>Input Fields</h2>
        {inputFields.map(el => 
          <div key={el.field} className={styles.element}>
            <p>{el.field}</p>
            <p>{el.description}</p>
          </div>
        )}
      </Container>
      
    </section>
  )
}

export default HelpPage