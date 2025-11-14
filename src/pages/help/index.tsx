import styles from './Help.module.scss';
import useOpen from '@hooks/useOpen';
import {mouseEvents, inputFields, seconds, permissions, scripts} from './data';
import Container1 from '@components/containers/Style1';
import Button from '@components/animations/buttons/Style1';
import Text from '@components/texts/Style2';

const HelpPage = () => {

  const {onOpenArray, array} = useOpen({})

  const informations = [mouseEvents, inputFields, seconds, permissions, scripts];

  return (
    <div className={styles.container}>
      
      {informations.map((el) =>
        <section key={el.title}>
          <h2>{el.title}</h2>
          {el.data.map(el => 
            <div key={el.sub}>
              <Container1 color="dark">
                <Button onClick={() => onOpenArray(el.sub)} open={array.includes(el.sub)}>{el.sub}</Button>
                {array.includes(el.sub) && <Text message={el.text} color="light" />}
              </Container1>
            </div>
          )}
        </section>
      )}
    
    </div>
  )
}

export default HelpPage