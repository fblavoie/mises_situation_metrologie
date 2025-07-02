
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
	let c = ca[i];
	while (c.charAt(0) == ' ') {
	  c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
	  return c.substring(name.length, c.length);
	}
  }
  return "";
}

function get_url_param(param_name,default_value){
	extraction = urlParams.get(param_name)
	if(extraction == null){
		extraction = default_value
	}
	else{
		extraction = parseFloat(extraction)
	}
	return extraction
}

function signal_calculation(){


	slider_value = $("#pressure_value").val()
	pressure_value = slider_value/1001*(max_measure*reachable-min_measure)+min_measure

	
	
	// Modify balloun (VISUAL ONLY)
	fraction = $("#pressure_value").val()/1001*(reachable-min_measure/max_measure) + min_measure/max_measure
	$("#balloun").css("top",	(300-fraction*300) +"px" )
	$("#balloun").css("height",	(50+fraction*300) +"px" )
	$("#balloun").css("left",	(100-fraction*100) +"px" )
	$("#balloun").css("width",	(50+fraction*200) +"px" )

	
	// Round value to show
	if(min_measure_scaling == 1){ // Consider min_measure in scaling
		pressure_value_round = fraction*(max_measure)
	}
	else{ // Only consider max_measure in scaling
		pressure_value_round = fraction*(max_measure)
	}
	pressure_value_round = round(pressure_value_round,1)
	$("#pressure_show").html(pressure_value_round)
	
	
	// Convert pressure to signal
	if(min_measure_scaling == 1){ // Consider min_measure in scaling
		signal = (pressure_value-min_measure)/(max_measure-min_measure)*(max_signal-min_signal)+min_signal
	}
	else{ // Only consider max_measure in scaling
		signal = (pressure_value)/(max_measure)*(max_signal-min_signal)+min_signal
	}
	
	
	
	// Insert analogic value in box
	$("#analog_input_0").val(round(signal,5))
	
	
	
	
	return signal
	
	
}