import {TScriptsCommandsCustomised} from './cmds-mouse-actions';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2'
import Colorblock from '@components/colorblock/Style1';
import Icon from '@components/icons/Style2';
import { MdKeyboardArrowRight, MdDone, MdOutlineClose } from 'react-icons/md';
import { Fragment } from 'react/jsx-runtime';

interface Props {
    cmd: TScriptsCommandsCustomised,
    index: number,
    ctx: any
};

export const Constant = ({cmd, index, ctx}: Props) => {
    return (
        <FlexBetween>
            <Flex>
                <Hover message={"Cmd / Total"}>[ {ctx.logs.length - index}, {ctx.script?.commands.length || 0} ]</Hover>
                <Hover message={"Name"}>{cmd.name.toUpperCase()}</Hover>
            </Flex>
            <Flex>
                {cmd.delay_at_loop > 0 && <Hover message={`Delayed at x loop`}> <Flex> {cmd.delay_at_loop} {cmd.at_loop % cmd.delay_at_loop === 0 ? <Icon color="green"><MdDone /></Icon> : <Icon color="red"><MdOutlineClose /></Icon>}</Flex></Hover> } 
                <Hover message={"Time"}>{new Date(cmd.logTimestamp).toISOString().substring(11, 19)}</Hover>
            </Flex>
        </FlexBetween>
    )
};

export const Seconds = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Seconds"}>{cmd.seconds}<small>s</small></Hover> <MdKeyboardArrowRight/>
            <Hover message={"Event"}>{cmd.event}</Hover> <MdKeyboardArrowRight/>
        </Fragment>
    )
};

const MouseClick = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MouseToggle = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouseAndClick = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"X, Y"}>{`( ${cmd.x}, ${cmd.y} )`}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Click"}>{cmd.click}</Hover>
        </Fragment>
    )
};

const MoveMouse = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"X, Y"}>{`( ${cmd.x}, ${cmd.y} )`}</Hover>
        </Fragment>
    )
};

const MoveMouseSmooth = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"X, Y"}>{`( ${cmd.x}, ${cmd.y} )`}</Hover>
        </Fragment>
    )
};

const DragMouse = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"X, Y"}>{`( ${cmd.x}, ${cmd.y} )`}</Hover>
        </Fragment>
    )
};

const KeyTap = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Keyboard"}>{cmd.keyboard}</Hover>
        </Fragment>
    )
};

const KeyToggle = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Toggle"}>{cmd.toggle}</Hover> <MdKeyboardArrowRight/>
            <Hover message={"Keyboard"}>{cmd.keyboard}</Hover>
        </Fragment>
    )
};

const TypeString = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={cmd.type || "sentence"}>{cmd.type?.slice(0, 9)}...</Hover>
        </Fragment>
    )
};

const Restart = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={"Script will restart"}>END LOOP</Hover>
        </Fragment>
    )
};

const GetPixelColor = ({cmd}: Props) => {
    return (
        <Fragment>
            <Hover message={cmd.pixel_color || ""}><Colorblock color={cmd.pixel_color}/></Hover><MdKeyboardArrowRight/>
            <Hover message={"Wait"}>{Number(cmd.pixel_wait) - Number(cmd.pixel_wait_counter)}s</Hover><MdKeyboardArrowRight/>
            <Hover message={"Pixel X Y color"}>{`( ${cmd.pixel_x}, ${cmd.pixel_y} )`} </Hover> <MdKeyboardArrowRight/>
            <Hover message={"Did pixel x y color match?"}>{cmd.is_pixel_color ? <Icon color="green"><MdDone /></Icon> : <Icon color="red"><MdOutlineClose /></Icon>}</Hover> <MdKeyboardArrowRight/>
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