extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:charles/xavier_layer1",
    "layer2": "misc:charles/xavier_layer2",
    "chair": "misc:charles/chair_new"
});
var utils = implement("fiskheroes:external/utils");
var chair
var glow

function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm");
}

function initEffects(renderer) {
    /*   arms_light = utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
           { "firstPerson": [4.5, 3.75, -8.0], "offset": [7, 3.0, -7], "size": [1.0, 1.0] }
       ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam")); */

    /*   renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
          var otimer = entity.getInterpolatedData("misc:dyn/float_interp") > 0.5 ? 2 * entity.getInterpolatedData("misc:dyn/float_interp") - 1 : 0;
          return (1 - otimer);
      }); */

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:invis", "head", 0xAA00AA, [{
        "firstPerson": [0, 0, 0],
        "offset": [0, 0, 0],
        "size": [0, 0]
    }
    ]);

    var chairModel = renderer.createResource("MODEL", "misc:chair_new");
    chairModel.bindAnimation("misc:wheels").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("misc:dyn/wheel_timer"));
    });
    chairModel.texture.set("chair");
    chair = renderer.createEffect("fiskheroes:model").setModel(chairModel);
    chair.anchor.set("body");

    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.includeEffects(chair);
    glow.color.set(0xFFFFFF);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    /*  addAnimationWithData(renderer, "t800.SIT", "misc:sit", "fiskheroes:speeding"); */
    /*  addAnimationWithData(renderer, "charles.CHARGED_BEAM", "misc:charles_power", "fiskheroes:beam_charging"); 
 */
    addAnimation(renderer, "charles.WALK", "misc:sitBaldy").setData((entity, data) => {
        data.load(0, Math.max(entity.isAlive()));
    }).priority = 1;

    addAnimation(renderer, "charles.AIMING", "misc:charles_power").setData((entity, data) => {
        data.load(entity.getInterpolatedData("misc:dyn/tele_timer"));
    }).priority = 10;

    addAnimation(renderer, "charles.CHARGED_BEAM", "misc:charles_power").setData((entity, data) => {
        data.load(entity.getInterpolatedData("fiskheroes:beam_charge"));
    }).priority = 10;

    addAnimation(renderer, "charles.INVIS", "misc:charles_power").setData((entity, data) => {
        data.load(entity.getInterpolatedData("misc:dyn/float_interp"));
    }).priority = 10;


};
function render(entity, renderLayer, isFirstPersonArm) {
    var hologram = entity.is("DISPLAY") && entity.as('DISPLAY').getDisplayType() != 'HOLOGRAM'
    var invis =  entity.getInterpolatedData("misc:dyn/float_interp") > 0.8 ? 2 * entity.getInterpolatedData("misc:dyn/float_interp") - 1 : 0;
    /* return (1 - otimer) */
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        if (entity.isAlive()) {
            chair.setScale(1.3);

            if (isFirstPersonArm) {

                // FIRST PERSON

                chair.setOffset(0, -6, -12);
                chair.setRotation(-entity.rotPitch() * 0.6, 180, 0);
                chair.anchor.ignoreAnchor(true);
            } else {

                // THIRD PERSON

                chair.setOffset(0, -3, -6);
                chair.setRotation(0, 0, 0);
                chair.anchor.ignoreAnchor(false);
            }

            chair.render();
        }
    }
    if (!isFirstPersonArm) {
        glow.opacity = invis;
        glow.render();
    }

}