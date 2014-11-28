
var x = 2;
var y = 2;

var extension_values = [];
var extension_ticks  = [0];
var extension_images = [
						['value', 'possibility'],
						[0,0]
						]; 

var trapezoid_values = [1,2,3,4];
var trapezoid_ticks = [1,2,3,4];
var trapezoid_images = [
			          ['value', 'possibility'],
			          [1,  0],
			          [2,  1],
			          [3,  1],
			          [4,  0]
			        ];

function increment() {
	x = x + 1;
	y = y + 1;
}

function trapezoid() {
	$('#trapezoid').show();
	$('#by-extension').hide();
	$('#bt1').attr('onclick','sentByTrap()')
}

function byExtension() {
	$('#trapezoid').hide();
	$('#by-extension').show();
	$('#bt1').attr('onclick','sentByExt()')

}

function addByExtension() {
	if (y < 15) {
		$("#extension-elements tr").append("<td id='extension_"+ x +"'>"
			+ "<input type='text' class='form-control by-extension-element' placeholder=v  id='v" + x + "' onchange='changeByExtension("+ x +")'>"
			+ "<input type='text' class='form-control by-extension-element' placeholder=g id='p" + x + "' onchange='changeByExtension("+ x +")'>"
			+ "<button type='button' class='btn btn-default btn-xs' style='width: 40px;' onclick='removeByExtension("+ x +")'>"
			+ "<span class='glyphicon glyphicon-trash'></span>"
			+ "</button> </td>");
		increment();
	}
}

function removeByExtension(id) {
	var index = 0;
	for (var i = 0; i < extension_values.length; i++) {
		if (extension_values[i][0] == id) {
			index = i;
			break;
		}
	}
	extension_values.splice(index, 1);
	changeExtensionChartVariables();
	draw_extension();
	$("#extension_" + id).remove()
	y = y - 1;
}


function changeTrapezoid(position) {
	if ($("#x"+(position+1)).val() == "null") {
		if (position == 0 || position == 1) {
			trapezoid_values[position] = trapezoid_values[position+1] - 1;
			trapezoid_images[1][1] = 1;
		} else {
			trapezoid_values[position] = trapezoid_values[position];
			trapezoid_images[4][1] = 1;
		}
	} else {
		trapezoid_values[position - 2] = parseInt($("#x"+ (position+1)).val());
		trapezoid_images[position + 1][0] = parseInt($("#x"+(position+1)).val());
		if (position == 0) {
			trapezoid_images[position + 1][1] = 0;
		} else if (position == 1) {
			trapezoid_images[position + 1][1] = 1;
		} else if (position == 2) {
			trapezoid_images[position + 1][1] = 1;
		} else if (position == 3) {
			trapezoid_images[position + 1][1] = 0;
		}
	}
	trapezoid_ticks = [];
	for (var i = trapezoid_values[0]; i < (trapezoid_values[3] + 1); i ++) {
		trapezoid_ticks.push(parseInt(i));
	}
	draw_trapezoid();
}

function changeExtensionChartVariables() {
	extension_ticks = [];
	extension_images = [['value','possibility']];
	for (var i = 0; i < extension_values.length; i++) {
		extension_ticks.push(parseFloat(extension_values[i][1]));
		extension_images.push([parseFloat(extension_values[i][1]),parseFloat(extension_values[i][2])]);
	}
}

function changeByExtension(position) {
	if ($("#v"+position).val() != "" && $("#p"+position).val() != "") {
		extension_values.push([position, $("#v"+position).val(), $("#p"+position).val()]);
		changeExtensionChartVariables();
		draw_extension();
	}
}

function sentByExt(){
	var name = $('#name').val();
	var val = [];
	var grd = [];
	var params;
	var i;
	var abort = false;

	for(i = 1; i < x; i++){
		if (($("#v"+i).val() === undefined) == false){
			val[i] = $("#v"+i).val();
			$("#v"+i).val("");
		} else {
			abort = true;
		}
		if (($("#p"+i).val() === undefined) == false){
			grd[i] = $("#p"+i).val();
			$("#p"+i).val("");
		} else {
			abort = true;
		}
	}

	if (($("#name").val() === undefined) == true){
		abort = true;
	}

	if (abort == false){
		$("#name").val("")

		params = {
			"name" : name,
			"valor" : val,
			"grado" : grd,
		};
		$.ajax({
			type: 'POST',
			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
			url: "/createByExt",
			cache: false,
			data: params,
	    success : function(data, status, xhr) {
	    }
		});		
	}
}

function sentByTrap(){
	var name = $('#name').val();
	var x1;
	var x2;
	var x3;
	var x4;
	var params;
	var abort = false;

	if (($("#x1").val() === undefined) == true){
		abort = true;
	} else {
		x1 = $("#x1").val()
	}
	if (($("#x2").val() === undefined) == true){
		abort = true;
	} else {
		x2 = $("#x2").val()
	}
	if (($("#x3").val() === undefined) == true){
		abort = true;
	} else {
		x3 = $("#x3").val()
	}
	if (($("#x4").val() === undefined) == true){
		abort = true;
	} else {
		x4 = $("#x4").val()
	}
	if (($("#name").val() === undefined) == true){
		abort = true;
	}

	if (abort == false){
		$("#x1").val("")
		$("#x2").val("")
		$("#x3").val("")
		$("#x4").val("")
		$("#name").val("")

		params = {
			"name" : name,
			"x1" : x1,
			"x2" : x2,
			"x3" : x3,
			"x4" : x4,
		};
		$.ajax({
			type: 'POST',
			beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
			url: "/createByTrap",
			cache: false,
			data: params,
	    success : function(data, status, xhr) {
	    }
		});		
	}
}