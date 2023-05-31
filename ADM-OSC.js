/* Chataigne Module for ADM-OSC v1.1 (c) Mathieu Delquignies, 5/2023
===============================================================================
This file is a Chataigne Custom Module to test and map ADM-OSC metadatas.
It's purpose is to fast prototype implementation, test features and bridges.
Current implementation is version 0.4 :
https://immersive-audio-live.github.io/ADM-OSC/html/adm_spec.html

Create a basic client/server that implement basic ADM-OSC communication with stable parameters.
Values cntainers are read/write and enable bidirectionnal communication.

To learn more about ADM-OSC workgroup, please check :
https://github.com/immersive-audio-live/ADM-OSC

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
===============================================================================
*/

/**
 *  GLOBAL VARIABLES
 */
// Module parameters
 var getObjectsXYZ=false;
 var getObjectsAED=false;
 var getObjectsGain=false;
 var getObjectsCartesian=false;

// objects parameters containers pointers arrays
var xParam = [];
var yParam = [];
var zParam = [];
var aParam = [];
var eParam = [];
var dParam = [];
var gainParam = [];
var cartesianParam = [];

var updateRate;
var nbObjects;

/** 
 * Module intialisation
 */
function init()
{
	// Setup default reception update rate and get update states as in module GUI
	updateRate = local.parameters.getUpdateRate.get();
	script.setUpdateRate(updateRate);
	getObjectsXYZ=local.parameters.getSoundObjectsPositionsXYZ.get();
	getObjectsAED=local.parameters.getSoundObjectsPositionsAED.get();
	getObjectsGain=local.parameters.getSoundObjectsGain.get();
	getObjectsCartesian=local.parameters.getSoundObjectsCartesian.get();
	nbObjects=local.parameters.numberOfObjects.get();

	// Create the Objects container
	createObjectsContainer();

	// Module GUI settings
	local.scripts.setCollapsed(true);
}
/**
 * Callback when a module parameter has changed
 */
function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		if(param.is(local.parameters.getUpdateRate))
		{
			// Get Update Rate parameter has changed
			updateRate = local.parameters.getUpdateRate.get();
			script.setUpdateRate(updateRate);
		}
		if(param.is(local.parameters.numberOfObjects))
		{
			// Number of objects changed.
			nbObjects=local.parameters.numberOfObjects.get();
			// Reconstruct the objects parameters containers with new amount.
			createObjectsContainer();
		}
		// handling of "get" parameters settings changes
		if(param.is(local.parameters.getSoundObjectsPositionsXYZ))
		{
			getObjectsXYZ=param.get();
		}
		if(param.is(local.parameters.getSoundObjectsPositionsAED))
		{
			getObjectsAED=param.get();
		}
		if(param.is(local.parameters.getSoundObjectsGain))
		{
			getObjectsGain=param.get();
		}
		if(param.is(local.parameters.getSoundObjectsCartesian))
		{
			getObjectsCartesian=param.get();
		}
	}
}

/**
 * Callback on OSC Rx to parse OSC message
*/
function oscEvent(address, args)
{
	// Convert address string to string array
	var address = address.split("/");
	// Parse address
	if(address[1]=="adm")
	{
		if(address[2]=="obj")
		{
			var objectID =parseInt(address[3]);
			if(objectID>nbObjects)
			{
				script.logWarning("Received not handled object number #"+objectID);
				return;
			}
			if(address[4]=="azim")
			{
				if(args.length == 0)
				{
				azim(objectID, aParam[objectID].get());
				}
				else
				{
				aParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="elev")
			{
				if(args.length == 0)
				{
				elev(objectID, eParam[objectID].get());
				}
				else
				{
				eParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="dist")
			{
				if(args.length == 0)
				{
				dist(objectID, dParam[objectID].get());
				}
				else
				{
				dParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="aed")
			{
				if(args.length == 0)
				{
				aed(objectID, aParam[objectID].get(), eParam[objectID].get(), dParam[objectID].get());
				}
				else
				{
				aParam[objectID].set(args[0]);
				eParam[objectID].set(args[1]);
				dParam[objectID].set(args[2]);
				}
			}
			if(address[4]=="x")
			{
				if(args.length == 0)
				{
				x(objectID, xParam[objectID].get());
				}
				else
				{
				xParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="y")
			{
				if(args.length == 0)
				{
				y(objectID, yParam[objectID].get());
				}
				else
				{
				yParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="z")
			{
				if(args.length == 0)
				{
				z(objectID, zParam[objectID].get());
				}
				else
				{
				zParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="xyz")
			{
				if(args.length == 0)
				{
				xyz(objectID, xParam[objectID].get(), yParam[objectID].get(), zParam[objectID].get());
				}
				else
				{
				xParam[objectID].set(args[0]);
				yParam[objectID].set(args[1]);
				zParam[objectID].set(args[2]);
				}
			}
			if(address[4]=="gain")
			{
				if(args.length == 0)
				{
				gain(objectID, gainParam[objectID].get());
				}
				else
				{
				gainParam[objectID].set(args[0]);
				}
			}
			if(address[4]=="cartesian")
			{
				if(args.length == 0)
				{
				cartesian(objectID, cartesianParam[objectID].get());
				}
				else
				{
				cartesianParam[objectID].set(args[0]==1);
				}
			}
		}
		if((address[2]=="config") & (address[3]=="obj"))
		{
			var objectID =parseInt(address[4]);
			if(address[5]=="cartesian")
			{
				if(args.length == 0)
				{
				cartesian(objectID, cartesianParam[objectID].get());
				}
				else
				{
				cartesianParam[objectID].set(args[0]==1);
				}
			}
		}
	}
}
/**
 * This function is called automatically by Chataigne at updateRate period. 
 *
 */
function update(updateRate) 
{
	// Sends commands to retreive values, at specified updateRate.
	if(getObjectsAED)
	{
		for (var i = 1; i < (nbObjects +1); i++) {
			getAED(i);
		}
	}
	if(getObjectsXYZ)
	{
		for (var i = 1; i < (nbObjects +1); i++) {
			getXYZ(i);
		}
	}
	if(getObjectsGain)
	{
		for (var i = 1; i < (nbObjects +1); i++) {
			getGain(i);
		}
	}
	if(getObjectsCartesian)
	{
		for (var i = 1; i < (nbObjects +1); i++) {
			getCartesian(i);
		}
	}
}


/**
 * Reset the objects container depending on Number of objects module parameter
 */
function createObjectsContainer()
{
	// Remove previous source container
  	local.values.removeContainer("Objects parameters");
	// Add the Source container
  	ObjectsContainer = local.values.addContainer("Objects parameters");

	// Add X container & values for cartesian X position
	xContainer = ObjectsContainer.addContainer("x");
	for (var i = 1; i < (nbObjects +1); i++) {
    	xParam[i]= xContainer.addFloatParameter(i, "x", 0, -1, 1);
		xParam[i].setAttribute("readonly", true);
    	};
    xContainer.setCollapsed(true);

	// Add Y container & values for cartesian Y position
	yContainer = ObjectsContainer.addContainer("y");
	for (var i = 1; i < (nbObjects +1); i++) {
		yParam[i]= yContainer.addFloatParameter(i, "y", 0, -1, 1);
		yParam[i].setAttribute("readonly", true);
		};
	yContainer.setCollapsed(true);

	// Add Z container & values for cartesian altitude
	zContainer = ObjectsContainer.addContainer("z");
	for (var i = 1; i < (nbObjects +1); i++) {
		zParam[i]= zContainer.addFloatParameter(i, "z", 0, -1, 1);
		zParam[i].setAttribute("readonly", true);
		};
	zContainer.setCollapsed(true);

	// Add A container & values for polar azimuth
	aContainer = ObjectsContainer.addContainer("a");
	for (var i = 1; i < (nbObjects +1); i++) {
		aParam[i]= aContainer.addFloatParameter(i, "a", 0, -180, 180);
		aParam[i].setAttribute("readonly", true);
		};
	aContainer.setCollapsed(true);

	// Add E container & values for polar elevation
	eContainer = ObjectsContainer.addContainer("e");
	for (var i = 1; i < (nbObjects +1); i++) {
		eParam[i]= eContainer.addFloatParameter(i, "e", 0, -90, 90);
		eParam[i].setAttribute("readonly", true);
		};
	eContainer.setCollapsed(true);

	// Add R container & values for polar radius
	dContainer = ObjectsContainer.addContainer("d");
	for (var i = 1; i < (nbObjects +1); i++) {
		dParam[i]= dContainer.addFloatParameter(i, "d", 1, 0, 1);
		dParam[i].setAttribute("readonly", true);
		};
	dContainer.setCollapsed(true);

	// Add gain container & values for object gain
	gainContainer = ObjectsContainer.addContainer("gain");
	for (var i = 1; i < (nbObjects +1); i++) {
		gainParam[i]= gainContainer.addFloatParameter(i, "gain", 0, 0, 1);
		gainParam[i].setAttribute("readonly", true);	
		};
	gainContainer.setCollapsed(true);

	// Add cartesian container & values for object coordinate type (1 is cartesian, 0 is spherical)
	cartesianContainer = ObjectsContainer.addContainer("cartesian");
	for (var i = 1; i < (nbObjects +1); i++) {
		cartesianParam[i]= cartesianContainer.addBoolParameter(i, "cartesian", 1);
		cartesianParam[i].setAttribute("readonly", true);	
		};
	cartesianContainer.setCollapsed(true);
}

/**
 * Callback functions for module commands
 * 
 * As described in https://immersive-audio-live.github.io/ADM-OSC/html/adm_spec.html
 * implementation version 0.4
 */

/**
 * azim	: Send azimuth of sound location.
 * 1 int [1, 128] object index
 * 2 float [-180, 180] in degrees. -90 is on the Right, 0 is in front.	
 * 
 * example : /adm/obj/4/azim -22.5
 */
function azim(sourceIndex, azimuthAngle) 
{
	local.send("/adm/obj/"+sourceIndex+"/azim", azimuthAngle);
}

/**
 * elev	: Send elevation of sound location.
 * 1 int [1, 128] object index
 * 2 float [-90, 90] in degrees. -90 is down, 90 is up.	
 * 
 * example : /adm/obj/4/elev 12.7
 */
function elev(sourceIndex, elevationAngle) 
{
	local.send("/adm/obj/"+sourceIndex+"/elev", elevationAngle);
}

/**
 * dist	: Send distance from origin.
 * 1 int [1, 128] object index
 * 2 float [0,1] normalized distance.	
 * 
 * example : /adm/obj/4/dist 0.9
 */
function dist(sourceIndex, distance) 
{
	local.send("/adm/obj/"+sourceIndex+"/dist", distance);
}

/**
 * aed	: Send spheric coordinate of sound location.
 * 1 int [1, 128] object index
 * 2 Point3D [a, e, d] [[-180, -90, 0],[180, 90, 1]]	
 * 
 * example : /adm/obj/4/aed -22.5 12.7 0.9
 */
function aed(sourceIndex, aed) 
{
	local.send("/adm/obj/"+sourceIndex+"/aed", aed[0], aed[1], aed[2]);
}

/**
 * x	: Send x position of sound object.
 * 1 int [1, 128] object index
 * 2 float [-1,1] left/right dimension, -1 is left.	
 * 
 * example : /adm/obj/4/x -0.9
 */
function x(sourceIndex, posX) 
{
	local.send("/adm/obj/"+sourceIndex+"/x", posX);
}

/**
 * y	: Send y position of sound object.
 * 1 int [1, 128] object index
 * 2 float [-1,1] front/back dimension.
 * 
 * example : /adm/obj/4/y 0.15
 */
function y(sourceIndex, posY) 
{
	local.send("/adm/obj/"+sourceIndex+"/y", posY);
}

/**
 * z	: Send z position of sound object.
 * 1 int [1, 128] object index
 * 2 float [-1,1] top/bottom dimension.	
 * 
 * example : /adm/obj/4/x 0.7
 */
function z(sourceIndex, posZ) 
{
	local.send("/adm/obj/"+sourceIndex+"/z", posZ);
}

/**
 * xyz	: Send (x,y,z) position of sound object.
 * 1 int [1, 128] object index
 * 2 Point3D [x,y,z] [[-1, -1, -1],[1,1,1]]
 * 
 * example : /adm/obj/4/xyz -0.9 0.15 0.7
 * compact format enables synchronicity of position changes and also less network traffic
 */
function xyz(sourceIndex, xyz) 
{
	local.send("/adm/obj/"+sourceIndex+"/xyz", xyz[0], xyz[1], xyz[2]);
}

/**
 * gain	: Send gain of sound object.
 * 1 int [1, 128] object index
 * 2 float [0,1] gain	
 * 
 * example : /adm/obj/3/x 0.707
 */
function gain(sourceIndex, gain) 
{
	local.send("/adm/obj/"+sourceIndex+"/gain", gain);
}

/**
 * cartesian	: Send coordiante type of sound object.
 * 1 int [1, 128] object index
 * 2 boolean If the flag is set to 1, Cartesian coordinates are used. 
 * Otherwise spherical coordinates are used.
 * 
 * example : /adm/config/obj/1/cartesian 0
 */
function cartesian(sourceIndex, cartesian) 
{
	if(cartesian)
	{
		local.send("/adm/config/obj/"+sourceIndex+"/cartesian", 1);
		// issue in 0.4 spec as above, ADM-OSC Tester tool use this instead:
		local.send("/adm/obj/"+sourceIndex+"/cartesian", 1);
	} else
	{
		local.send("/adm/config/obj/"+sourceIndex+"/cartesian", 0);
		// issue in 0.4 spec as above, ADM-OSC Tester tool use this instead:
		local.send("/adm/obj/"+sourceIndex+"/cartesian", 0);
	}	
}
/**
 * getAzim	: Send azimuth of sound location query.
 * 1 int [1, 128] object index
 * 
 */
function getAzim(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/azim");
}

/**
 * getElev	: Send elevation of sound location query.
 * 1 int [1, 128] object index
 * 
 */
function getElev(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/elev");
}

/**
 * getDist	: Send distance from origin query.
 * 1 int [1, 128] object index
 * 
 */
function getDist(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/dist");
}

/**
 * getAED	: Send spheric coordinate of sound location query.
 * 1 int [1, 128] object index	
 * 
 */
function getAED(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/aed");
}

/**
 * getX	: Send x position of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getX(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/x");
}

/**
 * getY	: Send y position of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getY(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/y");
}

/**
 * getZ	: Send z position of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getZ(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/z");
}

/**
 * getXYZ : Send (x,y,z) position of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getXYZ(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/xyz");
}

/**
 * getGain	: Send gain of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getGain(sourceIndex) 
{
	local.send("/adm/obj/"+sourceIndex+"/gain");
}

/**
 * getCartesian	: Send coordinate type of sound object query.
 * 1 int [1, 128] object index
 * 
 */
function getCartesian(sourceIndex) 
{
		local.send("/adm/config/obj/"+sourceIndex+"/cartesian");
}