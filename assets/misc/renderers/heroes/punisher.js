var equipment = implement("misc:external/equipment");

extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:punisher/punisher_layer1",
    "layer2": "misc:punisher/punisher_layer2",
    "benelli_m4": "misc:punisher/benelli_m4",
    
});

var utils = implement("fiskheroes:external/utils");

var benelli_m4;

function init(renderer) {
    parent.init(renderer);
    
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    benelli_m4 = renderer.createEffect("fiskheroes:model");
    benelli_m4.setModel(utils.createModel(renderer, "misc:benelli_m4_back", "benelli_m4"));
    benelli_m4.anchor.set("body");
    benelli_m4.setOffset(0, 0, 0);
    benelli_m4.setRotation(0, 0, 0);
    benelli_m4.setScale(0.8, 0.8, 0.8);
    
}

function render(entity, renderLayer) {
    if (renderLayer == "CHESTPLATE") {
        if (equipment.isItemEquipped(entity, "misc:benelli_m4")) {
            benelli_m4.render();
        }
    }
    
}