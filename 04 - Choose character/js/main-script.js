attachEventListeners();

function takeTextFromForm(selector) {
    var $selectInputText = $(selector);
    var inputTextValue = $selectInputText.val();
    return inputTextValue;
}

function getUnitNameValue() {
    return takeTextFromForm("#unit-name");
}

function getUnitClassValue() {
    return takeTextFromForm("#unit-class option:selected");
}

function unitDesctription() {
    var unitDescriptionObject = {
        name: getUnitNameValue(),
        clazz: getUnitClassValue(),
        type: getUnitTypeValue(),
    };
    return unitDescriptionObject;
}

function showUnitTypeSelect(selector) {
    var $unitType = $(selector);
    var unitTypeSelect = $unitType.fadeIn();
}

function hideUnitTypeSelect(selector) {
    var $unitType = $(selector);
    var unitTypeSelect = $unitType.hide();
}

function getUnitTypeValue() {
    if (takeTextFromForm("#unit-class") === "Knight") {
        return takeTextFromForm("#knight-type option:selected");
    }
    return takeTextFromForm("#mage-type option:selected");
}

function createUnitDescription(selector, textValue) {
    $(selector).text(textValue);
}

function changeAttributeValue(selector, attributeName, attributeValue) {
    $(selector).attr(attributeName, attributeValue);
}

function createUnitPortrait() {
    var unitType = getUnitTypeValue();
    switch(unitType) {
        case "Warrior":
            changeAttributeValue("#character-portrait", "src", "images/warrior.jpg");
            break;
        case "Paladin":
            changeAttributeValue("#character-portrait", "src", "images/paladin.jpg");
            break;
        case "Arcanemage":
            changeAttributeValue("#character-portrait", "src", "images/arcane.jpg");
            break;
        case "Druid":
            changeAttributeValue("#character-portrait", "src", "images/druid.jpg");
            break;
    }
}

function attachEventListeners() {
    $("#unit-name").change(function() {
        getUnitNameValue();
    });

    $("#unit-class").change(function() {
        getUnitClassValue();
        if (getUnitClassValue() === "Knight") {
            showUnitTypeSelect(".knight-type-select");
            hideUnitTypeSelect(".mage-type-select");
        } else {
            showUnitTypeSelect(".mage-type-select");
            hideUnitTypeSelect(".knight-type-select");
        }
    });

    $("#btn-unit-create").click(function() {
        createUnitDescription("span#character-name", unitDesctription().name);
        createUnitDescription("span#character-class", unitDesctription().clazz);
        createUnitDescription("span#character-type", unitDesctription().type);
        createUnitPortrait();
        showUnitTypeSelect("#unit-result");
    });
}







