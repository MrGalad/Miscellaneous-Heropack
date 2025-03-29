extend("fiskheroes:hero_basic");
loadTextures({
    "base": "misc:senator/senator_armstrong",
    "shirt": "misc:senator/senator_shirt",
    "shirtless": "misc:senator/senator_shirtless",
    "layer1": "misc:blank",
    "layer2": "misc:blank"
});
var utils = implement("fiskheroes:external/utils");
var color = 0xFFAA00;
//var overlay;
var body
var bodyEffect

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return 0.99999;
    })

    body = renderer.createResource("MODEL", "misc:senator_armstrong");
    body.texture.set("base");
    bodyEffect = renderer.createEffect("fiskheroes:model").setModel(body);
    bodyEffect.anchor.set("rightLeg");
    bodyEffect.setScale(0.7);


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:invis", "head", color, [
        { "firstPerson": [0, 0, 0], "offset": [0, -2.4, 1.0], "size": [0.8, 0.8] }
    ]);

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "misc:invis", "head", color, [
        { "firstPerson": [0, 0, 0], "offset": [0, 0.30, 1.0], "size": [0.8, 0.8] }
    ]);
}
function render(entity, renderLayer, isFirstPersonArm) {
    bodyEffect.render();
}



function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");

    addAnimation(renderer, "senator.STOMP", "misc:senator_stomp")
    .setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("misc:dyn/stomp_timer"));
    }).priority = 0;

    addAnimation(renderer, "senator.HEADBUTT", "misc:senator_headbutt")
    .setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("misc:dyn/headbutt_timer"));
    }).priority = 0;

    addAnimation(renderer, "senator.CHARGED_BEAM", "misc:senator_AOE")
    .setData((entity, data) => {
      data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge"));
    }).priority = 0;

    /* addAnimation(renderer, "sent.SNEAK", "misc:sentinel/sneak")
        .setData((entity, data) => data.load(entity.isSneaking())); */


}