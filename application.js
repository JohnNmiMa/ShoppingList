var validateItem = function(itemName) {
	if (itemName === null || itemName == "") return false;
	var str = itemName.split(" ").join("");
	if(str.length == 0)
		return false;
	return true;
}


$(document).ready(function() {
	// jQuery UI code for tooltips
	$(document).tooltip();

	function displayItem(itemText) {
		$('<li><label><input type="checkbox" name="item">'+itemText+'</label></li>').prependTo("#items");
		//$('#items').prepend('<li><label><input type="checkbox" name="item">'+itemText+'</label></li>'); // same thin
	}

	// This is an event handler that works for all future elements
	// $(selector).on(event,"childSelector",function)
	// This says, that when a checkbox is added to the DOM,
	// a 'change' event handler is added to the checkbox.
	$('#items').on("change","input[type='checkbox']", function() {
		// The 'this' is the childSelector, not the primary selector
		var parent = $(this).parent(); // The parent is the 'label' element
		$(parent).toggleClass('checked');
	});

	function addItem(itemText) {
		try {
			if (validateItem(itemText) == false)
				throw {name:"Note", message:"Empty item string"};
			displayItem(itemText);
		} catch(e) {
		} finally {
			resetForm(event);
			event.preventDefault();
		}
	}

	$('#addItemButton').click(function(event) {
		var itemText = $('#addItemText').val();
		addItem(itemText);
		return true;
	});

	$('form').submit(function(event) {
		var itemText = $('#addItemText').val();
		addItem(itemText);
		return true;
	});

	$('#clearList').click(function () {
		if ($('#items li').length > 0) {
			var ans = confirm("Are you sure you want to clear the list?");
			if (ans==true) {
				$('#items').empty();
			}
		}
	});

	$('#clearChecked').click(function () {
		if ($('#items li label.checked').length > 0) {
			var ans = confirm("Are you sure you want to remove all checked off items?");
			if (ans==true) {
				$('label.checked').remove();
			}			
		}
	});

	function resetForm(event) {
		$('#addItemText').val("");
	};
});
