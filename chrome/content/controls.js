

var vlc = document.getElementById("vlc");

	   var list = "C:\\test.avi\n";
	   
       if(vlc){
          document.getElementById("info").innerHTML = "Ready";
       } else {
          document.getElementById("info").innerHTML = "Not Ready";
       }
	   
	   function alert_me(){
			alert("Play!");
		}
	   
       function mute(){
          vlc.audio.toggleMute();
       }
	   
	   function clear_playlist(){
			stop();
			vlc.playlist.items.clear();
			list = "C:\\test.avi\n";
			else_r();
		}
	   
       function play(){
          vlc.playlist.play();
          intval = setInterval(uptime, 250);
		  else_r();
       }
	   
       function stop(){
          clearInterval(intval);
          vlc.playlist.stop();

       }
       function pause(){   
          vlc.playlist.togglePause();
       }
	   
       function c_time(){
          return eval(vlc.input.time / 1000);
       }
       function seek(value){
       var vlc = document.getElementById("vlc");
          //alert(value);
          vlc.input.time = eval(value*1000)
          //return true;
       }
	   
       function backof(value){
		  var vlc = document.getElementById("vlc");
          vlc.input.time = vlc.input.time - eval(value*1000);
          //alert(vlc.input.state);
          //return true;
       }

       function uptime(){
          document.getElementById("nowt").innerHTML = eval(vlc.input.time/1000);
       }
	   
	   function add_to_playlist(){
		  var input = document.getElementById("txtin");
		  vlc.playlist.add(input.value);
		  list = list + input.value + "\n";
		  else_r();
	   }
	   
	   function next(){
			vlc.playlist.next();
		}
		
		function previous(){
			vlc.playlist.prev();
		}
		
       function else_r(){
          oi = document.getElementById("txtout");
          oi.value = '';
          oi.value += vlc.versionInfo() +"\n";
          oi.value += "VLC position " + vlc.input.position +"\n";
          oi.value += "VLC length " + vlc.input.length +"\n";
          oi.value += "VLC rate " + vlc.input.rate +"\n";
          oi.value += "VLC is Playing " + vlc.playlist.isPlaying +"\n";
		  oi.value += "Playlist items: " + vlc.playlist.items.count + "\n";
		  oi.value += list;
       }