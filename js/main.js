$(function() {

	var values = []; //{val:800000,rate:0.25}
	var acumAnterior = 0;
	var acum = 0;

	function getRate(val) {
		console.log('getRate en base a ' + val);

		if (val <= 800000.00) {
			return 0;
		}
		if (val >= 800000.01 && val <= 2500000.00) {
			return 0.25;
		}
		if (val >= 2500000.01 && val <= 5000000.00) {
			return 0.50;
		}
		if (val >= 5000000.01 && val <= 8000000.00) {
			return 0.75;
		}
		if (val >= 8000000.01) { // && val <= 999999999.00
			return 1.00;
		}
	}


	$('#add').on('click', function(event) {
		add();
		if (!event) event = window.event;
		event.preventDefault();
	});

	$('#reset').on('click', function() {
		values = [];
		acum = 0;
		acumAnterior = 0;
		$("#myTable tbody").html('');
	});

	function add() {
		var val = $('#input').val();
		if (val == "" || isNaN(val)) {
			console.log('input invalido');
		} else {
			var num = parseFloat(val);
			acum = acum + num;
			var rate = getRate(acum);
			var newObj = {
				val: num,
				rate: rate,
				acum: acum,
				interest: (num * rate) / 100
			};
			console.info(newObj);
			values.push(newObj);
			updateTable();
			//console.log(values);
			//console.info('New value added: ' + JSON.stringify(newObj));
		}
	}

	function updateTable() {
		$("#myTable tbody").html('');
		console.log(values);
		var totalInterest = 0;
		for (var x in values) {
			var valObj = values[x];
			totalInterest = totalInterest + valObj.interest;
			addRow(valObj.val, valObj.acum, valObj.interest);
			console.log('addRow');
		}



		$('.total').html(valObj.acum);
		$('.totalAnnualInterest').html(totalInterest);

	}

	function addRow(val, acum, interestVal) {
		var $tr = $("<tr/>");
		var $tdVal = $("<td/>").html(val);
		$tdVal.appendTo($tr);
		var $tdAcum = $("<td/>").html(acum);
		$tdAcum.appendTo($tr);
		var $tdTotInterest = $("<td/>").html(interestVal);
		$tdTotInterest.appendTo($tr);
		$("#myTable tbody").append($tr);
	}



});