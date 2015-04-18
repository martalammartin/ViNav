function constructWay(initWaypoint, endWaypoint, callback) {
			
	var JSONdata = $.getJSON("URLS.json", function(data){
		console.log(data);
		var urls = data[initWaypoint][endWaypoint];
		
		/*var list = [];
		var anden = consult(initWaypoint.station, endWaypoint.station);
		
		list.push(consult(initWaypoint, anden)); //Consult devuelve la URL del video que empieza en initWaypoint y termina en el anden
		list.push(consult(anden, initWaypoint.estacion, endWaypoint.estacion)); //Este otro Consult devuelve la URL del video del viaje en metro desde
																				//la estación initWaypoint.estacion hasta la estacion endWaypoint.estacion
		list.push(consult(anden, endWaypoint));*/
		callback(urls);
	});
}

function downloadVideos(urls){
	var list_of_videos = [];
	list_of_videos.forEach (function(video){
		list_of_videos.push($.ajax(video))
	});
	return list_of_videos;
}

var actual_video = 0;
var max;

function generateVideos(list_of_videos)
{
	//Consigo el elemento video
	var videoContainer = document.getElementById("VideoContainer");
	
	max = list_of_videos.length
	
	for(var i= 0; i<max; i++)
	{
		var videoTag = document.createElement("video");
		videoTag.src = list_of_videos[i];
		videoTag.id = "video"+i;
		videoTag.controls = true;
		//videoTag.autoplay = true;
		videoTag.addEventListener('ended', nextVideo,false);
		console.log(videoTag)
		if(i!=0)
		{
			videoTag.style.display = "none";
		}
		document.getElementById('ant').style.display = "none";
		$(videoContainer).append(videoTag);
	}
}

function nextVideo()
{
	if (actual_video != max - 1)
	{
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "none";
		actual_video++;
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "block";
	}
	
	console.log(actual_video)
	
	if(actual_video == max - 1)
	{
		document.getElementById('next').style.display = "none";
	}
	document.getElementById('ant').style.display = "block";
}

function antVideo()
{
	if (actual_video != 0)
	{
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "none";
		actual_video--;
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "block";
	}
	
	console.log(actual_video)
	
	if (actual_video == 0)
	{
		document.getElementById("ant").style.display = "none";
	}
	document.getElementById("next").style.display = "block";
}
	
function startTrayectory(){
	actual_video = 0;
	var init = $("#initWaypoint").html().trim();//TO DO: apuntar
	console.log(init)
	var end = $("#endWaypoint").html().trim();//TO DO: apuntar
	var urls = constructWay(init, end, function(urls){
		console.log(urls);
		//var videos = downloadVideos(urls); //Comment this if loading from disk
		generateVideos(urls); //Pasar urls como argumento si cargamos de disco
	});
}

function endTrayectory(){
	$("video").remove();
}

function distance(lat1, lon1, lat2, lon2)
{
	var R = 6371000; // metres
	var pi = 3.14159267
	var f1 = lat1*(180/pi);
	var f2 = lat2*(180/pi);
	var df = (lat2-lat1)*(180/pi);
	var dl = (lon2-lon1)*(180/pi);

	var a = Math.sin(df/2) * Math.sin(df/2) +
			Math.cos(f1) * Math.cos(f2) *
			Math.sin(dl/2) * Math.sin(dl/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return d = R * c;
}