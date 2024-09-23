extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:robocop/robocop_layer1",
    "layer2": "mhp:robocop/robocop_layer2",
    "jetpack": "mhp:jet"
});
var utils = implement("fiskheroes:external/utils");
var boosters;
var jetpack;
var falcon_boosters = implement("fiskheroes:external/falcon_boosters");

function initEffects(renderer) {
    jetpack = renderer.createEffect("fiskheroes:model");
    jetpack.setModel(utils.createModel(renderer, "mhp:jet", "jetpack"));
    jetpack.anchor.set("body");

    boosters = initBoosters(renderer, utils, falcon_boosters);
   

}

function initBoosters(renderer, utils, falcon_boosters) {
    utils.bindParticles(renderer, "fiskheroes:falcon").setCondition(entity => entity.getData("fiskheroes:flying"));
    return falcon_boosters.create(renderer, 0x0033FF, "fiskheroes:blue_fire_layer_%s", {
        boosters: [
            { anchor: "body", offset: [0.0, 7, 2.6], size: [1.75, 3.0] },
            { anchor: "body", offset: [1.0, 7, 2.6], size: [1.5, 2.0], mirror: true }
        ],
        bloom: [
            { anchor: "body", offset: [0.0, 7, 2.6], size: [3.0, 1.75, 5.5] }
        ]
    });
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addHoverAnimation(renderer, "atom.HOVER", "fiskheroes:flight/idle/default_back");
    utils.addFlightAnimation(renderer, "atom.FLIGHT", "fiskheroes:flight/propelled.anim.json");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    addAnimationWithData(renderer, "iron_man.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        jetpack.render();
        boosters.render(entity);
    }
}


    
