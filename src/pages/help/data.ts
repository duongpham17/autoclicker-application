export const scripts = {
  title: "Scripts",
  data: [
    {
      sub: "Credits",
      text: "Each credit you purchase equals one script, and the script lasts indefinitely. You can edit it as many times as you like. If you delete the script, the credit will be refunded. This allows you to keep your UI clean and organized."
    },
    {
      sub: "How to delete script?",
      text: `Click on the title of your script -> delete -> after deleting you will be given back 1 credit.`
    }
  ]
}

export const permissions = {
  title: "Permissions",
  data: [
    {
      sub: "Mac users, mouse not working",
      text: `Go to "System settings" -> "privacy & security" -> "accessibility" -> add the application to the list. Restart application.`
    },
    {
      sub: "Mac users, mouse cant find location",
      text: `Go to "System settings" -> "privacy & security" -> "Screen & System Audio Recoding" -> add the application to the list. Restart Application.`
    },
    {
      sub: "Windows users, if nothing is clicking or working",
      text: `Ensure you run the application as admin.`
    },
  ]
}

export const seconds = {
  title: "Seconds",
  data: [
    {
      sub: "Seconds",
      text: `Intervals or ticks are 0.1 second, make sure the seconds you set are incremntally greater than the previous. 
      Example if you set 1st command as 5s and 2nd command as 7 seconds, 1st will execute after 5s and 2nd will execute 2s after.
      Always ensure the commands are going from lowest seconds to highest seconds.`
    },
    {
      sub: "OverLapping Seconds",
      text: "This will break your script and it might cause weird events to happen in weird orders. So do not have repeating seconds."
    },
    {
      sub: "0 Second Issues",
      text: "The interval operates in increments of 0.1 seconds; therefore, starting the script at 0 is not possible—the minimum starting value is 0.1 seconds."
    }
  ]
}

export const mouseEvents = {
  title: "Mouse Events",
  data: [
    {
      sub: "mouseClick",
      text: "Clicks the left, middle, or right mouse button."
    },
    {
      sub: "mouseToggle",
      text: 'Toggles the mouse button state. Use "down" to hold down the left, middle, or right button, and "up" to release it.'
    },
    {
      sub: "moveMouse",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Use the mouse data at the bottom of the screen to determine the coordinates."
    },
    {
      sub: "moveMouseAndClick",
      text: "Instantly moves the mouse pointer on your primary screen (multi-monitor setups are not supported). Accepts x and y coordinates. Then clicks left, middle or right after 0.1 second."
    },
    {
      sub: "moveMouseSmooth",
      text: "Moves the mouse pointer smoothly across the screen to the specified coordinates."
    },
    {
      sub: "dragMouse",
      text: 'Drags the mouse to the specified x and y coordinates. Must be used with mouseToggle "down" at the start and "up" after dragging is complete.'
    },
    {
      sub: "getPixelColor",
      text: "Enter the X and Y coordinates to read the color of the screen at that point. If the color matches, you can trigger additional mouse events. The WAIT input field lets you specify a number of seconds to wait for the pixel color to match. The script will check the color every second, looping until the specified time runs out."
    },
    {
      sub: "keyTap",
      text: "Simulates tapping a single key on the keyboard."
    },
    {
      sub: "keyToggle",
      text: 'Holds down a specific key ("down") or releases it ("up").'
    },
    {
      sub: "typeString",
      text: "Types out a sentence or string of text."
    },
    {
      sub: "restart",
      text: "Ends the current loop. Useful when used with a delay on a specific loop count."
    }
  ]
}

export const inputFields = {
  title: "Input Fields",
  data: [
    {
      sub: "Name",
      text: "Helps you identify what each mouse event does. If left empty, a unique ID will be generated automatically."
    },
    {
      sub: "Seconds",
      text: "Mouse events execute in 0.1s intervals. This value determines when the event will trigger. Avoid overlapping times—overlapping events may cause errors."
    },
    {
      sub: "Delay",
      text: "Determines when events trigger within a loop, using the modulo operator (%) which returns the remainder after dividing one number by another. Example: If the loop is at 17 and delay is 5, 17 % 5 = 2 (no delay). If the loop is at 10 and delay is 5, 10 % 5 = 0 (the event triggers)."
    },
    {
      sub: "Color",
      text: "Changes the border color for improved UI clarity."
    },
    {
      sub: "Range",
      text: "This input is for mouse movements. If you want the mouse's X and Y coordinates to vary slightly, set a range value. For example, if X and Y are both 200 and the range is 10, the actual position will be chosen randomly between 190 and 210."
    },
    {
      sub: "Wait",
      text: `This input is for "getPixelEvents". The script checks if the pixel color at the specified (x, y) coordinates matches the expected value. It will wait for the duration you set — for example, if the wait is set to 10 seconds, the script will wait up to 10 seconds for the pixel color to match. If the pixel color does not match within this timeframe, the mouse event will be skipped, and the script will continue with the next command.`
    }
  ]
}