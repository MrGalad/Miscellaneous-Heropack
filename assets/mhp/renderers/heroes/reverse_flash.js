extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:rf/rf",
    "layer2": "mhp:rf/rf",
    "eyes": "fiskheroes:reverse_flash_eyes"
});

var speedster = implement("fiskheroes:external/speedster_utils");
var utils = implement("fiskheroes:external/utils")

var vibration;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" && entity.getData("mhp:dyn/vibration") ? "eyes" : null);
}

function initEffects(renderer) {
    vibration = renderer.createEffect("fiskheroes:vibration");
    speedster.init(renderer, "fiskheroes:lightning_red");

   /*  utils.bindBeam(renderer, "fiskheroes:charged_beam", "mhp:invis", "head", 0xAA00AA, [{
        "firstPerson": [0, 0, 0],
        "offset": [0, 0, 0],
        "size": [0, 0]
    }
    ]); */

    utils.bindBeam(renderer, "fiskheroes:energy_manipulation", "fiskheroes:energy_discharge", "rightArm", 0xFF0000, [
        { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [2.0, 2.0] }
    ]);
}

function render(entity, renderLayer, isFirstPersonArm) {
    if ((!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") && entity.getData("fiskheroes:beam_charging") || entity.getData("mhp:dyn/vibration") || entity.getInterpolatedData("mhp:dyn/attack_timer")) {
        vibration.render();
    }
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM")
    renderer.removeCustomAnimation("basic.ENERGY_PROJ")
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimationWithData(renderer, "rf.CHARGED_BEAM", "mhp:burster"/* , "mhp:dyn/attack_timer" */).setData((entity, data) => data.load(Math.max(entity.getInterpolatedData("mhp:dyn/attack_timer") * 1, 0))).priority = -10;
    addAnimationWithData(renderer, "rf.ENERGY_PROJ", "mhp:attack", "fiskheroes:energy_projection_timer")/* .setData((entity, data) => data.load(Math.max(entity.getInterpolatedData("mhp:dyn/attack_timer") * 5 - 4, 0)))*/.priority = 10;
    
    addAnimation(renderer, "flash.MASK", "fiskheroes:remove_cowl")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("fiskheroes:mask_open_timer2");
            data.load(f < 1 ? f : 0);
        });

        addAnimation(renderer, "thawne.RUN", "mhp:wall_run").setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:jetpacking_timer"));
            data.load(1, entity.loop(entity.getData("fiskheroes:speeding") ? 5 : 10) * 4);
        });

       /*  addAnimation(renderer, "thawne.CHARGED_BEAM", "mhp:burster").setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")); // Load data_0 first
            data.load(1, Math.min(1, Math.max(0, entity.getInterpolatedData("fiskheroes:beam_shooting_timer") * 0.05))); // Load data_1 after a delay, scaled to 0-1 range
        }); */
}
