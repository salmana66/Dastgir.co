function ValdateForm(frmID) {
    var errorCount = 0;
    debugger;
    $('#' + frmID).find(".required:not('.hidden,.notSelect')").each(function (e) {
        debugger;
        if ($(this).val().trim() === "") {
            $(this).focus();
            $(this).prop('placeholder', 'Field is required');
            $(this).css("border", "1px solid red");
            errorCount++;
            
        }
    });
    if (errorCount == 0)
        return true;
    return false;
}
function GridValdateForm(frmID) {
    var errorCount = 0;
    debugger;
    $(frmID).find(".required:not('.hidden')").each(function (e) {
        debugger;
        if ($(this).val().trim() === "") {
            $(this).focus();
            $(this).prop('placeholder', 'Field is required');
            errorCount++;
            return false;
        }
    });
    if (errorCount == 0)
        return true;
    return false;
}
ClearAll();
function ClearAll() {
    $('.Clear').live('click', function () {
        debugger;
        $('input[type=text],input[type=password],input[type=hidden],select,textarea').not(".Status,.onId").val('');
        $('.htmlRemove').html('');
        $('input[type=checkbox],input[type=radio]').prop('checked', false);
        $('input[type=text],input[type=checkbox],select').attr('disabled', false);

    });

}
function ClearAlltextBox() {
    $('input[type=text],input[type=password],input[type=hidden],select,textarea').not(".Status,.onId").val('');
    $('.htmlRemove').html('');
    $('input[type=checkbox],input[type=radio]').prop('checked', false);
    $('input[type=text],input[type=checkbox],select').attr('disabled', false);

}
function DisabledAttr(NotDis) {
    $('input[type=text],input[type=checkbox],select').attr('disabled', true);
    for (var i = 0; i < NotDis.length; i++) {
        $('.' + NotDis[i]).attr('disabled', false);
    }

}
IntegerVal();
NumericVal();
function TimePicker() {
    $('.datetimepicker1').timepicker('setTime', '');
    $('.datetimepicker2').timepicker('setTime', '');
}
function dateFun() {

    $('.form_date').datetimepicker({
        language: 'eng',
        weekStart: 4,
        today: 3,
        autoclose: 1,
        startView: 2,
        minView: 3
    });

}
function TimeFun() {

    $('.form_Time').datetimepicker({
        format: 'HH:ii p',
        autoclose: true,
        todayHighlight: true,
        showMeridian: true,
        startView: 1,
        maxView: 1
    });

}
function GetJSONFromControls($container, isInserting) {
    debugger;
    var objectData;
    objectData = {};
    var value = '';
    var para = '';
    debugger;
    $container.find('input[type=text],input[type=date],input[type=password],input[type=checkbox],input[type=hidden]:not(".notrequired")').each(function () {
        debugger;
        type = $(this).attr('type');
        var ID = $(this).attr('name');
        if (ID === undefined)
            ID = $(this).attr('id');
        if (ID === undefined)  // if still undefined, then we skip this input
        {
            alert($(this).parent().html() + ' has a control without name and ID');
        }
        var p = ID.split('$');
        para = p[p.length - 1];
        if ($(this).parents('tr').find('.checkbox').attr('name') == 'checkbox' && $(this).parents('tr').find('.checkbox').is(':checked') == true) {
            if (para !== '') {
                switch (type) {
                    case "text":
                        value = $.trim($(this).val());
                        if ($(this).hasClass('Numeric')) {
                            if (value === '' || value === undefined) {
                                value = "0";
                            }
                        }
                        break;
                    case "hidden":
                        value = $.trim($(this).val());
                        break;
                    case "date":
                        value = $.trim($(this).val());
                        break;
                    case "password":
                        value = $.trim($(this).val());
                        break;
                    case "checkbox":
                        value = $(this).is(':checked') ? 'true' : 'false';
                        break;
                }
                if (objectData[para] != null) {
                    if (!objectData[para].push) {
                        objectData[para] = [objectData[para]];
                    }
                    objectData[para].push(value);
                }
                else {
                    objectData[para] = value;
                }
            }
        } else if ($(this).parents('tr').find('.checkbox').attr('name') != 'checkbox') {

            if (para !== '') {
                switch (type) {
                    case "text":
                        value = $.trim($(this).val());
                        if ($(this).hasClass('Numeric')) {
                            if (value === '' || value === undefined) {
                                value = "0";
                            }
                        }
                        break;
                    case "hidden":
                        value = $.trim($(this).val());
                        break;
                    case "date":
                        value = $.trim($(this).val());
                        break;
                    case "password":
                        value = $.trim($(this).val());
                        break;
                    case "checkbox":
                        value = $(this).is(':checked') ? 'true' : 'false';
                        break;
                }
                if (objectData[para] != null) {
                    if (!objectData[para].push) {
                        objectData[para] = [objectData[para]];
                    }
                    objectData[para].push(value);
                }
                else {
                    objectData[para] = value;
                }
            }
        }

    });
    $container.find('textarea').each(function () {
        var ID = $(this).attr('name');
        if (ID === undefined)
            ID = $(this).attr('id');
        if (ID === undefined)  // if still undefined, then provide atleast one
            alert("No ID or Name provided for textarea");
        var p = ID.split('$');
        para = p[p.length - 1];
        if (para !== '') {
            value = $(this).val();
            if (objectData[para] != null) {
                if (!objectData[para].push) {
                    objectData[para] = [objectData[para]];
                }
                objectData[para].push(value);
            }
            else {
                objectData[para] = value;
            }
        }
    });
    /**NOW DO FOR RadioButtons*********************************/
    var $radioButtons = $container.find('.RadioButtons');
    debugger;
    $radioButtons.each(function () {
        debugger;
        var $firstRadio = $(this).find('input[type=radio]:first');
        var ID = $firstRadio.attr('name');
        if (ID === undefined)
            ID = $firstRadio.attr('id');
        if (ID === undefined)  // if still undefined, then provide atleast one
        {
            alert("No ID or Name provided for RadioButtons");
            return false;
        }
        var p = ID.split('$');
        para = p[p.length - 1];
        var value = $.trim($(this).find('input[type=radio]').filter(':checked').val());
        if (value == "on") {
            value = 1;
        } else {
            value = 0;
        }
        objectData[para] = value;
    });
    /**NOW DO FOR SELECT*********************************/
    debugger;
    $container.find('select').each(function () {
        debugger;
        //The control must have data-selection attribute which specifies what to be taken from this control
        // such as data-selection="value" and data-selection="text".
        // If attribute is not defined then we will take the value
        var ID = $(this).attr('name');
        if (ID === undefined)
            ID = $(this).attr('id');
        if (ID === undefined)  // if still undefined, then provide atleast one
            alert("No ID or Name provided for select");
        var p = ID.split('$');
        para = p[p.length - 1];
        if (para !== '') {
            selection = $(this).data('selection');
            //Dated: July 27, 2015
            if (selection === 'value') {
                //value = $.trim($(this).find('option:selected').val());
                value = $.trim($(this).find('option:selected').map(function () {
                    return $(this).val();
                }).get());
            }
            else {
                //value = $.trim($(this).find('option:selected').text());
                value = $.trim($(this).find('option:selected').map(function () {
                    return $(this).val();
                }).get());
            }
            if (objectData[para] != null) {
                if (!objectData[para].push) {
                    objectData[para] = [objectData[para]];
                }
                objectData[para].push(value);
            }
            else {
                objectData[para] = value;
            }
        }
    });
    objectData['isInserting'] = isInserting ? 'true' : 'false';
    debugger;
    //  alert(JSON.stringify(objectData));
    return objectData;
};

function IntegerVal() {
    $(".Integer").live('keypress', function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

}


function GetJSONFromControlsTwoObject($container, grid, isInserting) {
    //this
    debugger;
    var saveArray = [];
    var value = '';
    var para = '';
    var objectData = {};
    if ($container.length > 0) { //change
        $container.find('input[type=text],input[type=password],input[type=checkbox],input[type=hidden]').not('.notSelect').each(function () {
            debugger;
            type = $(this).attr('type');
            var ID = $(this).attr('name');
            if (ID === undefined)
                ID = $(this).attr('id');
            if (ID === undefined)  // if still undefined, then we skip this input
            {
                alert($(this).parent().html() + ' has a control without name and ID');
            }
            var p = ID.split('$');
            para = p[p.length - 1];
            if (para !== '') {
                switch (type) {
                    case "text":
                        value = $.trim($(this).val());
                        if ($(this).hasClass('Numeric')) {
                            if (value === '' || value === undefined) {
                                value = "0";
                            }
                        }
                        break;
                    case "hidden":
                        value = $.trim($(this).val());
                        break;
                    case "password":
                        value = $.trim($(this).val());
                        break;
                    case "checkbox":
                        value = $(this).is(':checked') ? 'true' : 'false';
                        break;

                }
                if (objectData[para] != null) {
                    if (!objectData[para].push) {
                        objectData[para] = [objectData[para]];
                    }
                    objectData[para].push(value);
                }
                else {
                    objectData[para] = value;
                }
            }
        });
        $container.find('textarea').each(function () {
            var ID = $(this).attr('name');
            if (ID === undefined)
                ID = $(this).attr('id');
            if (ID === undefined)  // if still undefined, then provide atleast one
                alert("No ID or Name provided for textarea");
            var p = ID.split('$');
            para = p[p.length - 1];
            if (para !== '') {
                value = $(this).val();
                if (objectData[para] != null) {
                    if (!objectData[para].push) {
                        objectData[para] = [objectData[para]];
                    }
                    objectData[para].push(value);
                }
                else {
                    objectData[para] = value;
                }
            }
        });
        /**NOW DO FOR RadioButtons*********************************/
        var $radioButtons = $container.find('.RadioButtons');
        debugger;
        $radioButtons.each(function () {
            debugger;
            var $firstRadio = $(this).find('input[type=radio]:first');
            var ID = $firstRadio.attr('name');
            if (ID === undefined)
                ID = $firstRadio.attr('id');
            if (ID === undefined)  // if still undefined, then provide atleast one
            {
                alert("No ID or Name provided for RadioButtons");
                return false;
            }
            var p = ID.split('$');
            para = p[p.length - 1];
            var value = $.trim($(this).find('input[type=radio]').filter(':checked').val());
            if (value == "on") {
                value = 1;
            } else {
                value = 0;
            }
            objectData[para] = value;
        });
        /**NOW DO FOR SELECT*********************************/
        debugger;
        $container.find('select').not('.notSelect').each(function () {
            debugger;
            //The control must have data-selection attribute which specifies what to be taken from this control
            // such as data-selection="value" and data-selection="text".
            // If attribute is not defined then we will take the value
            var ID = $(this).attr('name');
            if (ID === undefined)
                ID = $(this).attr('id');
            if (ID === undefined)  // if still undefined, then provide atleast one
                alert("No ID or Name provided for select");
            var p = ID.split('$');
            para = p[p.length - 1];
            if (para !== '') {
                selection = $(this).data('selection');
                //Dated: July 27, 2015
                if (selection === 'value') {
                    //value = $.trim($(this).find('option:selected').val());
                    value = $.trim($(this).find('option:selected').map(function () {
                        return $(this).val();
                    }).get());
                }
                else {
                    //value = $.trim($(this).find('option:selected').text());
                    value = $.trim($(this).find('option:selected').map(function () {
                        return $(this).val();
                    }).get());
                }
                if (objectData[para] != null) {
                    if (!objectData[para].push) {
                        objectData[para] = [objectData[para]];
                    }
                    objectData[para].push(value);
                }
                else {
                    objectData[para] = value;
                }
            }
        });
        //  alert(JSON.stringify(objectData));

        saveArray.push(objectData);
    }
    grid.each(function () {
        debugger;
        if ($(this).find('.checkbox').is(':checked') == true) {
            var objectData = {};
            var _Row = $(this);
            $(_Row).find('input[type=text],input[type=password],input[type=radio],input[type=checkbox],input[type=hidden],input[type=file]').each(function () {
                debugger;
                debugger;
                type = $(this).attr('type');

                var ID = $(this).attr('name');
                if (ID === undefined)
                    ID = $(this).attr('id');
                if (ID === undefined)  // if still undefined, then we skip this input
                {
                    alert($(this).parent().html() + ' has a control without name and ID');
                }
                var p = ID.split('$');
                para = p[p.length - 1];
                if (para !== '') {
                    switch (type) {
                        case "text":
                            value = $.trim($(this).val());
                            if ($(this).hasClass('Numeric')) {
                                if (value === '' || value === undefined) {
                                    value = "0";
                                }
                            }
                            break;
                        case "hidden":
                            value = $.trim($(this).val());
                            break;
                        case "select":
                            value = $.trim($(this).val());
                            break;
                        case "file":

                            var form = $(this)[0];
                            var dataString = new FormData(form);
                            value = new FormData(form);

                            break;
                        case "password":
                            value = $.trim($(this).val());
                            break;
                        case "label":
                            value = $.trim($(this).text());
                            break;
                        case "checkbox":
                            value = $(this).is(':checked') ? 'true' : 'false';
                            break;
                    }
                    if (objectData[para] != null) {
                        if (!objectData[para].push) {
                            objectData[para] = [objectData[para]];
                        }
                        objectData[para].push(value);
                    }
                    else {
                        objectData[para] = value;
                    }
                }
            });
            _Row.find('select').each(function () {
                debugger;
                //The control must have data-selection attribute which specifies what to be taken from this control
                // such as data-selection="value" and data-selection="text".
                // If attribute is not defined then we will take the value
                var ID = $(this).attr('name');
                if (ID === undefined)
                    ID = $(this).attr('id');
                if (ID === undefined)  // if still undefined, then provide atleast one
                    alert("No ID or Name provided for select");
                var p = ID.split('$');
                para = p[p.length - 1];
                if (para !== '') {
                    selection = $(this).data('selection');
                    //Dated: July 27, 2015
                    if (selection === 'value') {
                        //value = $.trim($(this).find('option:selected').val());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    else {
                        //value = $.trim($(this).find('option:selected').text());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    if (objectData[para] != null) {
                        if (!objectData[para].push) {
                            objectData[para] = [objectData[para]];
                        }
                        objectData[para].push(value);
                    }
                    else {
                        objectData[para] = value;
                    }
                }
            });
            /**NOW DO FOR RadioButtons*********************************/
            var $radioButtons = grid.find('.RadioButtons');
            debugger;
            $radioButtons.each(function () {
                debugger;
                var $firstRadio = $(this).find('input[type=radio]:first');
                var ID = $firstRadio.attr('name');
                if (ID === undefined)
                    ID = $firstRadio.attr('id');
                if (ID === undefined)  // if still undefined, then provide atleast one
                {
                    alert("No ID or Name provided for RadioButtons");
                    return false;
                }
                var p = ID.split('$');
                para = p[p.length - 1];
                var value = $.trim($(this).find('input[type=radio]').filter(':checked').val());
                objectData[para] = value;
            });
            /**NOW DO FOR SELECT*********************************/
            debugger;
            $container.find('select').each(function () {
                debugger;
                //The control must have data-selection attribute which specifies what to be taken from this control
                // such as data-selection="value" and data-selection="text".
                // If attribute is not defined then we will take the value
                var ID = $(this).attr('name');
                if (ID === undefined)
                    ID = $(this).attr('id');
                if (ID === undefined)  // if still undefined, then provide atleast one
                    alert("No ID or Name provided for select");
                var p = ID.split('$');
                para = p[p.length - 1];
                if (para !== '') {
                    selection = $(this).data('selection');
                    //Dated: July 27, 2015
                    if (selection === 'value') {
                        //value = $.trim($(this).find('option:selected').val());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    else {
                        //value = $.trim($(this).find('option:selected').text());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    if (objectData[para] != null) {
                        if (!objectData[para].push) {
                            objectData[para] = [objectData[para]];
                        }
                        objectData[para].push(value);
                    }
                    else {
                        objectData[para] = value;
                    }
                }
            });
            saveArray.push(objectData);
        } else if (!$(this).hasClass('checkbox')) {
            var objectData = {};
            var _Row = $(this)
            $(_Row).find('input[type=text],input[type=password],input[type=checkbox],input[type=radio],input[type=hidden],input[type=file]').each(function () {
                debugger;
                debugger;
                type = $(this).attr('type');

                var ID = $(this).attr('name');
                if (ID === undefined)
                    ID = $(this).attr('id');
                if (ID === undefined)  // if still undefined, then we skip this input
                {
                    alert($(this).parent().html() + ' has a control without name and ID');
                }
                var p = ID.split('$');
                para = p[p.length - 1];
                if (para !== '') {
                    switch (type) {
                        case "text":
                            value = $.trim($(this).val());
                            if ($(this).hasClass('Numeric')) {
                                if (value === '' || value === undefined) {
                                    value = "0";
                                }
                            }
                            break;
                        case "hidden":
                            value = $.trim($(this).val());
                            break;
                        case "password":
                            value = $.trim($(this).val());
                            break;
                        case "file":

                            var form = $(this)[0];
                            var dataString = new FormData(form);
                            value = new FormData(form);

                            break;
                        case "label":
                            value = $.trim($(this).text());
                            break;
                        case "checkbox":
                            value = $(this).is(':checked') ? 'true' : 'false';
                            break;
                    }
                    if (objectData[para] != null) {
                        if (!objectData[para].push) {
                            objectData[para] = [objectData[para]];
                        }
                        objectData[para].push(value);
                    }
                    else {
                        objectData[para] = value;
                    }
                }
            });



            /**NOW DO FOR Select*********************************/
            _Row.find('select').each(function () {
                debugger;
                //The control must have data-selection attribute which specifies what to be taken from this control
                // such as data-selection="value" and data-selection="text".
                // If attribute is not defined then we will take the value
                var ID = $(this).attr('name');
                if (ID === undefined)
                    ID = $(this).attr('id');
                if (ID === undefined)  // if still undefined, then provide atleast one
                    alert("No ID or Name provided for select");
                var p = ID.split('$');
                para = p[p.length - 1];
                if (para !== '') {
                    selection = $(this).data('selection');
                    //Dated: July 27, 2015
                    if (selection === 'value') {
                        //value = $.trim($(this).find('option:selected').val());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    else {
                        //value = $.trim($(this).find('option:selected').text());
                        value = $.trim($(this).find('option:selected').map(function () {
                            return $(this).val();
                        }).get());
                    }
                    if (objectData[para] != null) {
                        if (!objectData[para].push) {
                            objectData[para] = [objectData[para]];
                        }
                        objectData[para].push(value);
                    }
                    else {
                        objectData[para] = value;
                    }
                }
            });
            /**NOW DO FOR RadioButtons*********************************/
            var $radioButtons = grid.find('.RadioButtons');
            debugger;
            $radioButtons.each(function () {
                debugger;
                var $firstRadio = $(this).find('input[type=radio]:first');
                var ID = $firstRadio.attr('name');
                if (ID === undefined)
                    ID = $firstRadio.attr('id');
                if (ID === undefined)  // if still undefined, then provide atleast one
                {
                    alert("No ID or Name provided for RadioButtons");
                    return false;
                }
                var p = ID.split('$');
                para = p[p.length - 1];
                var value = $.trim($(this).find('input[type=radio]').filter(':checked').val());
                objectData[para] = value;
            });
            saveArray.push(objectData);
        }
    });
    //topTable.find('.required').each(function () {
    //    debugger;
    //    var ID = $(this).attr('name');
    //    if (ID === undefined)
    //        ID = $(this).attr('id');
    //    if (ID === undefined)  // if still undefined, then we skip this input
    //    {
    //        alert($(this).parent().html() + ' has a control without name and ID');
    //    }
    //    var p = ID.split('$');
    //    para = p[p.length - 1];
    //    if (para !== '') {
    //        value = $.trim($(this).val());
    //        if (objectData[para] != null) {
    //            if (!objectData[para].push) {
    //                objectData[para] = [objectData[para]];
    //            }
    //            objectData[para].push(value);
    //        }
    //        else {
    //            objectData[para] = value;
    //        }
    //    }
    //    saveArray.push(objectData);
    //});
    debugger;
    saveArray['isInserting'] = isInserting ? 'true' : 'false';
    //  alert(JSON.stringify(objectData));
    return saveArray;
}






function searchData($container) {
    debugger;
    var objectData;
    objectData = {};

    var value = '';
    var para = '';
    debugger;
    $container.find('input[type=text],input[type=password],input[type=checkbox],input[type=radio]').each(function () {
        type = $(this).attr('type');
        var ID = $(this).attr('name');
        if (ID === undefined)
            ID = $(this).attr('id');
        var p = ID.split('$');

        para = p[p.length - 1];

        if (para !== '') {
            switch (type) {
                case "text":
                    value = $.trim($(this).val());
                    break;
                case "checkbox":
                    value = $(this).is(':checked') ? 'true' : 'false';
                    break;
            }

            if (objectData[para] != null) {
                if (!objectData[para].push) {
                    objectData[para] = [objectData[para]];
                }
                objectData[para].push(value);
            }
            else {
                objectData[para] = value;
            }
        }
    });

    $container.find('textarea').each(function () {
        var ID = $(this).attr('name');

        if (ID === undefined)
            ID = $(this).attr('id');

        if (ID === undefined)  // if still undefined, then provide atleast one
            alert("No ID or Name provided for textarea");

        var p = ID.split('$');

        para = p[p.length - 1];

        if (para !== '') {
            value = $(this).val();
            if (objectData[para] != null) {
                if (!objectData[para].push) {
                    objectData[para] = [objectData[para]];
                }
                objectData[para].push(value);
            }
            else {
                objectData[para] = value;
            }
        }
    });

    /**NOW DO FOR RadioButtons*********************************/

    var $radioButtons = $container.find('.RadioButtons');
    $radioButtons.each(function () {
        var $firstRadio = $(this).find('input[type=radio]:first');

        var ID = $firstRadio.attr('name');
        if (ID === undefined)
            ID = $firstRadio.attr('id');
        if (ID === undefined)  // if still undefined, then provide atleast one
        {
            alert("No ID or Name provided for RadioButtons");
            return false;
        }
        var p = ID.split('$');
        para = p[p.length - 1];
        var value = $.trim($(this).find('input[type=radio]').filter(':checked').val());
        objectData[para] = value;
    });


    /**NOW DO FOR SELECT*********************************/
    debugger;
    $container.find('select').each(function () {
        debugger;
        var ID = $(this).attr('name');
        if (ID === undefined)
            ID = $(this).attr('id');
        var p = ID.split('$');
        para = p[p.length - 1];
        if (para !== '') {

            value = $.trim($(this).find('option:selected').map(function () {
                return $(this).val();
            }).get());

            if (objectData[para] != null) {
                if (!objectData[para].push) {
                    objectData[para] = [objectData[para]];
                }
                objectData[para].push(value);
            }
            else {
                objectData[para] = value;
            }
        }
    });
    return objectData;
}


function SaveDate(Data, Url) {
    debugger;
    var chk = false;
    $.ajax({
        url: Url,
        data: Data,
        type: 'POST',
        async: false,
        traditional: true,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            debugger;
            if (data == "1")
                chk = true;
            else if(data=="-1")
                alert("Username Already Exist !");
            else if (data == "isRedirect")
                chk = "isRedirect";
            else
                chk = data;
        }
    });
    return chk;
}
function NumericVal() {
    $('.Numeric').live('keypress', function (event) {
        if (event.which < 46 || event.which > 59 || event.which == 47) {
            event.preventDefault();
        } // prevent if not number/dot

        if (event.which == 46 && $(this).val().indexOf('.') != -1) {
            event.preventDefault();
        } // prevent if already dot
    });

}
function showGridData(Data, Url) {
    debugger;
    var dataList = "";
    $.ajax({
        url: Url,
        data: Data,
        async: false,
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            // $(".loader").show();
        },
        success: function (data) {
            debugger;
            dataList = data;
        },
    });
    return dataList;
}

function DeleteData(Data, Url) {
    debugger;
    var chk = false;

    $.ajax({
        url: Url,
        data: Data,
        type: 'POST',
        traditional: true,
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == "1") {
                chk = true;
            }
        },
        error: function () {
            Success = false;//doesnt goes here
        }
    });
    return chk;
}


function MultideleteRow(Values, deleteRow, actionUrl) {
    debugger;
    $.ajax({
        url: actionUrl,
        data: JSON.stringify(Values),
        type: 'POST',
        traditional: true,
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {

            deleteRow.remove();
        },
        error: function () {
            Success = false;//doesnt goes here
        }
    });

}
removeRow();
function removeRow() {
    $('.removeRow').live('click', function () {
        debugger;
        $(this).parents('tr').remove();
        SelectDisVendor();
        SelectDisWarehouse();;
    });
}

removeRow1();
function removeRow1() {
    $('.removeRow1').live('click', function () {
        debugger;
        $(this).parents('tr').remove();
        SelectDisVendor();
        SelectDisWarehouse();;
    });
}

removeRow2();
function removeRow2() {
    $('.removeRow2').live('click', function () {
        debugger;
        $(this).parents('tr').remove();
    });
}


//Get Section List from tbl_Section

//function SectionList(SchoolId) {
//    url = '/StudentMark/getSectionList/';
//    _data = JSON.stringify({ SchoolId: SchoolId });
//    var data = showGridData(_data, url);
//    $('.SectionId').find('option').remove();
//    var optionhtml1 = '<option value="' + "" + '">' + "-select Section-" + '</option>';
//    debugger;
//    $('.SectionId').append(optionhtml1);
//    for (var i = 0; i < data.length; i++) {
//        var obj = '<option value="' +
//        data[i].SectionId + '">' + data[i].SectionName + '</option>';
//        $('.SectionId').append(obj);
//    }
//}


//function ExamList(SchoolId, SessionId) {
//    url = '/StudentMark/getExamList/';
//    _data = JSON.stringify({ SchoolId: SchoolId, SessionId: SessionId });
//    var data = showGridData(_data, url);
//    $('.ExamId').find('option').remove();
//    var optionhtml1 = '<option value="' + "" + '">' + "-select Exam-" + '</option>';
//    debugger;
//    $('.ExamId').append(optionhtml1);
//    for (var i = 0; i < data.length; i++) {
//        var obj = '<option value="' +
//        data[i].ExamId + '">' + data[i].ExamTitle + '</option>';
//        $('.ExamId').append(obj);
//    }
//}

function GetSeg1() {

    $('.cSegment,.seglabel').remove();

    return $.ajax('/Inv_InventoryForm/Segment/').pipe(function (data) {

        //$(".modelbody").append(optionhtml1);
        $(".segments").html('');
        debugger;
        for (var i = 0; i < data.length; i++) {
            debugger;
            var _seg = "<label style=' padding:12px 0px 15px 0px;' for='" + [i + 1] + "'>" + [i + 1] + "</label></br>";
            $(".seg").append(_seg);
            var addSgChild = "<label style=' padding:12px 0px 15px 0px;' for='" + data[i].Text + "'>" + data[i].Text + "</label></br>";
            $(".segments").append(addSgChild);
            var _sgId = data[i].Value;

            b1(_sgId);
        }


    });
}
function b1(_sgId) {
    debugger;
    $.ajax({
        url: '/Inv_InventoryForm/GetChildSeg/',
        data: JSON.stringify({ sgId: _sgId }),
        type: 'POST',
        async: false,
        traditional: true,
        contentType: 'application/json; charset=utf-8',

        success: function (data) {


            var optionhtml1 = '<select class="form-control cSegment"  id="' + _sgId + '"><option value="' + "" + '">' + "--Select Segment--" + '</option><select>';

            $(".company").append(optionhtml1);
            $(".company").append("</br>");
            for (var i = 0; i < data.length; i++) {
                var addSgChild = '<option value="' +
                data[i].Value + '">' + data[i].Text + '---' + data[i].Value + '</option>';
                $(".cSegment:last").append(addSgChild);
            }



        },
    });
}


var _tr = "";
var _trDes = "";
$('.AccountSegment').live('click', function () {
    debugger;
    $('.segTable  tbody tr:last').find('.cSegment').val('');
    $('.segments').val('');
    _tr = $(this).closest('div').find('.ItemCode');
    _trDes = $(this).closest('div').parent().parent().find('.ItemDescription');
    var s = _tr.val();
    if (s != "") {
        s = s.split(".");
        for (var k = 0; k < s.length; k++) {

            $('.segTable  tbody tr:last').find('.cSegment option[value="' + s[k] + '"]').attr('selected', 'selected');
            // arr.push(s[k]);
        }
    }

    //GetSeg();

    $("#segmentModel").modal('show');


});



$('.pickId').live('click', function () {

    var arr = [];
    var arrLabel = [];
    var _checkError = true;
    $('.company option:selected').each(function () {
        debugger;
        if ($(this).val() != "") {
            arr.push($(this).val());
            _checkError = true
        } else {
            $(this).parent().focus();
            _checkError = false;
            return false;
        }
    });
    if (_checkError == true) {
        var con = "";
        var Descon = "";
        for (var i = 0; i < arr.length; i++) {

            con = con.concat(arr[i] + '.');
        }
        $('.segments label').each(function () {
            Descon = Descon.concat($(this).html() + '-');
        });
       

        if (arr.length != 0) {
            con = con.replace(/\.$/, "");
            Descon = Descon.replace(/\-$/, "");
            var Count = 0;
            $(_tr).parents('tr').parent().find('tr').each(function () {
                debugger;
                var ItemCode = $(this).find('#ItemCode').val();
               
                if (ItemCode.trim() == con) {
                    Count++;
                        alert("already Exit");
                        return false;
                    }
              
            });
            if (Count == 0) {
                $(_tr).val(con);
                $(_trDes).val(Descon);
                $(_tr).trigger('change');
            }
            $("#segmentModel").modal('hide');
        }
    }
});



function chkDataFound(val) {
    var chk = true;
    if (val == null || val == 0) {
        chk = false;
        custMessage("No Data is found");
        ClearAlltextBox();
        $('.Search').click();
    } else {
        //IsSearch =false;
        ShowButtonList();
        addNew();
    }
    return chk;
}

function disabledAll() {
    $('input[type=text],input[type=checkbox],input[type=radio],input[type=email],input[type=password],select,.addRow,.addRow2,.AccountSegment,.btnd').not('.AddNew,.Search,.not').prop('disabled', true);
    $('input[type=text]').prop('placeholder', '');
    $('.readonly').prop('readonly', true);
    $('.btn1').hide();
    $('.AddNew,.Search').show();
    $('tbody').find('td').removeClass('trBGColor');
}
function enabledAll() {
    $('input[type=text],input[type=checkbox],input[type=radio],input[type=email],input[type=password],select,.addRow,.addRow2,.AccountSegment,.btnd').not('.AddNew,.Search').prop('disabled', false);
    $('input[type=text]').prop('placeholder', '');
    $('.readonly').prop('readonly', true);
    $('.btn1').hide();
    $('.AddNew,.Search').show();
    $('tbody').find('td').removeClass('trBGColor');
}
function addNew() {
    $('input[type=text],input[type=checkbox],input[type=radio],select,button,.addRow,.addRow2,.btnd').not('.disabled').prop('disabled', false);

}
function ButtonList2() {
    $('.addRow').live('click', function () {
        $('.Save,.Clear').show();
    });
    $('.Clear').live('click', function () {
        $('.btn1').hide();
        $('.addRow').show();
    });
}
function ButtonList1() {

    $('.AddNew').live('click', function () {
        debugger;
        addNew();
        $('.btn1').hide();
        $('.Save,.Cancel').show();
    });
    $('.Cancel').live('click', function () {
        disabledAll();

    });
    $('.Clear').live('click', function () {
        debugger;
        IsSearch = false;
    });


    $('.Search').live('click', function () {
        debugger;
        $('input[type=text],input[type=checkbox],input[type=radio],select,button,.addRow,.addRow2').prop('disabled', false);
        $('.readonly').prop('readonly', false);
        $('.btn1').hide();
        $('.Cancel').show();
        var x = ['ItemCode', 'cSegment', 'Enabletxt'];
        DisabledAttr(x);
        IsSearch = true;

    });
}
function ButtonList3() {

    $('.AddNew').live('click', function () {
        addNew();
        $('.btn1').hide();
    });
    $('.Cancel').live('click', function () {
        disabledAll();

    });
    $('.Clear').live('click', function () {
        debugger;
        IsSearch = false;
    });


    $('.Search').live('click', function () {
        debugger;
        $('input[type=text],input[type=checkbox],input[type=radio],select,button,.addRow,.addRow2').prop('disabled', false);
        $('.btn1').hide();
        $('.Cancel,.Save').show();
        var x = ['ItemCode', 'cSegment', 'Enabletxt'];
        DisabledAttr(x);
        IsSearch = true;

    });
}
function HighLightRow(tbody) {


    $(tbody).on("click keyup keydown keyup focus", "tr", "input[type=text],select", function (e) {

        // $(this).find('td:first').addClass('trBGColor');
        $('.AddGrid').find('td').removeClass("trBGColor");
        $(this).find('td:first')
            .toggleClass("trBGColor")

    });
    $(tbody + " tr").hover(function () {
        $(this).find('td:first').addClass('SelectedRow');
    }, function () {
        $('.AddGrid').find('td').removeClass("SelectedRow");
    });
}
function addClassInRow(Change, Class)
{
    $(Change).live("change", function (e) {
        debugger;
        var Id = $(this).parents('tr').attr('id').trim();

        $(this).parents('tr').addClass(Class);

    });
}
function CheckRowValidation(tbody) {
        $("table "+ tbody +" tr td > input[type=text],select").live("change", function (e) {
        debugger;
        var tr = $(this).parents('tr');
        var _Id = $(this).parents('tr').attr('id').trim();
        var length = $(tr).prevAll().length;

        for (var i = 0; i < length; i++) {
            var Id = $(tr).prevAll().closest('tr')[i].id.trim()
            var chk = false;
            chk = ValdateForm(Id);

            if (chk == false) {
                $('#' + _Id).find('input[type],select').prop('placeholder', '');
                $('#' + _Id).find('input[type],select').not('.onId').val('');
                i = length + 1;
            }

        }
    });

}
function ShowButtonList() {
    $('.btn1').hide();
    $('.Update,.Delete,.Cancel').show();
}

function RowClickBindData(tbody, DataBind) {
    $(tbody + ' tr input[type],select,td').live('click', function () {

        var Tr = $(this);
        $(Tr).parents('tr').find('input[type=text],select').each(function (key, Value) {

            var Val = "";
            var name = $(this).attr('name');
            if ($(this).attr('type') == 'text') {
                Val = $(this).val();
            } else {
                Val = $(this).find('option:selected').text();
            }

            $(DataBind).find("[name='" + name + "']").val(Val);
        });
    });
}

function LiveShowData(tbody, DataBind) {
    $(tbody + ' tr input[type],select,td').live('keypress keyup keydown', function () {
        var Tr = $(this);
        var Val = "";
        var name = $(this).attr('name');
        if ($(this).attr('type') == 'text') {
            Val = $(this).val();
        } else {
            Val = $(this).find('option:selected').text();
        }
        $(DataBind).find("[name='" + name + "']").val(Val);
    });
}



function custMessage(Msg) {
    $('.custom-alert').hide();
    $('.customalert').show();
    $('.custAlert').html(Msg);
    setTimeout(
    function () {
        $('.custom-alert').hide(1500);
    }, 6000);
}
function custSaveMessage() {
    $('.custom-alert').hide();
    $('.SaveAlert').show();
    setTimeout(
    function () {
        $('.custom-alert').hide(1500);
    }, 6000);
}


function saveMsg() {
    $('.custom-alert').hide();
    $('.SaveAlert').show();
    $('.Clear').click();
    setTimeout(
   function () {
       $('.custom-alert').hide(1500);
   }, 6000);
}
function updateMsg() {
    $('.custom-alert').hide();
    $('.UpdateAlert').show();
    setTimeout(
   function () {
       $('.custom-alert').hide(1500);
   }, 6000);
}
function DeleteMsg() {
    $('.custom-alert').hide();
    $('.DeleteAlert').show();
    $('.Clear').click();
    setTimeout(
   function () {
       $('.custom-alert').hide(1500);
   }, 6000);
}
function DisabledData(Id, Class) {
    $(Id).find('input[type=text],select').not(Class).prop('disabled', true);
}
function SaveDataSingleObj(_Id, validationFrm, Url) {
    var chk = false;
    var _Id = $(_Id);
    var Save = false;
    debugger;
    chk = ValdateForm(validationFrm);
    debugger;
    if ((chk)) {
        var result = GetJSONFromControls(_Id, true);
        var url = Url;
        var Data = JSON.stringify(result);
        var Save = SaveDate(Data, url);
        if (Save == true) {
            saveMsg();
        }
    }

    return Save;
}
function UpdateDataSingleObj(_Id, validationFrm, Url) {
    var chk = false;
    var _Id = $(_Id);
    chk = ValdateForm(validationFrm);
    if ((chk)) {
        var result = GetJSONFromControls(_Id, true);
        var url = Url;
        var Data = JSON.stringify(result);
        var Save = SaveDate(Data, url);
        if (Save == true) {
            updateMsg();
        }
    }

}
function SaveDataMultiObj(_Id, validationFrm, _Class, Url) {
    var chk = false;
    var _Id = $(_Id);
    chk = ValdateForm(validationFrm);
    if ((chk)) {
        var _class = $(_Class);
        if (_class.length > 0) {
            var result = GetJSONFromControlsTwoObject(_Id, _class, true);
            var url = Url;
            var Data = JSON.stringify(result);
            var Save = SaveDate(Data, url);
            if (Save == true) {
                saveMsg();
            }
        } else {
            alert("One Row Should be added");
        }
    }

}
function SaveDataMultipleObj(_Id, validationFrm, _Class, Url) {
    var chk = false;
    var cChk = false;
    var _Id = $(_Id);
    var Save = false;
    chk = ValdateForm(validationFrm);
    cChk = GridValdateForm(_Class);
    if (chk == true && cChk==true) {
        var _class = $(_Class);
        
        if (_class.length > 0) {
            var result = GetJSONFromControlsTwoObject(_Id, _class, true);
            var url = Url;
            var Data = JSON.stringify(result);
            var _Data = SaveDate(Data, url);
            if (_Data == true) {
                Save = true;
            } else {
                Save = _Data;
            }
        } else {
            alert("One Row Should be added");
        }
        
    }
    return Save;
}
function UpdateDataMultiObj(_Id, validationFrm, _Class, Url) {
    var chk = false;
    var _Id = $(_Id);
    chk = ValdateForm(validationFrm);
    if ((chk)) {
        var _class = $(_Class);
        var result = GetJSONFromControlsTwoObject(_Id, _class, true);
        var url = Url;
        var Data = JSON.stringify(result);
        var Save = SaveDate(Data, url);
        if (Save == true) {
            updateMsg();
        }
    }

}


function MultiObjSimpleData(_Id, validationFrm, _Id1, validationFrm1, Url) {
    var chk = false;
    var chk1 = false;
    var _Id = $(_Id);
    var _Id1 = $(_Id1);
    var Save = false;
    debugger;
    chk = ValdateForm(validationFrm);
    chk1 = ValdateForm(validationFrm1);
    debugger;
    if ((chk) && (chk1)) {
        var obj1 = GetJSONFromControls(_Id, true);
        var obj2 = GetJSONFromControls(_Id1, true);
        var url = Url;
        var Data = JSON.stringify({ obj1: obj1, obj2: obj2 });
        var Save = SaveDate(Data, url);
        if (Save == true) {
            Save = true;
        }
    }

    return Save;
}

function DeleteRecord(Id, Url) {
    var isDelete = false;
    var data = JSON.stringify({ Id: Id });
    var url = Url;
    var chk = DeleteData(data, url);
    if ((chk)) {
        isDelete = true;
        DeleteMsg();
        disabledAll();

    }
    return isDelete;
}




//dublicate Item Code
function CheckItemDublicate(Url, Id) {


    var url = Url;
    var Data = JSON.stringify({ ItemCode: Id });
    var Count = showGridData(Data, url);
    if (Count > 0) {
        $('.ItemCode,.ItemDescription').val('');
        custMessage("This Item Code Already exit");
    }
}

function SaveDataTwoObj(_Id, validationFrm, _Class, _Id2, _Class2, Url) {
    var chk = false;
    var _Id = $(_Id);
    var _Id2 = $(_Id2);
    var Save = false;
    chk = ValdateForm(validationFrm);
    if ((chk)) {
        var _class = $(_Class);
        var _Class2 = $(_Class2);
        var obj1 = GetJSONFromControlsTwoObject(_Id, _class, true);
        var obj2 = GetJSONFromControlsTwoObject(_Id2, _Class2, true);
        var url = Url;
        var Data = JSON.stringify({ obj1: obj1, obj2: obj2 });
        var Save = SaveDate(Data, url);
        if (Save == true) {
            Save = true;
        }
    }
    return Save;
}

function CheckValueIsDublicate(Url, Id) {
    var url = Url;
    var Data = JSON.stringify({ Id: Id });
    var Count = showGridData(Data, url);
    return Count;
}

function SelectDisVendor() {
    var selVal = [];
    $(".VendorId").each(function () {
        selVal.push(this.value);
    });


    $(".VendorId").parents('tr').nextAll().find(".VendorId option").removeAttr("disabled").filter(function () {
        var a = $(this).parent("select").val();
        return (($.inArray(this.value, selVal) > -1) && (this.value != a))
    }).attr("disabled", "disabled");
}
function SelectDisWarehouse() {
    var selVal = [];
    $(".WarehouseId").each(function () {
        selVal.push(this.value);
    });


    $(".WarehouseId").parents('tr').nextAll().find(".WarehouseId option").removeAttr("disabled").filter(function () {
        var a = $(this).parent("select").val();
        return (($.inArray(this.value, selVal) > -1) && (this.value != a))
    }).attr("disabled", "disabled");
}
function IsNaN(val) {
    debugger;
    var chk = false;
    if (val != null) {
        if (val != undefined && val.trim() != '') {
            chk = true;
        }
    }
    return chk;
}
function addRow(tbody) {
    var Index =  $('.' + tbody + ' tr').length
    $('.' + tbody).append($('.' + tbody + ' tr:first').clone());
    $('.' + tbody + ' tr:last').find('.glyphicon-remove').addClass('removeRow');
    $('.' + tbody + ' tr:last').find('input[type=text],input[type=hidden],select').val('');
    $('.' + tbody + ' tr:last').find('input[type=text],input[type=hidden],select').prop('placeholder', '');
    $('.' + tbody + ' tr:last').find('input[type=text],input[type=hidden],select').not('').val('');
    $('.' + tbody + ' tr:last').find('.Count').html((Index + 1));
    $('.' + tbody + ' tr:last').find('.count').html((Index + 1));
    $('.' + tbody + ' tr:last').attr('id', '' + tbody + '_' + '' + Index + '');
}


function GetTodayDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();


    var output =  (day < 10 ? '0' : '') + day + '/' +
       (month < 10 ? '0' : '') + month + '/' +
      d.getFullYear();

    return output;

}