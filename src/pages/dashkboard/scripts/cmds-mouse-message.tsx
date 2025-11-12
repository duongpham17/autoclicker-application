import { Fragment } from 'react';
import { IScriptsCommands } from '@redux/types/scripts';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Hover from '@components/hover/Style1';
import Colorblock from '@components/colorblock/Style1';

export const Constant = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Seconds"}>{cmd.seconds}<small>s</small></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Delay at x loop"}>{cmd.delay_at_loop}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Event"}>{cmd.event}</Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
}

const MouseClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MouseToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouseAndClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"X, Y"}>{`( ${cmd.x}, ${cmd.y} )`}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"(X, Y)"}>{`(${cmd.x}, ${cmd.y})`}</Hover>
        </Fragment>
    )
};

const MoveMouseSmooth = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"(X, Y)"}>{`(${cmd.x}, ${cmd.y})`}</Hover>
        </Fragment>
    )
};

const DragMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"(X, Y)"}>{`(${cmd.x}, ${cmd.y})`}</Hover>
        </Fragment>
    )
};

const KeyTap = ({cmd}: {cmd: IScriptsCommands}) => { 
    return (
        <Fragment>
            <Hover message={"Keyboard"}>{cmd.keyboard}</Hover>
        </Fragment>
    )
};

const KeyToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Keyboard"}>{cmd.keyboard}</Hover>
        </Fragment>
    )
};

const TypeString = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={cmd.type || "sentence"}>{cmd.type?.slice(0, 9)}...</Hover>
        </Fragment>
    )
};

const Restart = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Script will restart"}>END LOOP</Hover>
        </Fragment>
    )
};

const GetPixelColor = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={cmd.pixel_color || "None"}><Colorblock color={cmd.pixel_color}/></Hover><MdKeyboardArrowRight/>
            <Hover message={"Wait"}>{cmd.pixel_wait || 0}s</Hover><MdKeyboardArrowRight/> 
            <Hover message={"Pixel X, Pixel Y"}>{`( ${cmd.pixel_x}, ${cmd.pixel_y} )`}</Hover><MdKeyboardArrowRight/>
            <Hover message={"Pixel Event"}>{cmd.pixel_event}</Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

export const mouseMessage = {
    mouseClick: MouseClick,
    mouseToggle: MouseToggle,
    moveMouseAndClick: MoveMouseAndClick,
    moveMouse: MoveMouse,
    moveMouseSmooth: MoveMouseSmooth,
    dragMouse: DragMouse,
    keyTap: KeyTap,
    keyToggle: KeyToggle,
    typeString: TypeString,
    restart: Restart,
    getPixelColor: GetPixelColor
}