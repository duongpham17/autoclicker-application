import styles from './Commands.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi } from '@redux/types/scripts';
import { MdEdit, MdOutlineReorder } from "react-icons/md";
import { BiSolidDuplicate } from "react-icons/bi";
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';
import Icon from '@components/icons/Style1';
import Line from '@components/line/Style1';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2';
import Text from '@components/texts/Style1';
import {mouseMessage, Constant} from '../../cmds-mouse-message';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {setIsTerminal, setEdit, setScript, onUpdateScript, loading, isEdited, onSaveScript, onDeleteScript} = useContext(Context);

    const [position, setPosition] = useState(-1);

    const onMove = (index: number) => {
        if (position === index) return setPosition(-1);
        if (position === -1) return setPosition(index);
        const newCommands = [...script.commands];
        const [moved] = newCommands.splice(position, 1);
        newCommands.splice(index, 0, moved);
        const newScript = { ...script, commands: newCommands };
        setScript(newScript);
        onUpdateScript(newScript);
        setPosition(-1);
    };

    const onDuplicate = (index: number) => {
        const command_to_copy = {...script.commands[index]};
        command_to_copy.name = `Dup ${command_to_copy.name}`;
        command_to_copy._id = undefined;
        command_to_copy.seconds = command_to_copy.seconds + 1;
        const newCommands = [...script.commands];
        newCommands.splice(index+1, 0, command_to_copy);
        const newScript = {...script, commands: newCommands};
        setScript(newScript);
        onUpdateScript(newScript);
    };

    useEffect(() => {
    const handleEsc = ({ code, key }: KeyboardEvent) => {
        if (code === 'Escape' || key === 'Escape') {
            if(isEdited) return onSaveScript();
            setIsTerminal(true);
        };
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
    }, [isEdited, onSaveScript, setIsTerminal]);

    return (
        <div className={styles.container}>

            
            <div className={styles.run}>
                { !isEdited 
                    ? <Hover message="Esc (shortkey)"><Button label1={`Run Script [ ${script.commands.length} / 100 ]`} onClick={() => setIsTerminal(true)} color="dark" /></Hover>
                    : <Hover message="Save to database"><Button label1={`Save changes`} onClick={onSaveScript} color="primary" /></Hover>
                }
            </div>
            

            {script.commands.map((el, index) => 
                <div className={`${styles.element} ${index === position ? styles.selected : ""}`} style={{borderColor: el.color}} key={el._id+el.name}>
                    
                    <FlexBetween>
                        <Hover message={"Name"}><Text message={`${index+1}. ${el.name.toUpperCase()}s`} color="light" /></Hover>
                        <div className={styles.actions}>
                            <Hover message={`Reoder ${index+1}`}><Icon onClick={() => onMove(index)} color="dark" selected={index===position}><MdOutlineReorder/></Icon></Hover>
                            <Hover message="Duplicate"><Icon onClick={() => onDuplicate(index)} color="dark"><BiSolidDuplicate /></Icon></Hover>
                            <Hover message="Edit"><Icon onClick={() => setEdit(el)} color="dark"><MdEdit /></Icon></Hover>
                        </div>
                    </FlexBetween>
                    
                    <Flex>                          
                        <Constant cmd={el} />

                        {el.event && (() => {
                            const EventComponent = mouseMessage[el.event as keyof typeof mouseMessage];
                            return EventComponent ? (<EventComponent cmd={el} /> ) : null;
                        })()}
            
                        {el.event === "getPixelColor" && el.event && (() => {
                            const PixelComponent = mouseMessage[el.pixel_event as keyof typeof mouseMessage];
                            return PixelComponent ? ( <PixelComponent cmd={el} /> ) : null;
                        })()}
                    </Flex>
                    
                </div>
            )}

            <Line />
            
            {script.commands.length >= 2 && <Button label1="Delete Script" warning color="dark" onClick={onDeleteScript} loading={loading}/>}

        </div>
    )
}

export default Commands