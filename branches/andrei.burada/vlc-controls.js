var vlc = document.getElementById("vlc");
	   
	   var items_list=new Array();
	   var items_count=0;
	   
       if(vlc){
          document.getElementById("info").innerHTML = "Ready";
       } else {
          document.getElementById("info").innerHTML = "Not Ready";
       }
       function mute(){
          vlc.audio.toggleMute();
       }
	   
	   function add_to_playlist(){
                  var input = document.getElementById("txtin");
                  vlc.playlist.add(input.value);
                  items_list[items_count] = input.value;
				  items_count++;
                  //else_r();
           }

	   
       function play(){
          vlc.playlist.play();
          intval = setInterval(uptime, 250);
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
	   
	   function next()
       {
                vlc.playlist.next();
       }
	   
	   function getplaylist()
       {
				var playlist=document.getElementById("playlist");
				playlist.innerHTML = vlc.playlist.items.count+"<br/>";
				var i=0;
				for (i=0;i<items_count;i++) {
					playlist.innerHTML+=items_list[i]+"<br/>";
				}
       }
	   
       function createplaylist()
       {
                var id1 = vlc.playlist.add("file:///home/stefan/Desktop/test/test.avi");
                var id2 = vlc.playlist.add("file:///home/stefan/Desktop/test/test2.avi");
                vlc.playlist.playItem(id);
       }


       function uptime(){
          document.getElementById("nowt").innerHTML = eval(vlc.input.time/1000);
       }
       function else_r(){
          oi = document.getElementById("txtout");
          oi.value = '';
          oi.value += vlc.versionInfo() +"\n";
          oi.value += "VLC position " + vlc.input.position +"\n";
          oi.value += "VLC length " + vlc.input.length +"\n";
          oi.value += "VLC rate " + vlc.input.rate +"\n";
          oi.value += "VLC is Playing " + vlc.playlist.isPlaying +"\n";
       }