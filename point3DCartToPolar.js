// ADM-OSC axis convention (ITU-R BS.2127-1 6.8 section) Point3D Cartesian to Polar coordinate filter script
// Input Point3D cartesian (X,Y,Z) array (range [-1,1])
// Output Point3D polar (Azimuth, Elevation, Distance) array (angles are in degrees, distance normalised)

function filter(values, min, max)
{
	var result = [];
	for(var i=0;i<values.length;i++)
	{
		var x = values[i][0];
		var y = values[i][1];
        var z = values[i][2];

        var d = Math.sqrt(x*x + y*y + z*z);
        var a = -180 /Math.PI * Math.atan2(x,y);
        var e = 0;
        if(d > 0.0)
        {
            e = 180 / Math.PI * Math.asin(z/d);
        }     

		result[i] = [a, e, d];
	}
	return result;
	
}