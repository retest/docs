(function ($) {
    $.fn.slideUpTransition = function () {
        return this.each(function () {
            var $el = $(this);
            $el.css("max-height", $el.outerHeight());
            setTimeout(function () {
                $el.css("max-height", "0");
                $el.addClass("height-transition-hidden");
                $el.removeClass("height-transition-shown");
            }, 1);
        });
    };

    $.fn.slideDownTransition = function () {
        return this.each(function () {
            var $el = $(this);
            $el.removeClass("height-transition-hidden");
            $el.addClass("height-transition-shown");
            // temporarily make visible to get the size
            $el.css("max-height", "none");
            var height = $el.outerHeight();

            // reset to 0 then animate with small delay
            $el.css("max-height", "0");

            setTimeout(function () {
                $el.css({"max-height": height});
            }, 1);
            setTimeout(function () {
                $el.css({"max-height": "none"});
            }, 501);
        });
    };
})(jQuery);

function css_rules() {
    var rules = {};
    var ds = document.styleSheets;
    for (var i = 0; i < ds.length; ++i) {
        var dsi = ds[i].cssRules;
        if(dsi != null) {
            for (var j = 0; j < dsi.length; ++j) {
                rules[dsi[j].selectorText] = dsi[j];
            }
        }
    }
    return rules;
}

function css_getClass(name) {
    var rules = css_rules();
    if (!rules.hasOwnProperty(name)) {
        throw 'No css-rule with name ' + name + ' found!';
    }
    return rules[name];
}

function push(array, index, element) {
    if (array[index] == null) {
        array[index] = new Array(element);
    } else {
        if ($.inArray(element, array[index]) == -1)
            array[index].push(element);
    }
}

function allChecked(array) {
    for (var idx = 0; idx < array.length; idx++) {
        if (document.getElementById(array[idx] + 'Check') != null && !document.getElementById(array[idx] + 'Check').checked) {
            return false;
        }
    }
    return true;
}

function checkElement(elementId, array1, array2, array3) {
    // an element is green if one of three things is true
    // it is checked
    if (document.getElementById(elementId + 'Check') != null && document.getElementById(elementId + 'Check').checked) {
        css_getClass('.' + elementId).style.background = '';
        return;
    }
    // all attributes of the screen are checked
    if (array1[elementId] && allChecked(array1[elementId])) {
        css_getClass('.' + elementId).style.background = '';
        return;
    }
    // all components that appear in the screen are checked
    if (array2[elementId] && allChecked(array2[elementId])) {
        css_getClass('.' + elementId).style.background = '';
        return;
    }
    // all diffs in which the screen appears are checked
    if (array3[elementId] && allChecked(array3[elementId])) {
        css_getClass('.' + elementId).style.background = '';
        return;
    }
    css_getClass('.' + elementId).style.background = 'yellow';
}

function markAttribute(attrId) {
    if (document.getElementById(attrId + 'Check').checked) {
        css_getClass('.' + attrId).style.background = '';
    } else {
        css_getClass('.' + attrId).style.background = 'yellow';
        unmarkElementScreen(attrId, attrs2Comps, attrs2Screens, attrs2Diffs);
        return;
    }
    if (attrs2Comps[attrId]) {
        for (var idx = 0; idx < attrs2Comps[attrId].length; idx++) {
            checkElement(attrs2Comps[attrId][idx], comps2Attrs, comps2Screens, comps2Diffs);
        }
    }
    for (idx = 0; idx < attrs2Screens[attrId].length; idx++) {
        checkElement(attrs2Screens[attrId][idx], screens2Attrs, screens2Comps, screens2Diffs);
    }
    for (idx = 0; idx < attrs2Diffs[attrId].length; idx++) {
        checkElement(attrs2Diffs[attrId][idx], diffs2Attrs, diffs2Comps, diffs2Screens);
    }
}

function markComponent(compId) {
    if (document.getElementById(compId + 'Check').checked) {
        css_getClass('.' + compId).style.background = '';
    } else {
        css_getClass('.' + compId).style.background = 'yellow';
        unmarkElementScreen(compId, comps2Attrs, comps2Screens, comps2Diffs);
        return;
    }
    if (comps2Attrs[compId]) {
        for (var idx = 0; idx < comps2Attrs[compId].length; idx++) {
            checkElement(comps2Attrs[compId][idx], attrs2Comps, attrs2Screens, attrs2Diffs);
        }
    }
    for (idx = 0; idx < comps2Screens[compId].length; idx++) {
        checkElement(comps2Screens[compId][idx], screens2Attrs, screens2Comps, screens2Diffs);
    }
    for (idx = 0; idx < comps2Diffs[compId].length; idx++) {
        checkElement(comps2Diffs[compId][idx], diffs2Attrs, diffs2Comps, diffs2Screens);
    }
}

function markScreen(screenId) {
    if (document.getElementById(screenId + 'Check').checked) {
        css_getClass('.' + screenId).style.background = '';
    } else {
        css_getClass('.' + screenId).style.background = 'yellow';
        unmarkElementScreen(screenId, screens2Attrs, screens2Comps, screens2Diffs);
        return;
    }
    if (screens2Attrs[screenId]) {
        for (var idx = 0; idx < screens2Attrs[screenId].length; idx++) {
            checkElement(screens2Attrs[screenId][idx], attrs2Comps, attrs2Screens, attrs2Diffs);
        }
    }
    if (screens2Comps[screenId]) {
        for (idx = 0; idx < screens2Comps[screenId].length; idx++) {
            checkElement(screens2Comps[screenId][idx], comps2Attrs, comps2Screens, comps2Diffs);
        }
    }
    for (idx = 0; idx < screens2Diffs[screenId].length; idx++) {
        checkElement(screens2Diffs[screenId][idx], diffs2Attrs, diffs2Comps, diffs2Screens);
    }
}

function unmarkElementScreen(elementId, array1, array2, array3) {
    if(array1[elementId]) {
        for(var i = 0; i < array1[elementId].length; i++) {
            css_getClass('.' + array1[elementId][i]).style.background = 'yellow';
        }
    }

    if(array2[elementId]) {
        for(i = 0; i < array2[elementId].length; i++) {
            css_getClass('.' + array2[elementId][i]).style.background = 'yellow';
        }
    }

    if(array3[elementId]) {
        for(i = 0; i < array3[elementId].length; i++) {
            css_getClass('.' + array3[elementId][i]).style.background = 'yellow';
        }
    }
}

