extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:metallo/metallo_layer1",
    "layer2": "misc:metallo/metallo_layer2",
    "chest": "misc:metallo/chest"
});
var utils = implement("fiskheroes:external/utils");

var overlay;

function initEffects(renderer) {
    parent.initEffects(renderer);
    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "chest");

    utils.bindBeam(renderer, "fiskheroes:heat_vision", "misc:heat_vision", "head", 0x55FF55, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.3, -4.0], "size": [0.6, 0.3] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.3, -4.0], "size": [0.6, 0.3] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:heat_vision", "body", getBeamColor(), [
        { "firstPerson": [0.0, 7.0, 0.0], "offset": [0.0, 2.5, -2.0], "size": [0.7, 0.6] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
}

function getBeamColor() {
    return 0x55FF55;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        overlay.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        overlay.render();
    }
}
