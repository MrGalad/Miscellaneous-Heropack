extend("fiskheroes:hero_basic");
loadTextures({
    "base": "misc:sentinal/sentinel",
    "head": "misc:sentinal/sentHead",
    "glow": "misc:sentinal/sentGlow",
    "layer1": "misc:sentinal/null",
    "layer2": "misc:sentinal/null"
});
var utils = implement("fiskheroes:external/utils");
var color = 0xFFAA00;
//var overlay;
var head;
var heada;
var head2
var heada2
var Rarm;
var Rarma;
var Larm;
var Larma;
var Rleg;
var Rlega;
var Lleg;
var Llega

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return 0.99999;
    })
    // overlay = renderer.createEffect("fiskheroes:overlay");
    // overlay.texture.set(null, "glow");


    head = renderer.createResource("MODEL", "misc:sentinel/sentinelHead");
    head.bindAnimation("misc:sentinel/plates.anim.json").setData((entity, data) => {
        data.load(0, Math.max(entity.getInterpolatedData("fiskheroes:beam_charge")));
    });
    head.texture.set("head");
    heada = renderer.createEffect("fiskheroes:model").setModel(head);
    heada.anchor.set("head");
    heada.setScale(0.7);

    head2 = renderer.createResource("MODEL", "misc:sentinel/sentinelHead");
    head2.bindAnimation("misc:sentinel/sneak").setData((entity, data) => data.load(entity.isSneaking()));
    head2.texture.set("head");
    heada2 = renderer.createEffect("fiskheroes:model").setModel(head);
    heada2.anchor.set("head");
    heada2.setScale(0.7);

    Torso = renderer.createResource("MODEL", "misc:sentinel/Torso");
    Torso.texture.set("base");
    torsoa = renderer.createEffect("fiskheroes:model").setModel(Torso);
    torsoa.anchor.set("body");
    torsoa.setScale(0.7);

    Rarm = renderer.createResource("MODEL", "misc:sentinel/Rarm");
    Rarm.texture.set("base");
    Rarma = renderer.createEffect("fiskheroes:model").setModel(Rarm);
    Rarma.anchor.set("rightArm");
    Rarma.setScale(0.7);
    // Rarma.anchor.ignoreAnchor(isFirstPersonArm)

    Larm = renderer.createResource("MODEL", "misc:sentinel/Larm");
    Larm.texture.set("base");
    Larma = renderer.createEffect("fiskheroes:model").setModel(Larm);
    Larma.anchor.set("leftArm");
    Larma.setScale(0.7);

    Lleg = renderer.createResource("MODEL", "misc:sentinel/Lleg");
    Lleg.texture.set("base");
    Llega = renderer.createEffect("fiskheroes:model").setModel(Lleg);
    Llega.anchor.set("leftLeg");
    Llega.setScale(0.7);
    // Llega.anchor.ignoreAnchor(isFirstPersonArm)

    Rleg = renderer.createResource("MODEL", "misc:sentinel/Rleg");
    Rleg.texture.set("base");
    Rlega = renderer.createEffect("fiskheroes:model").setModel(Rleg);
    Rlega.anchor.set("rightLeg");
    Rlega.setScale(0.7);
    //Rlega.anchor.ignoreAnchor(isFirstPersonArm)


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:sentinel", "head", color, [
        { "firstPerson": [0, 0, 0], "offset": [0, -2.4, 1.0], "size": [0.8, 0.8] }
    ]);

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "misc:sentinel", "head", color, [
        { "firstPerson": [0, 0, 0], "offset": [0, 0.30, 1.0], "size": [0.8, 0.8] }
    ]);
}
function render(entity, renderLayer, isFirstPersonArm) {
   /* if (!isFirstPersonArm) {
        if (renderLayer == "HELMET") {
            overlay.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
            overlay.render();
        }
    }*/ if (isFirstPersonArm) {
        Rarma.render();
        Rarma.setOffset(-5, 3, 1);

        Rlega.render();
        Rlega.setOffset(-2, -8.5, 0);

        Llega.render();
        Llega.setOffset(2, -8.5, 0);
    } 
    heada.render();
    heada.setOffset(2.85, -5.5, 0)

    torsoa.render();
    Rarma.render();
    Rarma.setOffset(-5, 3, 1);

    Larma.render();
    Larma.setOffset(5, 3, 1);

    Rlega.render();
    Rlega.setOffset(-2, -8.5, 0);

    Llega.render();
    Llega.setOffset(2, -8.5, 0);
}



function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    utils.addFlightAnimationWithLanding(renderer, "iron_man.FLIGHT", "fiskheroes:flight/iron_man.anim.json");
    utils.addHoverAnimation(renderer, "iron_man.HOVER", "fiskheroes:flight/idle/iron_man");

    addAnimation(renderer, "sent.LIMBS", "misc:sentinel/sentinelLimbs")
        .setData((entity, data) => data.load(1));

    /* addAnimation(renderer, "sent.SNEAK", "misc:sentinel/sneak")
        .setData((entity, data) => data.load(entity.isSneaking())); */


}