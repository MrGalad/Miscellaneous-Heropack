extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:superboy/superboy_layer1",
    "layer2": "mhp:superboy/superboy_layer2"
});
var speedster = implement("fiskheroes:external/speedster_utils");
var utils = implement("fiskheroes:external/utils");


function initEffects(renderer) {
    speedster.init(renderer);
    parent.initEffects(renderer);
    utils.bindTrail(renderer, "mhp:speed");
    utils.addCameraShake(renderer, 0.1, 1.5, "fiskheroes:dyn/superhero_landing_timer");
    utils.bindParticles(renderer, "mhp:boost_flight").setCondition(entity => entity.getData("fiskheroes:dyn/flight_super_boost") == 1) ;
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
    
    utils.bindBeam(renderer, "fiskheroes:heat_vision", "mhp:heat_vision", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.5, -4.0], "size": [0.6, 0.3] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.5, -4.0], "size": [0.6, 0.3] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
    var night_vision = renderer.bindProperty("fiskheroes:night_vision").setCondition(entity => {
        night_vision.factor = 1
            return true;
    })
}

function initAnimations(renderer) {
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
    .priority = -8;
}

