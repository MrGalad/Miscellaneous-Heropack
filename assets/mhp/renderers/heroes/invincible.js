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
var layer2


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var texture = entity.getData("mhp:dyn/texture");
        if (texture > 0.9) {
            return "battledamage5";
        } else if (texture > 0.75) {
            return "battledamage4";
        } else if (texture > 0.5) {
            return "battledamage3";
        } else if (texture > 0.4) {
            return "battledamage2";
        } else if (texture > 0.25) {
            return "battledamage1";
        }
        return "layer1"
    })

}

function initEffects(renderer) {
    speedster.init(renderer);
    utils.bindParticles(renderer, "mhp:super_boost").setCondition(entity => /* entity.getData("fiskheroes:dyn/flight_super_boost") > 0 && entity.getData("fiskheroes:dyn/flight_super_boost") < 0.4 */ entity.getData("mhp:dyn/boost1") || entity.getData("mhp:dyn/boost2") || entity.getData("mhp:dyn/boost3") || entity.getData("mhp:dyn/boost4"));
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
    utils.bindParticles(renderer, "mhp:invincible_charge").setCondition(entity => entity.getData("mhp:dyn/charge_timer") > 0.3)
    utils.bindParticles(renderer, "mhp:landing_particles").setCondition(entity => entity.getData("mhp:dyn/charge_timer") > 0.3 && !entity.isOnGround() && entity.getData("fiskheroes:flying") && entity.isSprinting())

    layer2 = renderer.createEffect("fiskheroes:overlay");
    layer2.texture.set("layer2");

    utils.addCameraShake(renderer, 0.015, 1.5, "mhp:dyn/charge_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
      shake.factor = entity.getData("mhp:dyn/charge_timer") > 0.5 
      return true;
    });
    shake.intensity = 0.0;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimationWithData(renderer, "invincible.BLOCKING", "mhp:invincible_block", "fiskheroes:shield_blocking_timer");
    addAnimationWithData(renderer, "invincible.LAND", "mhp:invincible_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;
    addAnimationWithData(renderer, "invincible.CHARGE", "fiskheroes:superhero_landing", "mhp:dyn/charge_timer")
        .priority = -8;
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    addAnimationWithData(renderer, "iron_man.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimation(renderer, "invincible.FLIGHT", "fiskheroes:flight/iron_man.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
            data.load(3, entity.loop(10));
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 2)
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
        }).setCondition(entity => entity.getData('mhp:dyn/random_digit') == 0)
        .priority = -10;


  renderer.reprioritizeDefaultAnimation("PUNCH", -9);
  renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer) {
    parent.render(entity, renderLayer);
    if (renderLayer == "LEGGINGS" && entity.getData("mhp:dyn/texture") < 0.25) {
        layer2.render();
    }
}