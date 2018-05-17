function showHeroEditView(event) {
    event.preventDefault();

    clearRegions();

    var heroesEditRegion = document.getElementById("heroesEdit-region"),
        element = document.createElement("div"),
        template = `
        <div class="form-container">
          <form id="heroEdit-form">
            <h1>Edytuj Herosa</h1>
            <div class="form-group">
              <select name="hero">
                <option>--- WYBIERZ ---</option>
                ${ getOptions() }
              </select>
              <label class="control-label" for="select">Wybierz istniejącego Heroesa</label><i class="bar"></i>
            </div>      
            <input type="hidden" name="name"/>
            <div class="form-group">
              <input type="text" name="photo" />
              <label class="control-label" for="photo">Adres/nazwa zdjęcia</label><i class="bar"></i>
            </div>
            <div class="form-group">
              <input type="text" name="price" />
              <label class="control-label" for="price">Cena wynajmu /h</label><i class="bar"></i>
            </div>
            <div class="form-group">
              <textarea id="textarea"></textarea>
              <label class="control-label" for="textarea">Textarea</label><i class="bar"></i>
            </div>
          </form>
          <div class="button-container">
            <button class="button" type="button" id="editHero-submit"><span>Edytuj</span></button>
          </div>
        </div>`;

    element.innerHTML = template;
    heroesEditRegion.appendChild(element);

    // after show actions

    var editSubmitButton = document.getElementById("editHero-submit");

    editSubmitButton.addEventListener("click", function(event) {
        event.preventDefault();

        var heroForm = document.forms["heroEdit-form"],
            heroName = prepareEditHeroData(heroForm).name,
            heroPrice = prepareEditHeroData(heroForm).price,
            heroPicture = prepareEditHeroData(heroForm).img,
            heroDescription = prepareEditHeroData(heroForm).desc;

        editHero(heroName, heroPrice, heroPicture, heroDescription);
    });
}

function getOptions() {
    var optionsString = ``;

    heroesList.forEach(function(hero) {
        optionsString += `<option>${hero.name}</option>`;
    });
    return optionsString;
}