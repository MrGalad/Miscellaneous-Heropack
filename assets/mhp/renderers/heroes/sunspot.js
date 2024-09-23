extend("fiskheroes:hero_basic");
loadTextures({
    "base": "mhp:sunspot/solar",
    "suit": "mhp:sunspot/solar_transformation.tx.json",
    "reactor": "mhp:sunspot/sun",
    "glow": "mhp:sunspot/solar_glow"
});

var utils = implement("fiskheroes:external/utils");
//var flames = implement("fiskheroes:external/flames");
var color = 0xFF6500;

var suit
//var hand_flames;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            var timer = entity.getInterpolatedData("mhp:dyn/solar_timer");
            return  timer < 1 ? "reactor" : "base";
        }
        return "base";
    });
    renderer.setLights((entity, renderLayer) => {
        if (entity.getData("mhp:dyn/solar_timer") > 0.6) {
            var timer = entity.getInterpolatedData("mhp:dyn/solar_timer");
            return "glow";
        }
        return (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") && entity.getInterpolatedData("mhp:dyn/solar_timer") > 0.1 ? "glow" : "lights";
    });

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    suit = renderer.createEffect("fiskheroes:overlay");
    suit.texture.set("suit");
    utils.bindParticles(renderer, "mhp:flame").setCondition(entity => entity.getData("fiskheroes:energy_projection"));
  /*  var fire = renderer.createResource("ICON", "fiskheroes:fire_layer_%s");
    hand_flames = flames.createHands(renderer, fire, true);*/

  /*   utils.bindBeam(renderer, "fiskheroes:energy_projection", "mhp:charge", "rightArm", color, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [7.0, 6.0] },
        { "firstPerson": [3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [7.0, 6.0], "anchor": "leftArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection")); */
}



function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimationWithData(renderer, "ray.ENERGY_PROJ", "fiskheroes:aiming", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "ray.ENERGY_PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");
}

function render (entity, renderLayer) {
    var timer = entity.getInterpolatedData("mhp:dyn/solar_timer");

    if (timer > 0 && timer < 1){
        suit.render();
    }
}