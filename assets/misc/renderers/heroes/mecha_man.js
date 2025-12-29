extend("fiskheroes:hero_basic");
loadTextures({
    "null": "misc:blank",
    "mecha_man": "misc:mecha_man/mecha_man",
    "mecha_man_lights": "misc:mecha_man/mecha_man_light_no_blades",
});

var utils = implement("fiskheroes:external/utils");

var mecha, mecha_lights, rightArmFake;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        return "null";
    });
    renderer.setLights((entity, renderLayer) => {
        return "null";
    });
    renderer.showModel("CHESTPLATE", "body", "headwear", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return 0.99999;
    });

    var model = renderer.createResource("MODEL", "misc:mecha_man");
    var modelArm = renderer.createResource("MODEL", "misc:mecha_man_fake_arm");

    model.bindAnimation("misc:mecha_man").setData((entity, data) => {
        data.load(0, 1);
        data.load(5, entity.getInterpolatedData("misc:dyn/sneaking_timer"));
        data.load(4, Math.min(1, 3.5 * entity.getInterpolatedData("misc:dyn/punch_right_timer")));
        data.load(2, entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer"));
    });

    model.texture.set("mecha_man", "mecha_man_lights");
    mecha = renderer.createEffect("fiskheroes:model").setModel(model);
    mecha.anchor.set("body");
    mecha.setScale(0.5);
    mecha.anchor.ignoreAnchor(true);
    mecha.setOffset(0, 12, 0);

    modelArm.bindAnimation("misc:mecha_man").setData((entity, data) => {
        data.load(0, 1);
        //data.load(1, entity.getInterpolatedData("fiskheroes:aimed_timer"));
        data.load(2, entity.getInterpolatedData("misc:dyn/sneaking_timer"));
        data.load(4, Math.min(1, 3.5 * entity.getInterpolatedData("misc:dyn/punch_right_timer")));
        data.load(5, entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer"));
    });

    modelArm.texture.set("mecha_man");
    rightArmFake = renderer.createEffect("fiskheroes:model").setModel(modelArm);
    rightArmFake.anchor.set("body");
    rightArmFake.setScale(0.5);
    rightArmFake.anchor.ignoreAnchor(true);
    rightArmFake.setOffset(2, 15, 4);

    utils.bindBeam(renderer, "fiskheroes:repulsor_blast", "fiskheroes:repulsor_blast", "rightArm", 0x00FFFF, [{
        "firstPerson": [-4.5, 3.75, -7.0],
        "offset": [-1.5, 4, 2.0],
        "size": [20, 20]
    }]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.AIMING");

   // addAnimation(renderer, "gipsy.POSE", "harpack:gipsy_pose")
   //     .setData((entity, data) => {
   //         data.load(0, 1);
   //         data.load(1, entity.getInterpolatedData("fiskheroes:aimed_timer"));
   //         data.load(2, entity.getInterpolatedData("harpack:dyn/sneaking_timer"));
   //     }).priority = 2;

}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        mecha.render();
    }
        if (isFirstPersonArm) {
        rightArmFake.render();
    }
}