$(loaded)
function loaded (){

	$('#mood-form').submit(function(e){
		e.preventDefault()
		var xhttp = new XMLHttpRequest()
	  xhttp.open("POST", "/", true) 
	  xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
	  xhttp.send('mood1='+ $("#mood1").val() + '&mood2='+ $("#mood2").val() + '&mood3='+ $("#mood3").val() + '&mood4=' + $("#mood4").val())
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {			    	
	    	$($('.sky-placeholder')[1]).html(this.response)	
	    }
	  }
 	})
}
