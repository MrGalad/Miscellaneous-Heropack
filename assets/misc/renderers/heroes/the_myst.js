extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:myst/myst_layer1",
    "layer2": "misc:myst/myst_layer2",
    "leg": "misc:myst/myst_leg",
});

var utils = implement("fiskheroes:external/utils");

var leg_left, leg_right;

function init(renderer) {
    parent.init(renderer);
    
   renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {

    leg_left = renderer.createEffect("fiskheroes:model");
    leg_left.setModel(utils.createModel(renderer, "misc:myst_leg_left", "leg"));
    leg_left.anchor.set("leftLeg");
    leg_left.setScale(1);
    leg_left.setOffset(0, 0, 0);
    leg_left.setRotation(0, 0, 0)

    leg_right = renderer.createEffect("fiskheroes:model");
    leg_right.setModel(utils.createModel(renderer, "misc:myst_leg_right", "leg"));
    leg_right.anchor.set("rightLeg");
    leg_right.setScale(1);
    leg_right.setOffset(0, 0, 0);
    leg_right.setRotation(0, 0, 0)
}

function render(entity, renderLayer, isFirstPersonArm) {
if (renderLayer == "CHESTPLATE") {
    leg_left.render();
    leg_right.render();
}
}