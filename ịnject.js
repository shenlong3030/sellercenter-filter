$.extend($.expr[":"], {
    "containsAny": function(element, index, match, array) {
        var inputWords = match[3].split(/\s+/);
        var textWords = $(element).text().split(/\s+/);
        var elementValue = $(element).text();

        textWords = textWords.map(function(val){
            return val.toLowerCase();
        });
        //console.log('', inputWords, textWords)
        var isSubset = inputWords.every(function(val) { 
          return elementValue.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        });
        return isSubset;
    }
});

function filterQuantityLessThan(val, colIndex) {
    console.log("run filter quantity with : ", val);
    
    // Declare variable
    var myTable = $(".next-table-body table:first");
    var listTR = myTable.find("tbody tr");
    // hide all TR
    listTR.hide();
    
    // find and show TR that have quantity < val
    listTR.filter(function (i, v) {
        var cellValue = $(this).find('td:eq(' + colIndex + ') .content').html();
        if(parseInt(cellValue) <= parseInt(val)) {
          	return true;
        }
        return false;
    }).show();
}

function filterName(val) {
    console.log("run filter name with : ", val);
    
    // hide all TR
    $(".next-table-body table tbody tr").hide();
    
    //$(".next-table-body table tbody tr td div a:containsAny('')").parents('tr').css( "background-color", "red" );
    $(".next-table-body table tbody tr td div a:containsAny('" + val.trim() + "')").parents('tr').show();
    $(".next-table-body table tbody tr td div span:containsAny('" + val.trim() + "')").parents('tr').show();
}


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

window.addEventListener('load', function(){
	// Everything has loaded!
  	console.log('Everything has loaded!');

    $('.next-tabs-bar').append('<input type="text" id="myNameInput" placeholder="Filter name"><input type="text" id="myQuantityInput" placeholder="Filter quantity">');
    $('.next-tabs-bar').append(createExpandAllButton());
    $("#myNameInput").keyup(function(){
        var inputVal = $("#myNameInput").val();
        console.log('name changed : ', inputVal);

        // return if empty imput
        if(!inputVal){
            return;
        }

        // return if inputVal not ending with space
        if(!(/\s+$/.test(inputVal))){
            return;
        }

        filterName(inputVal);
    });

	var currentTab = getUrlParameter("currentTab");
    $("#myQuantityInput").keyup(function(){
        var inputVal = $("#myQuantityInput").val();
        console.log('quantity changed : ', inputVal);

        // return if empty imput
        if(!inputVal){
            return;
        }

        // Best selling tab
        if($.isNumeric(inputVal)) {
            var colIndex = (currentTab === "bestSelling") ? 6 : 5;
            filterQuantityLessThan(inputVal, colIndex);
        } else { 
        }
    });
})


function createExpandAllButton() {
    return $('<button/>', {
        text: 'Expand all orders',
        id: 'btn_expand',
        click: expandAll
    });
}


function expandAll() {
    $('.next-table-expanded-ctrl').trigger('click');
    $('.next-table-expanded-row').show();
}
