extend("fiskheroes:hero_basic");
loadTextures({
    "blank": "misc:blank",
    "capevincible": "misc:marks/capevincible",
    "capevincible_cape": "misc:marks/capevincible_cape",
    "movincihawk": "misc:marks/movincihawk",
    "mustachible": "misc:marks/mustachible",
    "maskvincible": "misc:marks/maskvincible",
    "stripevincible": "misc:marks/stripevincible",
    "hoodvincible": "misc:marks/hoodvincible",
    "hairvincible": "misc:marks/hairvincible",
    "capvincible": "misc:marks/capvincible",
    "sportvincible": "misc:marks/sportvincible",
    "lightblueincible": "misc:marks/lightblueincible",
    "omnivincible": "misc:marks/omnivincible",
    "omnivincible_cape": "misc:marks/omnivincible_cape",
    "viltrumincible": "misc:marks/viltrumincible",
    "bulletproofible": "misc:marks/bulletproofible",
    "prisonincible": "misc:marks/prisonvincible",
    "flaxancible": "misc:marks/flaxancible",
    "gogglesvincible": "misc:marks/gogglesvincible",
    "nogogglesible": "misc:marks/nogogglesible",
    "nomaskible": "misc:marks/nomaskible",
    "portal": "misc:marks/angstrom_portal",
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var speedster = implement("fiskheroes:external/speedster_utils");
var portal


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var slot = entity.getData("misc:dyn/slot");
        if (slot == 1) {
            return "capevincible";
        } else if (slot == 2) {
            return "movincihawk";
        } else if (slot == 3) {
            return "mustachible";
        } else if (slot == 4) {
            return "maskvincible";
        } else if (slot == 5) {
            return "stripevincible";
        } else if (slot == 6) {
            return "hoodvincible";
        } else if (slot == 7) {
            return "hairvincible";
        } else if (slot == 8) {
            return "capvincible"
        } else if (slot == 9) {
            return "sportvincible"
        } else if (slot == 10) {
            return "lightblueincible"
        } else if (slot == 11) {
            return "omnivincible"
        } else if (slot == 12) {
            return "viltrumincible"
        } else if (slot == 13) {
            return "bulletproofible"
        } else if (slot == 14) {
            return "prisonincible"
        } else if (slot == 15) {
            return "flaxancible"
        } else if (slot == 16) {
            return "gogglesvincible"
        } else if (slot == 17) {
            return "nogogglesible"
        } else if (slot == 18) {
            return "nomaskible"
        }
        return "blank"
    })
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");

}

function initEffects(renderer) {
    speedster.init(renderer);
    utils.bindParticles(renderer, "misc:super_boost").setCondition(entity => entity.getData("misc:dyn/boost1") || entity.getData("misc:dyn/boost2") || entity.getData("misc:dyn/boost3") || entity.getData("misc:dyn/boost4"));
    utils.bindParticles(renderer, "misc:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
    utils.bindParticles(renderer, "misc:invincible_charge").setCondition(entity => entity.getData("misc:dyn/charge_timer") > 0.3)
    utils.bindParticles(renderer, "misc:landing_particles").setCondition(entity => entity.getData("misc:dyn/charge_timer") > 0.3 && !entity.isOnGround() && entity.getData("fiskheroes:flying") && entity.isSprinting())


    /*   var model = renderer.createResource("MODEL", "misc:angstrom_portal");
      model.texture.set("portal");
      model.bindAnimation("misc:angstrom_portal").setData((entity, data) => { 
          data.load(0, entity.getInterpolatedData("misc:dyn/float_interp1") > 0); 
          
      });
      portal = renderer.createEffect("fiskheroes:model").setModel(model);
      portal.anchor.set("leftArm");
      portal.anchor.ignoreAnchor(true); */


    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 1.2;
    physics.maxFlare = 0.8;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 6;
    physics.setTickHandler(entity => {
        var f = 1 - entity.getData("fiskheroes:flight_timer");
        var b = entity.getData("fiskheroes:energy_projection_timer");
        f = 1 - f * f * f;
        var flight = entity.getData("fiskheroes:flying");
        physics.headingAngle = 85 - f * 1.2;
        physics.restAngle = flight ? f * 2.5 : b * 30;
        physics.restFlare = flight ? (f * 0.55) + 0.3 : (b * 0.75) + 0.2;
        physics.idleFlutter = flight ? 0.25 + 0.30 * f : 0.1 + 0.15 * b;
        physics.flutterSpeed = flight ? f * 0.5 : b * 0.3;
    });
    
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("capevincible_cape");

    cape2 = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape2.effect.texture.set("omnivincible_cape");

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
    addAnimationWithData(renderer, "invincible.BLOCKING", "misc:invincible_block", "fiskheroes:shield_blocking_timer");
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

function render(entity, renderLayer, isFirstPersonArm) {
    parent.render(entity, renderLayer);
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && entity.getData("misc:dyn/slot") == 1) {
        cape.render(entity);
    } else if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && entity.getData("misc:dyn/slot") == 11) {
        cape2.render(entity)
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
    /* if (entity.getData("misc:dyn/float_interp1") > 0.5 ? 1 : 0) {
        portal.render();
    } */
}