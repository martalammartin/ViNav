
function main()
{
	//{initWaypoint: example, endWaypoint: example, videoURL: example}
	
	function constructWay(initWaypoint, endWaypoint) {
	//List is a collection of the video IDs
		var urls = $.getJSON("URLS.JSON")[initWaypoint][endWaypoint];
		
		/*var list = [];
		var anden = consult(initWaypoint.station, endWaypoint.station);
		
		list.push(consult(initWaypoint, anden)); //Consult devuelve la URL del video que empieza en initWaypoint y termina en el anden
		list.push(consult(anden, initWaypoint.estacion, endWaypoint.estacion)); //Este otro Consult devuelve la URL del video del viaje en metro desde
																				//la estación initWaypoint.estacion hasta la estacion endWaypoint.estacion
		list.push(consult(anden, endWaypoint));*/
		return urls;
	}
} 