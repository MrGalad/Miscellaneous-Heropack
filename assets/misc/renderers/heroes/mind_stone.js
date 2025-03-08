extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "stone": "misc:gauntlet/mind",
});
var stone
var utils = implement("fiskheroes:external/utils");
function initEffects(renderer) {
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [-2.5, 3.0, -5.0], "offset": [-5.5, -1, -7.5], "size": [0.5, 0.5] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    stone = renderer.createResource("MODEL", "misc:stone");
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

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "gaunlet.CHARGED_BEAM", "fiskheroes:aiming", "fiskheroes:beam_charge");
}