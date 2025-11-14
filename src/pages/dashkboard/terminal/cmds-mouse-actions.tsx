import { IScriptsCommands } from "@redux/types/scripts";

export type TScriptsCommandsCustomised = IScriptsCommands & {
  logTimestamp: number;
  at_loop: number,
  is_pixel_color?: boolean,
  pixel_wait_counter: number,
};

export function keyBy<T extends Record<K, PropertyKey>, K extends keyof T>(
  arr: T[],
  key: K
): Record<T[K], T> {
  return arr.reduce((acc, obj) => {
    acc[obj[key]] = obj;
    return acc;
  }, {} as Record<T[K], T>);
};

export const random_range = (value: number, range: number | undefined) => {
  const min = value - (range || 0);
  const max = value + (range || 0);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const robot = (window as any).robot;

export const robotData: Record<
  string,
  {
    handler: (cmd: IScriptsCommands, ctxOutside: any, ctxInside: any ) => void;
  }
> = {
  mouseClick: {
    handler: (cmd) => robot.mouseClick(cmd.click as string),
  },
  mouseToggle: {
    handler: (cmd) => robot.mouseToggle(cmd.toggle as string, cmd.click as string),
  },
  moveMouse: {
    handler: (cmd) => robot.moveMouse(random_range(cmd.x as number, cmd.xyrange), random_range(cmd.x as number, cmd.xyrange as number)),
  },
  moveMouseSmooth: {
    handler: (cmd) => robot.moveMouseSmooth(random_range(cmd.x as number, cmd.xyrange), random_range(cmd.x as number, cmd.xyrange as number)),
  },
  dragMouse: {
    handler: (cmd) => robot.dragMouse(random_range(cmd.x as number, cmd.xyrange), random_range(cmd.x as number, cmd.xyrange as number)),
  },
  keyTap: {
    handler: (cmd) => robot.keyTap(cmd.keyboard as string),
  },
  keyToggle: {
    handler: (cmd) => robot.keyToggle(cmd.toggle as string, cmd.keyboard as string),
  },
  typeString: {
    handler: (cmd) => robot.typeString(cmd.type as string),
  },
  moveMouseAndClick: {
    handler: (cmd) => {
      robot.moveMouse(random_range(cmd.x as number, cmd.xyrange), random_range(cmd.x as number, cmd.xyrange as number));
      setTimeout(() => robot.mouseClick(cmd.click as string), 100);
    },
  },
  restart: {
    handler: (_, ctx) => ctx.reset(),
  },
  getPixelColor: {
    handler: (cmd, ctxOutside, ctxInside): boolean => {
      const is_pixel_color = cmd.pixel_color === `#${robot.getPixelColor(Number(cmd.pixel_x), Number(cmd.pixel_y))}`;
      if (is_pixel_color) {
        robotData[cmd.pixel_event as string].handler(cmd, ctxOutside, ctxInside);
      } else {
        const isWaitNotSet = cmd.pixel_wait === 0 || !cmd.pixel_wait;
        const isWaitMaxed = ctxInside.pixel_wait_counter >= (cmd.pixel_wait as number);
        if (!isWaitNotSet && !isWaitMaxed) ctxOutside.wait();
      }
      return is_pixel_color;
    }
  },

};
