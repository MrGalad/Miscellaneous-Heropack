extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:ray/the_ray_layer1",
    "layer2": "misc:ray/the_ray_layer2",
    "eyes": "misc:ray/theray_eyes"
});
var utils = implement("fiskheroes:external/utils");
var color = 0xFFAA00;
var charge_right;
var charge_left;
var hand_punch_left

/* var aura_head;
var aura_head2;
var aura_body;
var aura_arms;
var aura_arms2;
var aura_legs;
var aura_legs2;*/


function initEffects(renderer) {
    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "eyes");

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "misc:charge", "rightArm", color, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 10.0, 0.0], "size": [1.5, 1.5] },
        { "firstPerson": [3.75, 3.0, -8.0], "offset": [0.5, 10.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));

    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:cold_beam", "rightArm", color, [{
        "firstPerson": [-3.75, 3.0, -8.0],
        "offset": [-0.5, 12.0, 0.0],
        "size": [1.5, 1.5]
    }
    ]);

    var hand = renderer.createResource("BEAM_RENDERER", "misc:hand");

    hand_punch = utils.createLines(renderer, hand, color, [{
        "start": [0, -0.1, 0],
        "end": [0, 0.1, 0],
        "size": [3, 3]
    }
    ]);
    hand_punch.anchor.set("rightArm");
    hand_punch.setOffset(1.5, 9.0, 0.0).setRotation(0.0, 0.0, 0.0).setScale(16);
    hand_punch.mirror = false;

    hand_punch_left = utils.createLines(renderer, hand, color, [{
        "start": [0, -0.1, 0],
        "end": [0, 0.1, 0],
        "size": [3, 3]
    }
    ]);
    hand_punch_left.anchor.set("leftArm");
    hand_punch_left.setOffset(-1.5, 9.0, 0.0).setRotation(0.0, 0.0, 0.0).setScale(16);
    hand_punch_left.mirror = false;

    var charge = renderer.createResource("BEAM_RENDERER", "misc:charge");

    charge_right = utils.createLines(renderer, charge, color, [{
        "start": [0, -0.1, 0],
        "end": [0, 0.1, 0],
        "size": [3, 3]
    }
    ]);
    charge_right.anchor.set("rightArm");
    charge_right.setOffset(0.5, 9.0, 0.0).setRotation(0.0, 0.0, 0.0).setScale(16);
    charge_right.mirror = false;

    var beam = 0xFF6500;
    // Aura Head
    aura_head = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.1, 0.0],
        "size": [8.1, 8.1]
    }
    ]);
    aura_head.anchor.set("head");
    aura_head.setOffset(0.0, 0.0, 0.0).setRotation(0, 0, 0.0).setScale(14.0, 8.0, 14.0);
    aura_head.mirror = false;

    aura_head2 = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.1, 0.0],
        "size": [8.1, 8.1]
    }
    ]);
    aura_head2.anchor.set("head");
    aura_head2.setOffset(0.0, -4.0, 4.0).setRotation(90, 0, 0.0).setScale(14.0, 8.0, 14.0);
    aura_head2.mirror = false;

    //Aura Body
    aura_body = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.0, 0.0],
        "size": [4.0, 8.0]
    }
    ]);
    aura_body.anchor.set("body");
    aura_body.setOffset(0.0, 14.0, 0.0).setRotation(0, 0, 0.0).setScale(14.0, 14.0, 14.0);
    aura_body.mirror = false;

    //Aura Arms
    aura_arms = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.0, 0.0],
        "size": [4.0, 4.0]
    }
    ]);
    aura_arms.anchor.set("rightArm");
    aura_arms.setOffset(1.0, 10.0, 0.0).setRotation(0, 0, 0.0).setScale(14.0, 14.0, 14.0);
    aura_arms.mirror = true;

    aura_arms2 = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.0, 0.0],
        "size": [14.0, 4.0]
    }
    ]);
    aura_arms2.anchor.set("leftArm");
    aura_arms2.setOffset(1.0, 4.0, 2.0).setRotation(90, 0, 0.0).setScale(14.0, 4.0, 14.0);
    aura_arms2.mirror = false;

    //Aura Legs
    aura_legs = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.0, 0.0],
        "size": [4.0, 4.0]
    }
    ]);
    aura_legs.anchor.set("leftLeg");
    aura_legs.setOffset(0.0, 14.0, 0.0).setRotation(0, 0, 0.0).setScale(14.0, 14.0, 14.0);
    aura_legs.mirror = true;

    aura_legs2 = utils.createLines(renderer, "misc:aura", beam, [{
        "start": [0.0, 0.0, 0.0],
        "end": [0.0, -1.0, 0.0],
        "size": [14.0, 4.0]
    }
    ]);
    aura_legs2.anchor.set("rightLeg");
    aura_legs2.setOffset(0.0, 6.0, 2.0).setRotation(90, 0, 0.0).setScale(14.0, 4.0, 14.0);
    aura_legs2.mirror = true;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "vision.HOVER", "fiskheroes:flight/idle/neutral");
    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    addAnimationWithData(renderer, "ray.ENERGY_PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {

    if (entity.isWearingFullSuit()) {
        if (entity.isPunching() || entity.getData("fiskheroes:aiming_timer") == 1 || entity.getData("fiskheroes:energy_projection_timer") == 1) {
            hand_punch.render();
        }
    } if (entity.isWearingFullSuit()) {
        if (entity.getData("fiskheroes:energy_projection_timer") == 1) {
            hand_punch_left.render();
        }
    }

    overlay.render();

    var glow = entity.getInterpolatedData("fiskheroes:flight_timer") > 0;

    aura_head.opacity = glow;
    aura_head.render();
    aura_head2.opacity = glow;
    aura_head2.render()

    aura_body.opacity = glow;
    aura_body.render();

    aura_arms.opacity = glow;
    aura_arms.render();
    aura_arms2.opacity = glow;
    aura_arms2.render();

    aura_legs.opacity = glow;
    aura_legs.render();
    aura_legs2.opacity = glow;
    aura_legs2.render();
}
