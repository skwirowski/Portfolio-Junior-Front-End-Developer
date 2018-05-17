function showHeroCreateView(event) {
    event.preventDefault();

    clearRegions();

    var addHeroRegion = document.getElementById("addHeroForm-region"),
        addHeroFormTemplate = ''
            + '<div class="form-container">'
            + '    <form id="heroCreate-form">'
            + '    <h1>Dodaj Herosa</h1>'
            + '<div class="form-group">'
            + '    <input type="text" name="name" />'
            + '    <label class="control-label" for="name">Nazwa Bohatera</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="photo" />'
            + '    <label class="control-label" for="photo">Adres/nazwa zdjęcia</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <input type="text" name="price" />'
            + '    <label class="control-label" for="price">Cena wynajmu zł/h</label><i class="bar"></i>'
            + '</div>'
            + '<div class="form-group">'
            + '    <textarea id="textarea"></textarea>'
            + '    <label class="control-label" for="textarea">Opis Bohatera</label><i class="bar"></i>'
            + '</div>'
            + '</form>'
            + '<div class="button-container">'
            + '    <button class="button" type="button" id="submitHero-button"><span>Submit</span></button>'
            + '</div>'
            + '</div>',
        HTMLelement = document.createElement("div");

    HTMLelement.innerHTML = addHeroFormTemplate;
    addHeroRegion.appendChild(HTMLelement);

    // after show actions

    var submitHeroButton = document.getElementById("submitHero-button");

    submitHeroButton.addEventListener("click", function(event) {
        event.preventDefault();

        var heroForm = document.forms["heroCreate-form"],
            heroData = prepareCreateHeroData(heroForm);

        addHero(heroData);
        clearRegions();
        showHeroListView();
    });
}