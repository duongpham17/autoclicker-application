import styles from './Terminal.module.scss';
import { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Context } from '../Context';
import { generateid, secondsToMinutes } from '@utils';
import { robotData, keyBy, TScriptsCommandsCustomised } from './cmds-mouse-actions';
import { Constant, Seconds, mouseMessage } from './cmds-mouse-message';
import { MdExitToApp } from 'react-icons/md';
import Cover from '@components/covers/Style1';
import Button from '@components/buttons/Style1';
import Hover from '@components/hover/Style1';
import Flex from '@components/flex/Style1';
import FlexBetween from '@components/flex/Style2'
import Range from '@components/ranges/Style1';
import Progress from '@components/progress/Style1';

const Terminal = () => {

  const {setIsTerminal, isTerminal, script} = useContext(Context);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [looped, setLooped] = useState<number>(1);
  const [logs, setLogs] = useState<TScriptsCommandsCustomised[] | []>([]);

  const onStart = useCallback(() => {
    setLogs([]);
    if (!script || !script.commands.length) return;

    const [commands, max_seconds] = [keyBy(script.commands, "seconds"), script.commands.slice(-1)[0].seconds];
    let timeoutId: ReturnType<typeof setTimeout>;
    let [second_counter, loop_counter, pixel_wait_counter, is_pixel_color] = [seconds, 1, 0, false];

    const reset = () => {
      loop_counter++;
      second_counter = 0;
      pixel_wait_counter = 0;
      is_pixel_color = false;
      setLooped((state) => state + 1);
      setLogs([]);
    };

    const update = (cmd: TScriptsCommandsCustomised) => {
      setLogs((state) => [cmd, ...state.filter(el => el.name !== cmd.name)]);
    };

    const wait = () => {
      pixel_wait_counter += 1;
      second_counter -= 1;
    };

    const ctxOutside = { reset, update, wait };

    const loop = () => {
      const isMaxLoops = loop_counter >= script.max_loop;
      if (isMaxLoops) return clearTimeout(timeoutId);

      second_counter = Math.round((second_counter + 0.1) * 100) / 100;
      const isMaxSecondsForLoop = second_counter > max_seconds;
      if (isMaxSecondsForLoop) reset();

      const cmd = commands[second_counter] as TScriptsCommandsCustomised;
      if (cmd?.event) {
        const ctxInside = { pixel_wait_counter };
        const entry = robotData[cmd.event];
        switch(cmd.event){
          case "getPixelColor": {
            const is_pixel_color: any = entry.handler(cmd, ctxOutside, ctxInside);
            update({...cmd, logTimestamp: Date.now(), at_loop: loop_counter, pixel_wait_counter, is_pixel_color });
            break
          };
          case "restart":{
            entry.handler(cmd, ctxOutside, ctxInside);;
            break
          }
          default: {
            entry.handler(cmd, ctxOutside, ctxInside);
            update({...cmd, logTimestamp: Date.now(), at_loop: loop_counter, pixel_wait_counter, is_pixel_color });
            break
          }
        }
      };

      setSeconds(second_counter);
      timeoutId = setTimeout(loop, 100);
      setIntervalId(timeoutId);
    };

    loop();
  
  }, [script, seconds]);

  const onReset = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setSeconds(0);
    setLooped(1);
  }, [intervalId]);

  const onStop = useCallback((): void => {
    onReset();
  }, [onReset]);

  const onExitTerminal = useCallback((): void => {
    setIsTerminal(false);
    onStop();
  }, [onStop, setIsTerminal]);
  
  useEffect(() => {
    const handleSpacebar = ({ code, key }: KeyboardEvent) => {
      if (code !== 'Space' && key !== ' ' && key !== 'Spacebar') return;
      intervalId ? onStop() : onStart();
    };
    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, [intervalId, onStop, onStart]);

  useEffect(() => {
    const handleEsc = ({ code, key }: KeyboardEvent) => {
      if (code === 'Escape' || key === 'Escape') onExitTerminal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onExitTerminal]);

  const customData = useMemo(() => {
    if(!script || !script.commands.length) return {max: 0, minutes: 9};
    return {
      max: script?.commands.slice(-1)[0].seconds,
      minutes: secondsToMinutes(script?.commands.slice(-1)[0].seconds * script.max_loop)
    };
  }, [script]);

  return ( !isTerminal ? <div></div> :
    <Cover onClose={() => {}}>
      
      <div className={styles.container}>

        <div className={styles.header}>
          <FlexBetween>
            <Hover message="Space bar">{!intervalId ? <button onClick={onStart}>Start</button> : <button onClick={onStop}>Stop</button>}</Hover>
            <Hover message={`Looped / Max / ${customData.minutes}`}>{looped} / {script?.max_loop}</Hover>
            <Hover message={`Seconds / Max`}>{seconds.toFixed(2)} / {customData.max.toFixed(2)}</Hover>
          </FlexBetween>

          {script && logs.length < script.commands.length && (
            intervalId 
            ?
              <div className={styles.progress}>
                <Progress value={seconds} max={script.commands[logs.length].seconds} />
                <FlexBetween>
                  <Hover message={"Next Command"}>
                    {script.commands[logs.length].name.toUpperCase()} - {logs.length+1} / {script.commands.length}
                  </Hover>
                  <Hover message={"Seconds"}>
                    {script.commands[logs.length].seconds}
                  </Hover>
                </FlexBetween>
              </div>
            :
              <Range type="range" min="0" step="0.1" max={customData.max} value={seconds} onChange={(e: any) => setSeconds(Number(e.target.value))} />
          )}
        </div>

        <div className={styles.logs}>
          {logs.map((el, index) => 
            <div key={generateid(2)} className={styles.element} style={{borderColor: el.color}}>
              <Constant cmd={el} index={index} ctx={{logs, script}}/>

              <Flex>
                <Seconds cmd={el} index={index} ctx={{}} />

                {el.event && (() => {
                  const EventComponent = mouseMessage[el.event as keyof typeof mouseMessage];
                  return EventComponent ? (<EventComponent  cmd={el} index={index} ctx={{}} /> ) : null;
                })()}

                {el.event === "getPixelColor" && el.pixel_event && (() => {
                  const PixelComponent = mouseMessage[el.pixel_event as keyof typeof mouseMessage];
                  return PixelComponent ? ( <PixelComponent  cmd={el} index={index} ctx={{}} /> ) : null;
                })()}

              </Flex>
            </div>
          )}
        </div>
          
        <div className={styles.exitBtn}>
          <Button onClick={onExitTerminal} label1={`Exit [ esc ] [ ${script?.name} ]`} label2={<MdExitToApp/>} color="dark"/>
        </div>

      </div>
    </Cover>
  )
}

export default Terminal;