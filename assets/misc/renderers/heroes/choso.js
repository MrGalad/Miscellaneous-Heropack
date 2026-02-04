extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:choso/choso",
    "layer2": "misc:choso/choso",
    "hair": "misc:choso/choso_hair",
    "daggerTexture": "misc:choso/choso_dagger",
    "effectsTexture": "misc:choso/choso_effects",
    "sleeve": "misc:choso/sleeve.tx.json",
    "effects": "misc:choso/effects.tx.json",
    "dagger": "misc:choso/dagger.tx.json",
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var layer2
var overlay_suit


function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");

    renderer.setTexture((entity, renderLayer) => {
        var fist = entity.getInterpolatedData("misc:dyn/fist_timer");
        var edge = entity.getInterpolatedData("misc:dyn/edge_timer");
        if (edge > 0) {
            return "dagger";
        } if (fist > 0.6) {
            return "effects";
        } else if (fist > 0.2) {
            return "sleeve";
        }

        return "layer1"
    })
}

function initEffects(renderer) {
    //utils.bindParticles(renderer, "misc:super_boost").setCondition(entity => entity.getData("fiskheroes:beam_shooting_timer") < 0.3 && entity.getData("fiskheroes:beam_shooting_timer") > 0 && entity.getData("fiskheroes:beam_charging"))
    utils.bindParticles(renderer, "misc:piercing_blood_particles").setCondition((entity => entity.getData("fiskheroes:beam_charge") > 0.4 /* && entity.getData("fiskheroes:beam_charge") < 1 */));
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:piercing_blood", "body", 0xFF0000, [{
        "firstPerson": [0, 1, -10],
        "offset": [0, 4, -8],
        "size": [0.4, 0.4]
    }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "misc:piercing_blood_impact"));;
    //utils.addCameraShake(renderer, 0.2, 0, "fiskheroes:beam_shooting_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0 && entity.getInterpolatedData("fiskheroes:beam_shooting_timer") < 0.7 ? 3 : 0.5;

        return (entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0 && entity.getInterpolatedData("fiskheroes:beam_shooting_timer") < 0.7) || entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0.7;
    });

    var hairModel = renderer.createResource("MODEL", "misc:choso_hair");
    hairModel.texture.set("hair");
    hair = renderer.createEffect("fiskheroes:model").setModel(hairModel);
    hair.anchor.set("head");

    var effectsModel = renderer.createResource("MODEL", "misc:choso_effects");
     effectsModel.bindAnimation("misc:choso_animations").setData((entity, data) => {
        data.load(1, entity.getInterpolatedData("misc:dyn/edge_timer"));
    });
    effectsModel.texture.set("effectsTexture");
    effects = renderer.createEffect("fiskheroes:model").setModel(effectsModel);
    effects.anchor.set("rightArm");

    var daggerModel = renderer.createResource("MODEL", "misc:choso_dagger");
     daggerModel.bindAnimation("misc:choso_animations").setData((entity, data) => {
        data.load(1, entity.getInterpolatedData("misc:dyn/edge_timer"));
    });
    daggerModel.texture.set("daggerTexture");
    dagger = renderer.createEffect("fiskheroes:model").setModel(daggerModel);
    dagger.anchor.set("rightArm");

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);

    addAnimation(renderer, "choso.PIERCE", "misc:choso_piercing_blood")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge"));
            data.load(1, entity.getInterpolatedData("fiskheroes:beam_shooting_timer"));
        })
    addAnimation(renderer, "choso.SLEEVE", "misc:choso_animations")
        .setData((entity, data) => {
            data.load(0, (entity.getData("misc:dyn/fist_timer")))
            data.load(1, entity.getInterpolatedData("misc:dyn/edge_timer"));
        })
}


function render(entity, renderLayer, isFirstPersonArm) {
    if (entity.getData("misc:dyn/edge") ) {
        dagger.render();
    } if ((entity.getData("misc:dyn/edge_timer") > 0 && entity.getData("misc:dyn/edge_timer") < 0.6)) {
        effects.render();
    }

    hair.render()

}