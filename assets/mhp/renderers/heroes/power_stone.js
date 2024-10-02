extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "stone": "mhp:gauntlet/power",
});
var stone
var utils = implement("fiskheroes:external/utils");
var flames = implement("fiskheroes:external/flames");
var hand_flames
var arms_light

function initEffects(renderer) {
 /*   arms_light = utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [4.5, 3.75, -8.0], "offset": [7, 3.0, -7], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")); */

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-5.5, -1, -5.3], "size": [1, 1] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    var heat = getBeamColor();
    arms_heat = utils.createLines(renderer, "mhp:power", heat, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -0.5, 0.0], "size": [4.8, 4.8] }
    ]);
    arms_heat.anchor.set("rightArm");
    arms_heat.setOffset(1.0, 10.10, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);

    stone = renderer.createResource("MODEL", "mhp:stone");
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
       /*  arms_light.render();
        arms_light.opacity = entity.getInterpolatedData("fiskheroes:punchmode_timer") */
    }
}

function getBeamColor() {
    return 0xAA00AA;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    addAnimationWithData(renderer, "gaunlet.CHARGED_BEAM", "fiskheroes:aiming", "fiskheroes:beam_charge");
    /* addAnimationWithData(renderer, "gaunlet.ANIM", "mhp:aiming_left", "mhp:dyn/time_timer") */;
    /*  addAnimationWithData(renderer, "gaunlet.ALL", "mhp:thanos", "mhp:dyn/all_active") */
   /*  addAnimation(renderer, "gauntlet.ALL", "mhp:thanos")
        .setData((entity, data) => {
            data.load(entity.getData("mhp:dyn/all_active_timer") == 0 ? 0 : entity.getInterpolatedData("mhp:dyn/all_active_timer") * 2);
        }); */
}
