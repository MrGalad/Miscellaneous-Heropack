extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:invincible/invincible_layer1",
    "layer2": "mhp:invincible/invincible_layer2",
    "battledamage1": "mhp:invincible/battledamage_1",
    "battledamage2": "mhp:invincible/battledamage_2",
    "battledamage3": "mhp:invincible/battledamage_3",
    "battledamage4": "mhp:invincible/battledamage_4",
    "battledamage5": "mhp:invincible/battledamage_5",
    "noarm": "mhp:invincible/invincible_armless_layer1",
    "noarmblue": "mhp:invincible/invincible_blue_armless_layer1",
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
        } /* if (entity.getData("fiskheroes:energy_projection")) {
            return "noarm"
        } */
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
        shake.factor = entity.getData("mhp:dyn/charge_timer") > 0.5 || entity.getData("fiskheroes:energy_projection_timer") > 0.7
        return true;
    });
    shake.intensity = 0.0;

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "mhp:invis", "head", 0xAA00AA, [{
        "firstPerson": [0, 0, 0],
        "offset": [0, 0, 0],
        "size": [0, 0]
    }
    ]);

    var model_rarm = renderer.createResource("MODEL", "mhp:invincible_arm");
    model_rarm.texture.set("layer1");
    model_rarm.generateMirror();

    larm1 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm1.anchor.set("leftArm");
    larm1.setRotation(5, -5, 15);
    larm1.setOffset(-1.8, -1.2, 0.8);
    larm1.mirror = true;

    larm2 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm2.anchor.set("leftArm");
    larm2.setRotation(-5, 15, 20);
    larm2.setOffset(0.2, 2.3, -1.2);
    larm2.mirror = true;

    larm3 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm3.anchor.set("leftArm");
    larm3.setRotation(5, -15, 25);
    larm3.setOffset(-2.2, -1.8, -2.3);
    larm3.mirror = true;

    larm4 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm4.anchor.set("leftArm");
    larm4.setRotation(-5, 20, 15);
    larm4.setOffset(1.8, 3.2, 1.8);
    larm4.mirror = true;

    larm5 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm5.anchor.set("leftArm");
    larm5.setRotation(5, -20, 15);
    larm5.setOffset(-1.3, 1.8, -2.8);
    larm5.mirror = true;

    larm7 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm7.anchor.set("leftArm");
    larm7.setRotation(5, -25, 10);
    larm7.setOffset(-2.3, -2.8, 1.3);
    larm7.mirror = true;

    larm8 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm8.anchor.set("leftArm");
    larm8.setRotation(-5, 35, 25);
    larm8.setOffset(0.8, 2.8, 2.2);
    larm8.mirror = true;

    larm9 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm9.anchor.set("leftArm");
    larm9.setRotation(10, 15, -35);
    larm9.setOffset(-4.3, -3.8, 3.8);
    larm9.mirror = true;

    larm10 = renderer.createEffect("fiskheroes:model").setModel(model_rarm);
    larm10.anchor.set("leftArm");
    larm10.setRotation(-10, -35, -20);
    larm10.setOffset(-4.8, 2.8, -2.3);
    larm10.mirror = true;


}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
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

        addAnimation(renderer, "invincible.PUNCH", "mhp:punch")
        .setData((entity, data) => {
            data.load(0.5 + entity.loop(1));
        }).setCondition(entity => entity.getInterpolatedData("fiskheroes:energy_projection_timer") > 0.5);

    /* addAnimationWithData(renderer, "invincible.ENERGY_PROJ", "mhp:invisible_punch", "fiskheroes:energy_projection_timer"); */


    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer) {
    parent.render(entity, renderLayer);
    if (renderLayer == "LEGGINGS" && entity.getData("mhp:dyn/texture") < 0.25) {
        layer2.render();
    }

    if (entity.getInterpolatedData("fiskheroes:energy_projection_timer") > 0.5) {

        if (entity.loop(3) > 0 && entity.loop(5) < 0.05) {
            larm1.opacity = entity.loop(5);
            larm1.render();
        }
        if (entity.loop(2) > 0 && entity.loop(4) < 0.1) {
            larm2.opacity = entity.loop(6);
            larm2.render();
        }
        if (entity.loop(8) > 0 && entity.loop(10) < 0.15) {
            larm3.opacity = entity.loop(7);
            larm3.render();
        }
        if (entity.loop(7) > 0 && entity.loop(9) < 0.2) {
            larm4.opacity = entity.loop(4);
            larm4.render();
        }
        if (entity.loop(6) > 0 && entity.loop(8) < 0.25) {
            larm5.opacity = entity.loop(1);
            larm5.render();
        }
        /* if (entity.loop(1) > 0 && entity.loop(3) < 0.3) {
            larm6.opacity = entity.loop(2);
            larm6.render();
        } */
        if (entity.loop(2) > 0 && entity.loop(5) < 0.35) {
            larm7.opacity = entity.loop(3);
            larm7.render();
        }
        if (entity.loop(5) > 0 && entity.loop(7) < 0.4) {
            larm8.opacity = entity.loop(8);
            larm8.render();
        }

        if (entity.loop(1) > 0 && entity.loop(4) < 0.45) {
            larm9.opacity = entity.loop(9);
            larm9.render();
        }
        if (entity.loop(2) > 0 && entity.loop(6) < 0.5) {
            larm10.opacity = entity.loop(10);
            larm10.render();
        }

    }

}