
var x = 2;
var y = 2;

function increment() {
	x = x + 1;
	y = y + 1;
}

function trapezoid() {
	$('#trapezoid').show();
	$('#by-extension').hide();
}

function byExtension() {
	$('#trapezoid').hide();
	$('#by-extension').show();
}

function addByExtension() {
	if (y < 16) {
		$("#extension-elements tr").append("<td id='extension_"+ x +"'>"
			+ "<input type='text' class='form-control by-extension-element' placeholder=x>"
			+ "<input type='text' class='form-control by-extension-element' placeholder=y>"
			+ "<button type='button' class='btn btn-default btn-xs' style='width: 40px;' onclick='removeByExtension("+ x +")'>"
			+ "<span class='glyphicon glyphicon-trash'></span>"
			+ "</button> </td>");
		increment();
	}
}

function removeByExtension(id) {
	alert("removing: "+ id);
	$("#extension_" + id).remove()
	y = y - 1;
}