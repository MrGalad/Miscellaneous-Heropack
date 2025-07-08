extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:oc/misc_layer1",
    "layer2": "misc:oc/misc_layer2",
});
var utils = implement("fiskheroes:external/utils");
var flames = implement("fiskheroes:external/flames");

function initEffects(renderer) {

    var fire = renderer.createResource("ICON", "fiskheroes:blue_fire_layer_1");
    hand_flames = flames.createHands(renderer, fire, true);

    var beam = renderer.createResource("BEAM_RENDERER", "misc:test");
    utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "rightArm", 0x00FFFF, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
}


function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        if (entity.getData("misc:dyn/nv_timer") > 0) {
            hand_flames.render(entity.getInterpolatedData("misc:dyn/nv_timer"));
        }
    }
}

