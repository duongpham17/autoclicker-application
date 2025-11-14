import { useContext, Fragment } from 'react';
import { capitalise } from '@utils';
import { Context } from 'themes'; 
import { ThemeCycle } from 'themes/Data';
import Message from '@components/hover/Style1';

const Theme = () => {

    const { onSetTheme, theme } = useContext(Context);

    return (
        <Fragment>
            {ThemeCycle.map(el => {
                const Icon = el.icon;
                if(theme.name !== el.name) return "";
                return (
                    <Message message={capitalise(el.name)} key={el.name}>
                        <button onClick={onSetTheme}>
                            <Icon />
                        </button>
                    </Message>
                );
            })}
        </Fragment>
    );
};

export default Theme;
