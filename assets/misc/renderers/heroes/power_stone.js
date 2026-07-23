extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "stone": "misc:gauntlet/power",
});
var stone
var utils = implement("fiskheroes:external/utils");
var flames = implement("fiskheroes:external/flames");
var hand_flames
var arms_light

function initEffects(renderer) {
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [-2.5, 3.0, -5.0], "offset": [-5.5, -1, -7.5], "size": [0.5, 0.5] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    var heat = getBeamColor();
    arms_heat = utils.createLines(renderer, "misc:power", heat, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -0.5, 0.0], "size": [4.8, 4.8] }
    ]);
    arms_heat.anchor.set("rightArm");
    arms_heat.setOffset(1.0, 10.10, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);

    stone = renderer.createResource("MODEL", "misc:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
    if (renderLayer == "CHESTPLATE") {
        arms_heat.opacity = entity.getInterpolatedData("fiskheroes:punchmode_timer");
        arms_heat.render()
    }
}

function getBeamColor() {
    return 0x57ff63;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "gaunlet.CHARGED_BEAM", "fiskheroes:aiming", "fiskheroes:beam_charge");
}
