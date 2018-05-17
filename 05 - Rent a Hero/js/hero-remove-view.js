function showHeroRemoveView(event) {
    event.preventDefault();

    clearRegions();

    var heroesRemoveRegion = document.getElementById('heroesRemove-region'),
        element = document.createElement('div'),
        template = `
            <div class="form-container">
                <form id="heroRemove-form">
                <h1>Usuń Herosa :-(</h1>
            <div class="form-group">
                <select name="hero">
                <option>--- WYBIERZ ---</option>
                ${ getOptions() }
                </select>
                <label class="control-label" for="select">Wybierz istniejącego Heroesa</label><i class="bar"></i>
            </div>      
            </form>
            <div class="button-container">
                <button class="button" type="button" id="removeHero-submit"><span>Usuń</span></button>
            </div> 
        </div>`;

    element.innerHTML = template;
    heroesRemoveRegion.appendChild(element);

    // after show actions

    var removeSubmitButton = document.getElementById("removeHero-submit");

    removeSubmitButton.addEventListener("click", function(event) {
        event.preventDefault();
        var heroName = document.forms["heroRemove-form"].hero.value;
        removeHero(heroName);
    });
}

function getOptions() {
    var optionsString = ``;

    heroesList.forEach(function(hero) {
        optionsString += `<option>${hero.name}</option>`;
    });
    return optionsString;
}