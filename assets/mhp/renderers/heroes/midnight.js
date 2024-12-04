extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:midnight/midnight_layer1",
    "layer2": "mhp:midnight/midnight_layer2",
    "cape": "mhp:midnight/midnight_cape"
});
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var iron_man_boosters = implement("mhp:external/boosters");

var boosters;
var cape;

function initEffects(renderer) {
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 0.9;
    physics.maxFlare = 0.5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
    parent.initEffects(renderer);
    boosters = iron_man_boosters.create(renderer, "fiskheroes:blue_fire_layer_%s", false);

    var night_vision = renderer.bindProperty("fiskheroes:night_vision").setCondition(entity => {
        night_vision.factor = 1 && entity.getData("fiskheroes:mask_open_timer2") == 0
            return true;
    })
}

function initAnimations(renderer) {
    addAnimationWithData(renderer, "midnight.POSE", "mhp:midnight_pose", "mhp:dyn/float_interp");
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE_ROLL", "fiskheroes:falcon_dive_roll");

    addAnimationWithData(renderer, "falcon.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
    .priority = -8;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
     cape.render(entity);
}
boosters.render(entity, renderLayer, isFirstPersonArm, true);
}
