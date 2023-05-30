# ADM-OSC-Chataigne-Module
Chataigne module to retreive parameters or control ADM-OSC object based audio (OBA) software or hardware with OSC protocol.  

About ADM-OSC, an industry initiative to standardization of Object Based Audio (OBA) positioning data in live production ecosystems, by implementing the Audio Definition Model (ADM) over Open Sound Control (OSC).
To know more, please consult the website :
https://immersive-audio-live.github.io/ADM-OSC/
On Github :
https://github.com/immersive-audio-live/ADM-OSC

The current implementation of the module is ADM-OSC version 0.4.

Audio Definition Model (ADM) is standardised metadata model for describing the technical properties of audio.
To know more about this open standard on EBU dedicated website :
https://adm.ebu.io/

To download and learn more about Chataigne, please visit : http://benjamin.kuperberg.fr/chataigne/
And Ben's Youtube channel where you can find tutorials : https://youtu.be/RSBU9MwJNLY
For global support on how to use Chataigne and its modules, please join us on Discord : 
https://discord.com/invite/ngnJ5z my contact there is also "madees".

## Installation
To install the Custom Module, unzip the folder to your Documents/Chataigne/Modules folder.

## Principle of use
First set IP's and ports in /modules/adm_osc/parameters.

The objects container receives values from ADM-OSC thirds.
Select the number of objects to store in values container with /modules/adm_osc/parameters/numberOfObjects.
They are organised to ease multiplex mappings : you can automatically build list with "Fill...">"from Container" feature.

You can send "get" commands to the third within modules parameters :
- /modules/adm_osc/parameters/getSoundObjectsPositionsXYZ : for (x,y,z) cartesian objects coordinates
- /modules/adm_osc/parameters/getSoundObjectsPositionsAED : for (a,e,d) spheric objects coordinates
- /modules/adm_osc/parameters/getSoundObjectsGain : for objects gains
- /modules/adm_osc/parameters/getSoundObjectsCartesian : for objects config (1=cartesian, 0=spheric)
Those will be polled automatically at /modules/adm_osc/parameters/getUpdateRate frequency.

You may also use Module Commands to send parameters to ADM-OSC third.
