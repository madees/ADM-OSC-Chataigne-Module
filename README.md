# ADM-OSC-Chataigne-Module
Chataigne module to retreive parameters or control ADM-OSC object based audio (OBA) software or hardware with OSC protocol.  

ADM-OSC is an industry initiative to standardization of Object Based Audio (OBA) positioning data in live production ecosystems, by implementing the Audio Definition Model (ADM) over Open Sound Control (OSC).

To know more, please consult the website :
https://immersive-audio-live.github.io/ADM-OSC/

On Github :
https://github.com/immersive-audio-live/ADM-OSC

The current implementation of the module is ADM-OSC version 1.0.
It is described here : https://aes2.org/publications/elibrary-page/?id=22722

Usage may be first to check complicance to this specification, as sand box to help implementation for third parties, and bridge to other modules and protocols.
You may participate to this initiative by mentionning any issues, please document the third party software/hardware used and informations to reproduce the issue. Thanks a lot in advance !

Audio Definition Model (ADM) is standardised metadata model for describing the technical properties of audio.
To know more about this open standard on EBU dedicated website :
https://adm.ebu.io/

! NOTE: This module is a personal initiative, not supported by EBU.

To download and learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/
And Ben's Youtube channel where you can find tutorials : https://youtu.be/RSBU9MwJNLY

For global support on how to use Chataigne and its modules, please join us on Discord : 
https://discord.com/invite/ngnJ5z my contact there is also "madees".

## Installation
To install the Custom Module, use Community Module Manager in Chataigne, or download and unzip the files to your Documents/Chataigne/Modules folder.

## Principle of use
First set IP's and ports in /modules/adm_osc/parameters.

The objects container receives values from ADM-OSC thirds.
Select the number of objects to store in values container with /modules/adm_osc/parameters/numberOfObjects.
They are organised to ease multiplex mappings : you can automatically build list with "Fill...">"from Container" feature.

You can automatically send "get" commands to the third with /modules/adm_osc/parameters/
- getSoundObjectsPositionsXYZ : for (x,y,z) cartesian objects coordinates
- getSoundObjectsPositionsAED : for (a,e,d) spheric objects coordinates
- getSoundObjectsGain : for objects gains
- getSoundObjectsMute : for objects mute states

Those will be polled automatically at /modules/adm_osc/parameters/getUpdateRate frequency.

You can also forward input to output(s) with Module's Pass-through feature.

You may also use Module Commands to send parameters to ADM-OSC third :

- obj/azim(sourceIndex, azimuthAngle) 
- obj/elev(sourceIndex, elevationAngle)
- obj/dist(sourceIndex, distance) 
- obj/aed(sourceIndex, aed) 
- obj/x(sourceIndex, posX) 
- obj/y(sourceIndex, posY) 
- obj/z(sourceIndex, posZ)
- obj/xy(sourceIndex, xy)
- obj/xyz(sourceIndex, xyz) 
- obj/gain(sourceIndex, gain) 
- obj/mute(sourceIndex, state)
- obj/dref(sourceIndex, dref)
- obj/dmax(sourceIndex, dmax)
- obj/w(sourceIndex, width)
- lis/xyx(xyz)
- lis/pyr(pyr)
- env/change(string)

And the corresponding "get" commands for queries.

## About example Noisette file
Simple multiplex mappings examples for 64 objects with d&b audiotechnik DS100 module :
- "X,Y to X,Y" send ADM-OSC received (X,Y) cartesian positions to DS100 default coordinate mapping.
- "Z to FG" curve map and send ADM-OSC received Z cartesian position to FG (Function Groups) levels. By default, the FG1 is the lower, FG2 is the upper.
- "A,D" to "X,Y" convert and send ADM-OSC received (A,D) spheric positions to DS100.
- "D to level" curve map and send ADM-OSC received D distance to DS100 object level attenuation.

## Little helpers for cartesian<>polar conversions
There is also filter scripts to convert Point3D from cube to sphere and vis versa.
