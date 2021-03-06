$(document).ready(function () {
    $('.selectpicker').selectpicker({
        size: 4
    });
    $('#patTest').parsley({
        excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden], input:hidden"
    });
    $('.bootstrap-select-searchbox').children(['input']).attr("autocomplete", 'off');
    $('.bootstrap-select-searchbox').children(['input']).attr("autocorrect", 'off');
    $('.bootstrap-select-searchbox').children(['input']).attr("autocapitalize", 'off');
    $('.bootstrap-select-searchbox').children(['input']).attr("spellcheck", 'false');
    $('.bootstrap-select-searchbox').children(['input']).keyup(function (e) {
        var code = (e.keyCode || e.which);
        if (code == 37 || code == 38 || code == 39 || code == 40) {
            return;
        }
        var searchTerm = $('.bootstrap-select-searchbox').children(['input']).val();
        if (searchTerm.length < 4) {
            return;
        }
        $.ajax({
            url: 'user/quicksearch?searchTerm=' + searchTerm,
            type: "GET",
            success: function (response) {
                $('#testOperator').find('option').remove();
                $.each(response, function (user) {
                    $('#testOperator').append(
                            $('<option></option>').html(response[user].title + ' ' + response[user].forename + ' ' + response[user].surname).val(response[user].id)
                            );
                });
                $('#testOperator').selectpicker('refresh');
            }
        });
    });
});

function test() {
    $('#patTest').parsley().validate();
    if ($('#patTest').parsley().isValid()) {
        var testOperator = $('#testOperator').val();
        var testOperatorName = $("#testOperator option:selected").text();
        var barcode = encodeURIComponent($('#itemBarcode').val());
        var earthResistanceOhms = encodeURIComponent($('#earthResistanceOhms').val() || null);
        var insulationResistanceMOhms = encodeURIComponent($('#insulationResistanceMOhms').val() || null);
        $.ajax({
            url: 'item/' + barcode + '/check',
            type: "GET",
            success: function (response) {
                if (response === "barcode_in_use") {
                    $.ajax({
                        url: 'item/' + barcode + '/test?earthResistanceOhms=' + earthResistanceOhms + '&insulationResistanceMOhms=' + insulationResistanceMOhms + '&testOperator=' + testOperator,
                        type: "PUT",
                        success: function (response) {
                            addCompletedTestRow(barcode,response.itemTypeName, testOperatorName, response.testId);
                            resetScreen();
                        }
                    });
                    $('#itemBarcode').removeClass('parsley-error');
                    $('#noTestAlert').hide();
                } else {
                    $('#itemBarcode').addClass('parsley-error');
                    $('#itemBarcode').val('');
                }
            },
        });

    }
}

function enableDisableTestMeasurements() {
    $('.testMeasurements').toggle();
}

function addCompletedTestRow(barcode, itemTypeName, testOperator, testId) {
    $('#completedTestTable').show();
    $('#completedTestTable tr:first').after('<tr id="test-' + testId + '"><td><a href="item?itemBarcode=' + barcode + '">' + barcode + '</ahref></td><td>' + itemTypeName + '</td><td>' + testOperator + '</td><td><a href="#" onclick="undoTest(' + testId + '); return false;">Undo test</a></td></tr>');
}

function resetScreen() {
    $('#itemBarcode').val('');
    $('#earthResistanceOhms').val('');
    $('#insulationResistanceMOhms').val('');
}

function undoTest(testId) {
    $.ajax({
        url: 'test/' + testId + '/undo',
        type: "PUT",
        success: function() {
            $('#test-' + testId).remove();
        }
    })
}