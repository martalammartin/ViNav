//Demo function. In final ver, we intend to implement this as a server database query
function constructWay(initWaypoint, endWaypoint, callback) {
			
	var JSONdata = $.getJSON("js/URLS.json", function(data){
		console.log(data);
		if(!data[initWaypoint]) {
			return callback(null);
		}
		
		var urls = data[initWaypoint][endWaypoint];
		
		//Skeleton of what the real function (implemented on server) would look like
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

//Marks the visible video
var actual_video = 0;

//Lenght of urls
var max;

//Dinamically generates videotags and points them to videos
function generateVideos(list_of_videos)
{
	//Consigo el elemento video
	//console.log("starts trouble")
	var videoContainer = document.getElementById("VideoContainer");
	<!--videoContainer.setAttribute("heigth", "80%");--> 
	max = list_of_videos.length
	
	for(var i= 0; i<max; i++)
	{
		var videoTag = document.createElement("video");
		videoTag.src = list_of_videos[i];
		videoTag.id = "video"+i;
		videoTag.controls = true;
		//videoTag.autoplay = true;
		videoTag.addEventListener('ended', nextVideo,false);
		videoTag.setAttribute('type', "video/mp4")
		//console.log(videoTag)
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
	if (actual_video != max - 1) //There's no video after the last video
	{
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "none";
		actual_video++;
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "inline";
	}
	
	//console.log(actual_video)
	
	if(actual_video == max - 1) //Same as above
	{
		document.getElementById('next').style.display = "none";
	}
	document.getElementById('ant').style.display = "inline";
}

function antVideo()
{
	if (actual_video != 0) //There's no video before the first video
	{
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "none";
		actual_video--;
		var actual = document.getElementById("video"+actual_video);
		actual.style.display = "inline";
	}
	
	//console.log(actual_video)
	
	if (actual_video == 0) //Same as above
	{
		document.getElementById("ant").style.display = "none";
	}
	document.getElementById("next").style.display = "inline";
}

function changeVideoSpeed(){
	var actualVideo = document.getElementById("video"+actual_video);
	actualVideo.playbackRate = (actualVideo.playbackRate == 1) ?2 :1;
	console.log(actualVideo.playbackRate);
}

function loadVideoScreen(){
	
	var dvas =  document.getElementById("endWaypoint").value;
	var dest =  document.getElementById("initWaypoint").value;
	
	document.getElementById("logo").setAttribute('style', 'display: none');
	document.getElementById("next").setAttribute('style', 'display: inline');//style.
	document.getElementById("ant").setAttribute('style', 'display: inline');
	document.getElementById("endWaypoint").setAttribute('style', 'display: none');
	document.getElementById("initWaypoint").setAttribute('style', 'display: none');
	document.getElementById("butF").setAttribute('style', 'display: none');
	document.getElementById("text1").setAttribute('style', 'display: none');
	document.getElementById("text2").setAttribute('style', 'display: none');
	document.getElementById("exit").setAttribute('style', 'display: inline');
	document.getElementById("geo").setAttribute('style', 'display: none');
	
	startTrayectory();
}

function startTrayectory(){
	actual_video = 0;
	var init = $("#initWaypoint").val();
	console.log(init)
	var end = $("#endWaypoint").val();
	console.log(end)
	var urls = constructWay(init, end, function(urls){
		console.log("urls: ", urls);
		//var videos = downloadVideos(urls); //Comment this if loading from disk
		if (urls && urls.length != 0)generateVideos(urls); //Pasar urls como argumento si cargamos de disco
		else{ 
			alert("El punto de salida o llegada no existe");
			endTrayectory();
		}
	});
}

//Goes back to main screen
function endTrayectory(){
	$("video").remove();
	document.getElementById("logo").setAttribute('style', 'display: inline');
	document.getElementById("next").setAttribute('style', 'display: none');
	document.getElementById("ant").setAttribute('style', 'display: none')
	document.getElementById("endWaypoint").setAttribute('style', 'display: inline');
	document.getElementById("initWaypoint").setAttribute('style', 'display: inline');
	document.getElementById("butF").setAttribute('style', 'display: inline');
	document.getElementById("text1").setAttribute('style', 'display: inline');
	document.getElementById("text2").setAttribute('style', 'display: inline');
	document.getElementById("exit").setAttribute('style', 'display: none');
	document.getElementById("geo").setAttribute('style', 'display: inline');
}

/*------------------------------------------
Geolocalization functions
------------------------------------------*/

var lat, lng;
//The following var will not be in the final ver
var lat0=40.45224206075855;//A MODIFICAR, ESTA ES LA LATITUD DE LA PUERTA DE ENTRADA AL METRO
var lng0=-3.726641827707727;//A MODIFICAR, ESTA ES LA LONGITUD DE LA PUERTA DE ENTRADA AL METRO


function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + 
			   Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344 * 1000;
	return dist; //Metres
}

//Main function of geolocalization
function geolocalizar(){
	GMaps.geolocate({ //From gmaps.js
		success: function(position){
		 // tabla+="SUCCESS<br>";
			lat = position.coords.latitude;  
			lng = position.coords.longitude;
		},
		error: function(error) { 
		if (error.code == error.PERMISSION_DENIED)
		{
			console.log("Stop stalking, GPS");
		}
		},
	  not_supported: function(){ alert("Su navegador no soporta geolocalización"); },
	  options: { maximumAge: 0 ,
				enableHighAccuracy: true}
	});
}

//DEMO: in final version will be queried to a server
function locateCloserEntry(lat, lng){
	return "Ciudad Universitaria";
}

function geolocate(){
	//console.log("check_error_d")
	geolocalizar();
	var difMeters= distance(lat,lng,lat0,lng0);
	if(difMeters<200){
	  var init = document.getElementById("initWaypoint").value = locateCloserEntry(lat, lng);
	}
}
