
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
	
	function downloadVideos(urls){
		var list_of_videos = [];
		for (int i = 0; i<url.lenght(); i++)
			list_of_videos.push($.ajax(list[i]));
		return list_of_videos;
	}
	
	var actual_video = 1;
	
	function generateVideos(list_of_videos)
	{
		//Consigo el elemento video
		var videoContainer = document.getElementById("VideoContainer") //TO DO: Apuntar
		for(int i= 0; i<list_of_videos.lenght(); i++)
		{
			var videoTag = createElement("video");
			videoTag.src = list_of_videos[i];
			videoTag.setAtributte("id","video"+i);
			if(i!=0)
			{
				videoTag.style.display = "none";
			}
			$(VideoContainer).append(videoTag);
		}
	}
	
	function nextVideo()
	{
		var actual = document.getElementById("video"+actual_video');
		actual.style.display = "none";
		var actual_video++;
		var actual = document.getElementById("video"+actual_video');
		videoTag.style.display = "block";
	}
	
	function startTrayectory(){
		actual_video = 1;
		var urls = constructWay(initWaypoint, endWaypoint);
		var videos = downloadVideos(urls);
		var generateVideos(videos);
	}
} 