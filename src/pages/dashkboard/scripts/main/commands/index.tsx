import styles from './Commands.module.scss';
import { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../../../Context';
import { IScriptsApi, IScriptsCommands } from '@redux/types/scripts';
import { MdEdit, MdOutlineReorder } from "react-icons/md";
import { BiSolidDuplicate, BiTrash, BiRevision, BiSortDown } from "react-icons/bi";
import { MdDone, MdOutlineClose } from 'react-icons/md';
import { generateid } from '@utils'
import Hover from '@components/hover/Style1';
import Button from '@components/buttons/Style1';
import Icon from '@components/icons/Style1';
import Icon2 from '@components/icons/Style2';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2';
import Text from '@components/texts/Style1';
import {mouseMessage, Constant} from '../../cmds-mouse-message';

const Commands = ({script}: {script: IScriptsApi}) => {

    const {setIsTerminal, setEdit, onUpdateScript, isEdited, onSaveScript} = useContext(Context);
    const [position, setPosition] = useState(-1);
    const [resetData, setResetData] = useState<IScriptsApi | null>();

    const onReorder = (index: number) => {
        if (position === index) return setPosition(-1);
        if (position === -1) return setPosition(index);
        const newCommands = [...script.commands];
        const [moved] = newCommands.splice(position, 1);
        newCommands.splice(index, 0, moved);
        const newScript = { ...script, commands: newCommands };
        onUpdateScript(newScript);
        setPosition(-1);
    };

    const onDuplicate = (index: number) => {
        const command_to_copy = {...script.commands[index]};
        command_to_copy.name = `${command_to_copy.name.slice(0, 6)} ${generateid(1)}`;
        command_to_copy._id = undefined;
        command_to_copy.seconds = command_to_copy.seconds + 1;
        const newCommands = [...script.commands];
        newCommands.splice(index+1, 0, command_to_copy);
        const newScript = {...script, commands: newCommands};
        onUpdateScript(newScript);
    };

    const onDelete = async (indexToRemove: number) => {
        const data = { ...script };
        data.commands = data.commands.filter((_, index) => index !== indexToRemove);
        onUpdateScript(data);
        setEdit(null);
    };

    const onCheckSecondsIsCorrect = (el:  IScriptsCommands, index: number, items: IScriptsCommands[] ) => {
        const next = items[index + 1];
        if (!next) return "good"; // no next item → last element is always fine
        if (el.seconds === next.seconds) return "equal";
        if (el.seconds > next.seconds) return "greater";
        return "good";
    };

    const onManualReorder = (index: number) => {
        const new_commands = [...script.commands];
        const main = new_commands[index];
        const replace = new_commands[index+1];
        new_commands[index+1] = main;
        new_commands[index] = replace;
        onUpdateScript({...script, commands: new_commands});
    };

    const onQuickReorder = () => {
        const ordered = [...script.commands].sort((a, b) => a.seconds - b.seconds);
        onUpdateScript({ ...script, commands: ordered });
    };

    const onReset = () => {
        setResetData(script);
        onUpdateScript({...script, commands: []});
    };

    const onUndo = () => {
        if(!resetData) return;
        setResetData(null);
        onUpdateScript(resetData);
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
            
            <div className={styles.header}>
                <FlexBetween>
                    { !isEdited 
                        ? <Hover message="Esc (shortkey)"><Button label1={`Run [ ${script.commands.length} / 100 ]`} onClick={() => setIsTerminal(true)} color="dark" /></Hover>
                        : <Hover message="Save actual changes"><Button label1={`Save Changes`} onClick={onSaveScript} color="primary" /></Hover>
                    }
                    <Flex>
                        {script.commands.length >= 2 && <Hover message="Sort Seconds"><Button label1={<BiSortDown/>} onClick={onQuickReorder} color="dark" /></Hover>}
                        {(script.commands.length >= 2 && !resetData) && <Hover message="Reset"><Button label1={<BiTrash/>} onClick={onReset} color="dark" /></Hover>}
                        { resetData && <Hover message="Undo"><Button label1={<BiRevision />} onClick={onUndo} color="dark" /></Hover>}
                    </Flex>
                </FlexBetween>
            </div>

            {script.commands.map((el, index, items) => 
                <div 
                    key={el._id+el.name} 
                    className={`${styles.element} ${index===position&&styles.selected} ${position!==-1&&styles.positioning}`} 
                    style={{borderColor: el.color}} 
                    onClick={() => position !== -1 ? onReorder(index) : ""}
                >
                    <FlexBetween>
                        <Flex>
                            <Hover message={"Index"}><Text message={`${index+1}.`} color="light" /></Hover>
                            <Fragment>
                                { onCheckSecondsIsCorrect(el, index, items) === "good" && 
                                    <Hover message="Good"><Icon2 color="green"><MdDone/></Icon2></Hover>
                                }
                                { onCheckSecondsIsCorrect(el, index, items) === "equal" && 
                                    <Hover message={`[ ${index+2} ] Seconds are equal `}><Icon2 onClick={() => setEdit(el)} color="red"><MdOutlineClose/></Icon2></Hover>
                                }
                                { onCheckSecondsIsCorrect(el, index, items) === "greater"  &&
                                    <Hover message={`[ ${index+2} ] Switch`}> <Icon2 onClick={() => onManualReorder(index)} color="red"><MdOutlineClose/></Icon2></Hover>
                                }
                            </Fragment>
                            <Hover message={"Name"}><Text message={el.name.toUpperCase()} color="light" /></Hover>
                            <div className={styles.actions}><Hover message={"Instant Delete"}><Button label1={<BiTrash/>} onClick={() => onDelete(index)} /></Hover></div>
                        </Flex>
                        <div className={styles.actions}>
                            <Hover message={`Reoder ${index+1}`}><Icon onClick={() => onReorder(index)} color="dark" selected={index===position}><MdOutlineReorder/></Icon></Hover>
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
        
        </div>
    )
}

export default Commands