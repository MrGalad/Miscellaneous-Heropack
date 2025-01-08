extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:metroman/metroman_layer1",
    "layer2": "mhp:metroman/metroman_layer2",
    "cape": "mhp:metroman/metroman_cape"
});
var speedster = implement("fiskheroes:external/speedster_utils");
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var cape;


function initEffects(renderer) {
    speedster.init(renderer);
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 0.9;
    physics.maxFlare = 0.5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
    parent.initEffects(renderer);
    var trail = renderer.bindProperty("fiskheroes:trail");
    var trail1 = renderer.createResource("TRAIL", "mhp:metroman");
    var trail2 = renderer.createResource("TRAIL", "mhp:metroman_1");
    var trail3 = renderer.createResource("TRAIL", "mhp:metroman_2");

    trail.setCondition(entity => {
        var ticks = entity.ticksExisted();
        if (ticks % 12 < 2) {
            trail.setTrail(trail1);
        } else if (ticks % 12 < 4) {
            trail.setTrail(trail2);
        } else if (ticks % 12 < 6) {
            trail.setTrail(trail3);
        }
        return entity.getData("fiskheroes:speeding");
    });

    utils.addCameraShake(renderer, 0.1, 1.5, "fiskheroes:dyn/superhero_landing_timer");
    utils.bindParticles(renderer, "mhp:boost_flight").setCondition(entity => entity.getData("fiskheroes:dyn/flight_super_boost") == 1) ;
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
    
    utils.bindBeam(renderer, "fiskheroes:heat_vision", "mhp:heat_vision", "head", 0xFF0000, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.3, -4.0], "size": [0.6, 0.3] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.3, -4.0], "size": [0.6, 0.3] }
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

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
     cape.render(entity);
}
}

