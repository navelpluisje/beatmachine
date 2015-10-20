# BeatMachine #

An easy to use simple drummachine.

It has been written in pure javascript and has just one dependency, which I also made ([npKnob](https://bitbucket.org/Navelpluisje/npknob)) for the rotary knobs.
After cloning just `after cloning` below.

## How to beat? ##

Each sound has a few settings. I will explain them from top down:

* **Gain**: I like it loud, but sometimes not
* **Filter**: Check this one if you want to use the filter.
* **Filter Q**: The amount of filtering
* **Freq**: The filter frequency
* **Pan**: A bit to the left, a bit to the right.
* **Mute**: Oh, be quite now

### Or........ ###
Use your keyboard. The next keys are mapped:

* **A**: Kick
* **S**: Snare
* **D**: Rim
* **F**: HiHat
* **G**: Open HiHat
* **H**: Crash
* **J**: Ride
* **K**: Clap

## Other controls ##

* **Start**: What would this one do??
* **Stop**: The opposite of the previous one
* **Speed**: Do you like it hardcore or laid back?
* **Drumset**: Choose the sound you like

## And........ ##

* **grid**: Toggle the sequencer grid. Just click the small bubbles and press start for some unforgettable fun;-)

## After Cloning ##
You need to run `bower install`. This will include the npKnob to the project which is responsible for the rotaries.

## If you want to use the BeatServer ##
This application can talk to it's own BeatServer. This uses the DDP-protocol.
To get thios all work properly you need to have [Browserify](http://browserify.org/) and [NPM](https://www.npmjs.com/) installed.

Run from within the `dev` folder `npm install`  to install some node_modules. These are by the way only necessary for the DDP part of the application. If you want to make modifications in the ddp-client file you need to modify the one in the `dev` folder. After you made some modifications run from the root folder `browserify dev/ddp-client.js -o js/ddp-client.js` This will create a new ddp-client with all the dependencies.

### BeatServer settings ###
There are 2 settings for connecting to the server. They are available by clicking on the menu-icon in the 'Connect'-block.

1. The url or IP-address of the server
2. The port for the server

When you're done click the 'Close'-button. The settings will be saved and you're ready for connecting. Just toggle the 'Multi-user' switch.