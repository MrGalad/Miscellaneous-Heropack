var equipment = implement("misc:external/equipment");

extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:punisher/punisher_layer1",
    "layer2": "misc:punisher/punisher_layer2",
});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);
    
   renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);


}

function render(entity, renderLayer) {

}