extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "striker_eureka": "mhp:striker_eureka/striker_eureka",
});

var utils = implement("fiskheroes:external/utils");
var mk50_cannon = implement("fiskheroes:external/mk50_cannon");

var striker_eureka;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "CHESTPLATE" ? "lights" : null);
    
    renderer.showModel("CHESTPLATE", "body", "headwear", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    
    renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
        return 0.99999;
    })

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "mhp:invis", "head", 0xFFAA00, [
        { "firstPerson": [0, 0, 0], "offset": [0, 0.30, 1.0], "size": [0.8, 0.8] }
    ]);
    
    var model = renderer.createResource("MODEL", "mhp:striker_eureka");
    model.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
    model.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
    model.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
    model.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    model.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    
    model.texture.set("striker_eureka");
    striker_eureka = renderer.createEffect("fiskheroes:model").setModel(model);
    striker_eureka.anchor.set("body");
    striker_eureka.setScale(0.8);
    striker_eureka.anchor.ignoreAnchor(true)
    
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        striker_eureka.render();
    }
}