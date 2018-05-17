loadFromLocalStorage();

attachMenuListeners();
showHeroListView();

// Helper functions

function clearRegions() {
    var regions = [
        'heroesList-region',
        'addHeroForm-region',
        'heroesRemove-region',
        'heroesEdit-region'
    ];

    regions.forEach(function(region) {
        var DOMelement = document.getElementById(region);
        DOMelement.innerHTML = "";
    });
}