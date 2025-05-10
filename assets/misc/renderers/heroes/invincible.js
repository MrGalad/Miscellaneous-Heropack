extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:invincible/invincible_layer1",
    "layer2": "misc:invincible/invincible_layer2",
    "battledamage1": "misc:invincible/battledamage_1",
    "battledamage2": "misc:invincible/battledamage_2",
    "battledamage3": "misc:invincible/battledamage_3",
    "battledamage4": "misc:invincible/battledamage_4",
    "battledamage5": "misc:invincible/battledamage_5",
    "noarm": "misc:invincible/invincible_armless_layer1",
    "noarmblue": "misc:invincible/invincible_blue_armless_layer1",
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var layer2


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var texture = entity.getData("misc:dyn/texture");
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
    utils.bindParticles(renderer, "misc:super_boost").setCondition(entity => /* entity.getData("fiskheroes:dyn/flight_super_boost") > 0 && entity.getData("fiskheroes:dyn/flight_super_boost") < 0.4 */ entity.getData("misc:dyn/boost1") || entity.getData("misc:dyn/boost2") || entity.getData("misc:dyn/boost3") || entity.getData("misc:dyn/boost4"));
    utils.bindParticles(renderer, "misc:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
    utils.bindParticles(renderer, "misc:invincible_charge").setCondition(entity => entity.getData("misc:dyn/charge_timer") > 0.3)
    utils.bindParticles(renderer, "misc:landing_particles").setCondition(entity => entity.getData("misc:dyn/charge_timer") > 0.3 && !entity.isOnGround() && entity.getData("fiskheroes:flying") && entity.isSprinting())

    layer2 = renderer.createEffect("fiskheroes:overlay");
    layer2.texture.set("layer2");

    utils.addCameraShake(renderer, 0.015, 1.5, "misc:dyn/charge_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.getData("misc:dyn/charge_timer") > 0.5 || entity.getData("fiskheroes:energy_projection_timer") > 0.7
        return true;
    });
    shake.intensity = 0.0;

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "misc:invis", "head", 0xAA00AA, [{
        "firstPerson": [0, 0, 0],
        "offset": [0, 0, 0],
        "size": [0, 0]
    }
    ]);

    var armModel = renderer.createResource("MODEL", "misc:invincible_arm");
    armModel.texture.set("layer1");
    armModel.generateMirror();

    arm1 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm1.anchor.set("leftArm");
    arm1.setRotation(5, -5, 15);
    arm1.setOffset(-1.8, -1.2, 0.8);
    arm1.mirror = true;

    arm2 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm2.anchor.set("leftArm");
    arm2.setRotation(-5, 15, 20);
    arm2.setOffset(0.2, 2.3, -1.2);
    arm2.mirror = true;

    arm3 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm3.anchor.set("leftArm");
    arm3.setRotation(5, -15, 25);
    arm3.setOffset(-2.2, -1.8, -2.3);
    arm3.mirror = true;

    arm4 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm4.anchor.set("leftArm");
    arm4.setRotation(-5, 20, 15);
    arm4.setOffset(1.8, 3.2, 1.8);
    arm4.mirror = true;

    arm5 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm5.anchor.set("leftArm");
    arm5.setRotation(5, -20, 15);
    arm5.setOffset(-1.3, 1.8, -2.8);
    arm5.mirror = true;

    arm6 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm6.anchor.set("leftArm");
    arm6.setRotation(5, -25, 10);
    arm6.setOffset(-2.3, -2.8, 1.3);
    arm6.mirror = true;

    arm7 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm7.anchor.set("leftArm");
    arm7.setRotation(-5, 35, 25);
    arm7.setOffset(0.8, 2.8, 2.2);
    arm7.mirror = true;

    arm8 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm8.anchor.set("leftArm");
    arm8.setRotation(10, 15, -35);
    arm8.setOffset(-4.3, -3.8, 3.8);
    arm8.mirror = true;

    arm9 = renderer.createEffect("fiskheroes:model").setModel(armModel);
    arm9.anchor.set("leftArm");
    arm9.setRotation(-10, -35, -20);
    arm9.setOffset(-4.8, 2.8, -2.3);
    arm9.mirror = true;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.AIMING");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    /* addAnimationWithData(renderer, "invincible.BLOCKING", "misc:invincible_block", "fiskheroes:shield_blocking_timer"); */
    addAnimationWithData(renderer, "invincible.LAND", "misc:invincible_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;
    addAnimationWithData(renderer, "invincible.CHARGE", "fiskheroes:superhero_landing", "misc:dyn/charge_timer")
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
        }).setCondition(entity => entity.getData('misc:dyn/random_digit') == 2)
        .priority = -10;

    /* addAnimation(renderer, "invincible.FLIGHT1", "misc:invincible_relax_flight")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('misc:dyn/random_digit') == 1)
        .priority = 10; */

        addAnimation(renderer, "invincible.FLIGHT1", "fiskheroes:flight/default_arms_forward.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('misc:dyn/random_digit') == 1)
        .priority = -10;

    addAnimation(renderer, "invincible.FLIGHT2", "fiskheroes:flight/propelled_hands.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        }).setCondition(entity => entity.getData('misc:dyn/random_digit') == 0)
        .priority = -10;

        addAnimation(renderer, "invincible.PUNCH", "misc:speed_punches")
        .setData((entity, data) => {
            data.load(0.5 + entity.loop(1));
        }).setCondition(entity => entity.getInterpolatedData("fiskheroes:energy_projection_timer") > 0.5);

    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer) {
    parent.render(entity, renderLayer);
    if (renderLayer == "LEGGINGS" && entity.getData("misc:dyn/texture") < 0.25) {
        layer2.render();
    }

    if (entity.getInterpolatedData("fiskheroes:energy_projection_timer") > 0.5) {
        for (var i = 1; i <= 9; i++) {
            var loop = entity.loop(i);
            var fade = i * 0.05;
        
            if (loop > 0 && loop < fade) {
                var targetArm = eval("arm" + i);
                targetArm.opacity = entity.loop((i % 9) + 1);
                targetArm.render();
            }
        }
    }

}