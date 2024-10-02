extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "stone": "mhp:gauntlet/mind",
});
var stone
var utils = implement("fiskheroes:external/utils");
function initEffects(renderer) {
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-5.5, -1, -5.3], "size": [1, 1] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    stone = renderer.createResource("MODEL", "mhp:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}

function getBeamColor() {
    return 0xFFFF6D;
}
