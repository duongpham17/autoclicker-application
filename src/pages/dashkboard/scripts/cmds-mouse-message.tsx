import { Fragment } from 'react';
import { IScriptsCommands } from '@redux/types/scripts';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Hover from '@components/hover/Style1';
import Colorblock from '@components/colorblock/Style1';
import Text from '@components/texts/Style1';
import Flex from '@components/flex/Style1';

const font_size = 13;
const font_size_seconds = 21;

export const Constant = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Seconds"}><Flex><Text message={cmd.seconds} size={font_size_seconds} /><small>s</small></Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Delay at x loop"}><Text message={`${cmd.delay_at_loop} x`} size={font_size} /></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Event"}><Text message={cmd.event} size={font_size} /></Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
}

const MouseClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Click"}><Text message={cmd.click} size={font_size} /></Hover>
        </Fragment>
    )
};

const MouseToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}><Text message={cmd.toggle} size={font_size} /></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}><Text message={cmd.click} size={font_size} /></Hover>
        </Fragment>
    )
};

const MoveMouseAndClick = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text message={cmd.xyrange} size={font_size} />&#916;</Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X, Y"}><Text message={`( ${cmd.x}, ${cmd.y} )`} size={font_size}/></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}><Text message={cmd.click} size={font_size} /></Hover>
        </Fragment>
    )
};

const MoveMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text message={cmd.xyrange} size={font_size} />&#916;</Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X, Y"}><Text message={`( ${cmd.x}, ${cmd.y} )`} size={font_size}/></Hover>
        </Fragment>
    )
};

const MoveMouseSmooth = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text message={cmd.xyrange} size={font_size} />&#916;</Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X, Y"}><Text message={`( ${cmd.x}, ${cmd.y} )`} size={font_size}/></Hover>
        </Fragment>
    )
};

const DragMouse = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Range"}><Flex><Text message={cmd.xyrange} size={font_size} />&#916;</Flex></Hover> <MdKeyboardArrowRight/>
            <Hover message={"X, Y"}><Text message={`( ${cmd.x}, ${cmd.y} )`} size={font_size}/></Hover>
        </Fragment>
    )
};

const KeyTap = ({cmd}: {cmd: IScriptsCommands}) => { 
    return (
        <Fragment>
            <Hover message={"Keyboard"}><Text message={cmd.keyboard?.substring(0, 1)} size={font_size} /></Hover>
        </Fragment>
    )
};

const KeyToggle = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}><Text message={cmd.toggle} size={font_size} /></Hover><MdKeyboardArrowRight/>
            <Hover message={"Keyboard"}><Text message={cmd.keyboard?.substring(0, 1)} size={font_size} /></Hover>
        </Fragment>
    )
};

const TypeString = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Text"}><Text message={`${cmd.type?.slice(0, 9)}...`} size={font_size}/></Hover>
        </Fragment>
    )
};

const Restart = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={"Script will restart"}><Text message={"End & Restart"} size={font_size}/></Hover>
        </Fragment>
    )
};

const GetPixelColor = ({cmd}: {cmd: IScriptsCommands}) => {
    return (
        <Fragment>
            <Hover message={cmd.pixel_color || "None"}><Colorblock color={cmd.pixel_color}/></Hover><MdKeyboardArrowRight/>
            <Hover message={"Wait"}><Text message={`${cmd.pixel_wait || 0}s`} size={font_size}/></Hover><MdKeyboardArrowRight/> 
            <Hover message={"Pixel X, Pixel Y"}><Text message={`( ${cmd.pixel_x}, ${cmd.pixel_y} )`} size={font_size}/></Hover><MdKeyboardArrowRight/>
            <Hover message={"Pixel Event"}><Text message={cmd.pixel_event} size={font_size}/></Hover> <MdKeyboardArrowRight/>
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