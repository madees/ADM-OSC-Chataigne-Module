// ADM-OSC axis convention (ITU-R BS.2127-1 6.8 section) Point3D Polar to Cartesian coordinate filter script
// Input Point3D polar (Azimuth, Elevation, Distance) array (angles in degrees, distance normalized)
// Output Point3D cartesian (X,Y,Z) array (range [-1,1])

function filter(values, min, max)
{
	var result = [];
	for(var i=0;i<values.length;i++)
	{
        // transform inputs from degrees to radians
        var aRad = values[i][0]*Math.PI /180 ;
        var eRad = Math.PI/2 - values[i][1]*Math.PI /180 ; // +Rotate 90°
   		var d = values[i][2];

        var x = (-1) * d * Math.sin(eRad) * Math.sin(aRad);
		var y = d * Math.sin(eRad) * Math.cos(aRad);
        var z = d * Math.cos(eRad);
		result[i] = [x, y, z];
	}
	return result;
	 
}