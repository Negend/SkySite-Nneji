$(loaded)
function loaded (){

	var programs = []
	// var programs = <%= @programs %>

	updatePrograms()
// when mood is submitted, event kicks off to change listings
	$('#refresh-mood').click(function(){
		if (programs.length == 0) {
			alert("No Content to display. Please upload.")
			return
		}
		var moods = getMood()
		var x = createNewProgramList(moods)
		var programsDisplayed = recommendPrograms(x)
		$('#program1-title').html(programsDisplayed[0].title)  
		$('#program2-title').html(programsDisplayed[1].title)  
		$('#program3-title').html(programsDisplayed[2].title)  
		$('#program4-title').html(programsDisplayed[3].title)  
		$('#program5-title').html(programsDisplayed[4].title)  
		$('#program1-img').attr("src",programsDisplayed[0].img) 
		console.log(programsDisplayed[0].img) 
		$('#program2-img').attr("src",programsDisplayed[1].img)  
		$('#program3-img').attr("src",programsDisplayed[2].img)  
		$('#program4-img').attr("src",programsDisplayed[3].img)  
		$('#program5-img').attr("src",programsDisplayed[4].img)	  
	})

	$('#upload-sample').click(function(){
		programs = []
		programs = loadDoc("./Programs/sample.xml")
	})
	



	function createNewProgramList(moods){
		var programList = [];
		if (moods.length === 0){
			programList = programs
		}
		else {
			for(var x=0;x<moods.length;x++){
				programList = programList.concat(GetProgramsOfMood(moods[x]))
			}
		}
		return programList
	}

	function GetProgramsOfMood(mood){
		var moodPrograms = []
		programs.forEach(function(obj){
			if (mood === obj.mood){
				moodPrograms.push(obj)
			}
		})
		return moodPrograms			
	}
	
	function recommendPrograms(programList){
		var recommendedPrograms = []
		for(var i = 0; i < 5; i++){
			var x = Math.floor((Math.random() * programList.length)); 
			recommendedPrograms.push(programList[x])
			programList.splice(x,1)
		}
		return recommendedPrograms
	}

	function getMood(){
		
    var moodList = [
	    {first:"HAPPY",second:"SAD"},
	    {first:"AGITATED",second:"CALM"},
	    {first:"AWAKE",second:"TIRED"},
	    {first:"FEARLESS",second:"SCARED"}
    ]
		var moods = []
		for (var i = 0; i < moodList.length;i++){
			if ($(".mood")[i].value === "1")
			{
				var x = moodList[i].first
				moods.push(x)
			}
			else if($(".mood")[i].value === "3"){
				var x = moodList[i].second
				moods.push(x)
			}
		}
		return moods
	}

	function updatePrograms(){		
	  loadDoc("/Programs/program-list.xml")
		if (programs.length != 0) {
			$("#refresh-mood").click()
		}
	}

	function loadDoc(file) {
  	var xhttp = new XMLHttpRequest();
	  xhttp.open("GET", file, true) 
	  xhttp.send()
	  if(xhttp.responseXML){
	  	programs = getProgramFromFile(xhttp.responseXML)
	  }
	  else{
	  	xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {			    	
		    	programs = getProgramFromFile(this.responseXML);		    			
		    }
		  }
	  }  	  
	}

	function getProgramFromFile(xml){
		newProgramList = [];
		xml;
		if (xml.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue.toString()==="Empty"){
			return programs = []
		}
		var xmlPrograms = xml.getElementsByTagName("PROGRAM");
		for (var x=0;x<xmlPrograms.length;x++){
			var p=xmlPrograms[x]
	  	var obj = {title:"",img:"",mood:""}
	  	obj.img = p.getElementsByTagName("IMAGE")[0].childNodes[0].nodeValue.toString()
	  	obj.mood = p.getElementsByTagName("MOOD")[0].childNodes[0].nodeValue.toString()
	  	obj.title = p.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue.toString()
	  	newProgramList.push(obj)
	  }
	  return newProgramList
	}
 
  $("#form").submit(function(e){
  	e.preventDefault();
  })
}
