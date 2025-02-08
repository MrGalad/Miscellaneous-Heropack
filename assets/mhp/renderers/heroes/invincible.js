extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:invincible/invincible_layer1",
    "layer2": "mhp:invincible/invincible_layer2",
    "battledamage1": "mhp:invincible/battledamage_1",
    "battledamage2": "mhp:invincible/battledamage_2",
    "battledamage3": "mhp:invincible/battledamage_3",
    "battledamage4": "mhp:invincible/battledamage_4",
    "battledamage5": "mhp:invincible/battledamage_5",
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var powerCharge = entity.getData("mhp:dyn/power_charge");
        if (powerCharge > 0.9) {
        return "battledamage5";
    } else if (powerCharge > 0.75) {
        return "battledamage4";
    } else if (powerCharge > 0.5) {
        return "battledamage3";
    } else if (powerCharge > 0.4) {
        return "battledamage2";
    } else if (powerCharge > 0.25) {
        return "battledamage1";
    }
    })
}

function initEffects(renderer) {
    speedster.init(renderer);
    utils.bindParticles(renderer, "mhp:super_boost").setCondition(entity => entity.getData("fiskheroes:dyn/flight_super_boost") == 1);
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    
    addAnimationWithData(renderer, "invincible.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;
        
    /* utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default_arms_forward.anim.json"); */
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    addAnimationWithData(renderer, "iron_man.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;

        addAnimation(renderer, "invincible.FLIGHT", "fiskheroes:flight/iron_man.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
            data.load(3, entity.loop(10));
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 0)
        .priority = -10;
    
        addAnimation(renderer, "invincible.FLIGHT1", "fiskheroes:flight/default_arms_forward.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 1)
        .priority = -10;
    
        addAnimation(renderer, "invincible.FLIGHT2", "fiskheroes:flight/propelled_hands.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 2)
        .priority = -10;
    
        addAnimation(renderer, "invincible.FLIGHT3", "fiskheroes:flight/martian_comics.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 3)
        .priority = -10;
}