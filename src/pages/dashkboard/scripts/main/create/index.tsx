import { useContext, useState } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { generateid } from '@utils';
import validation from './validation';
import useForm from '@hooks/useForm';
import Button from '@components/buttons/Style1';
import Text from '@components/texts/Style1';
import Container from '@components/containers/Style1';
import {Constant, mouseEvents} from '../../cmds-mouse-create';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {onUpdateScript} = useContext(Context);

    const [maxCmd, setMaxCmd] = useState(false);

    const initialState: IScriptsCommands = {
        name: generateid(1),
        seconds: 0,
        delay_at_loop: 0,
        color: "#191919",
        event: "mouseClick",
        click: "left",
        toggle: "down",
        keyboard: undefined,
        type: undefined,
        x: undefined,
        y: undefined,
        pixel_event: undefined,
        pixel_color: undefined,
        pixel_x: undefined,
        pixel_y: undefined,
        pixel_wait: undefined,
    };

    const {onChange, onSubmit, onSetValue, values, onClear, edited} = useForm(initialState, callback, validation);

    async function callback(){
        if(script.commands.length >= 100) return setMaxCmd(true)
        const data = {...script};
        values.seconds = Number(values.seconds);
        values.delay_at_loop = Number(values.delay_at_loop);
        ["toggle", "keyboard", "type", "x", "y", "pixel_event", "pixel_x", "pixel_y"].forEach((key) => {
            if (!values[key as keyof IScriptsCommands]) delete values[key as keyof IScriptsCommands];
        });
        data.commands = [...data.commands, values];
        await onUpdateScript(data);
        onClear(initialState);
        setMaxCmd(false);
    };

    return (
        <form onSubmit={onSubmit}>

            {maxCmd && 
                <Container>
                    <Text message="Max 100 commands per script." color="red"/>
                </Container>
            }
            <Container>
                <Constant onChange={onChange} values={values} onSetValue={onSetValue} />
            </Container>

            {values.event && (() => {
                const EventComponent = mouseEvents[values.event as keyof typeof mouseEvents];
                return EventComponent ? (<Container><EventComponent onChange={onChange} values={values} onSetValue={onSetValue} /></Container>  ) : null;
            })()}

            {values.event === "getPixelColor" && values.pixel_event && (() => {
                const PixelComponent = mouseEvents[values.pixel_event as keyof typeof mouseEvents];
                return PixelComponent ? ( <Container><PixelComponent onChange={onChange} values={values} onSetValue={onSetValue} /></Container> ) : null;
            })()}

            { edited && <Container><Button label1="Create" color='primary' type="submit" /></Container> }

        </form>
    );
};

export default Commands