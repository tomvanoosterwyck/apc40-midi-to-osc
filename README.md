## AKAI APC40 Midi to OSC translator
Translates the Midi messages send from the AKAI APC40 midi controller OSC
originaly designed to convert the midi messages to osc messages so that lighting software (Chamsys MagicQ) can be controlled with the APC40
(example showfile in the show folder, execute page 4 and 5)
## Installation
1. Please install the latest LTS version of Node.JS [https://nodejs.org/en/](https://nodejs.org/en/) (I'm using version 12.14.0)
if you running on windows make sure you install windows-build-tools, Installing this can take up to an hour depending on you're windows version and hardware.

Installing from the build tools must be done within Powershell with administrator privileges (windows key -> Type powershell -> right click Windows Powershell -> Run as administrator)
```
npm install --global windows-build-tools
```

2. clone this repository 
3. open cmd in the repository (shift-rightclick => Open powershell window here)
4. `npm install` to install all the dependencies
5. `npm run dev` to start the software

## Configuration
configuration for osc port is default: 
`src/server.js`
```
let  config = {
oscserverIp:  "localhost",
oscInPort:  9000,
magicQIp:  "localhost",
oscOutPort:  8000
}
```

midi controller mapping is found in `src/mapping.json`
see file for examples.
only the grid on the APC40 has multiple colors:
led colors:
```
0: off
1: green
2: green blinking
3: red
4: red blinking
5: amber
6: amber blinking
```

More documentation will be added in the future