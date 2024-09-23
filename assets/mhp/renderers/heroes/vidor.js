extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:vidor/vidor_layer1",
    "layer2": "mhp:vidor/vidor_layer2"
});
//var speedster = implement("fiskheroes:external/speedster_utils");
var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    //speedster.init(renderer);
    utils.addCameraShake(renderer, 0.1, 1.5, "fiskheroes:dyn/superhero_landing_timer");
    utils.bindParticles(renderer, "mhp:boost_flight").setCondition(entity => entity.getData("fiskheroes:dyn/flight_super_boost") == 1) ;
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
    .priority = -8;
}