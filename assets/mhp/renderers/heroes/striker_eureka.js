extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "striker_eureka": "mhp:striker_eureka/striker_eureka",
    "fire": "mhp:striker_eureka/striker_eureka_repulsor_layer.tx.json"
});

var utils = implement("fiskheroes:external/utils");
var mk50_cannon = implement("fiskheroes:external/mk50_cannon");

var striker_eureka;
var fire;

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
    striker_eureka.anchor.ignoreAnchor(true);

    //fire stuff
    //bottom left
    var modelFirebotL = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_botL");
    modelFirebotL.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
    modelFirebotL.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
    modelFirebotL.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
    modelFirebotL.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFirebotL.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFirebotL.texture.set(null, "fire");
    firebotL = renderer.createEffect("fiskheroes:model").setModel(modelFirebotL);
    firebotL.anchor.set("body");
    firebotL.setScale(0.8);
    firebotL.anchor.ignoreAnchor(true);

     var modelFirebotM = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_botM");
     modelFirebotM.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
     modelFirebotM.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
     modelFirebotM.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
     modelFirebotM.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFirebotM.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFirebotM.texture.set(null, "fire");
    firebotM = renderer.createEffect("fiskheroes:model").setModel(modelFirebotM);
    firebotM.anchor.set("body");
    firebotM.setScale(0.8);
    firebotM.anchor.ignoreAnchor(true);

     var modelFirebotR = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_botR");
     modelFirebotR.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
     modelFirebotR.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
     modelFirebotR.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
     modelFirebotR.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFirebotR.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFirebotR.texture.set(null, "fire");
    firebotR = renderer.createEffect("fiskheroes:model").setModel(modelFirebotR);
    firebotR.anchor.set("body");
    firebotR.setScale(0.8);
    firebotR.anchor.ignoreAnchor(true);

     var modelFiretopR = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_topR");
    modelFiretopR.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
    modelFiretopR.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
    modelFiretopR.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
    modelFiretopR.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFiretopR.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFiretopR.texture.set(null, "fire");
    firetopR = renderer.createEffect("fiskheroes:model").setModel(modelFiretopR);
    firetopR.anchor.set("body");
    firetopR.setScale(0.8);
    firetopR.anchor.ignoreAnchor(true);

     var modelFiretopM = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_topM");
     modelFiretopM.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
     modelFiretopM.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
     modelFiretopM.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
     modelFiretopM.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFiretopM.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFiretopM.texture.set(null, "fire");
    firetopM = renderer.createEffect("fiskheroes:model").setModel(modelFiretopM);
    firetopM.anchor.set("body");
    firetopM.setScale(0.8);
    firetopM.anchor.ignoreAnchor(true);

     var modelFiretopL = renderer.createResource("MODEL", "mhp:striker/striker_eureka_fire_topL");
     modelFiretopL.bindAnimation("mhp:striker_eureka/idle_striker_eureka").setData((entity, data) => data.load(entity.loop(70)));
    modelFiretopL.bindAnimation("mhp:striker_eureka/movement_striker_eureka").setData((entity, data) => data.load(1, !entity.isSneaking() ? !entity.getData("fiskheroes:flying"): 0));
    modelFiretopL.bindAnimation("mhp:striker_eureka/striker_eureka_cannons").setData((entity, data) => data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge")));
    modelFiretopL.bindAnimation("mhp:striker_eureka/dual_punch_striker_eureka").setData((entity, data) => {
        data.load(entity.getData("fiskheroes:blade_timer") ? Math.min(4 * entity.getPunchTimerInterpolated(), 1) : 0);
    }).priority = -8;
    modelFiretopL.bindAnimation("mhp:striker_eureka/sting_blades").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    modelFiretopL.texture.set(null, "fire");
    firetopL = renderer.createEffect("fiskheroes:model").setModel(modelFiretopL);
    firetopL.anchor.set("body");
    firetopL.setScale(0.8);
    firetopL.anchor.ignoreAnchor(true);
}
var active = true
function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        striker_eureka.render();

        if (entity.getData("fiskheroes:beam_charge") > 0.99 /* && active */) {
            firetopR.render();
            active = false
        } else if (entity.getData("fiskheroes:beam_charge") >= 0.9 && active) {
            firebotL.render();
        } else if (entity.getData("fiskheroes:beam_charge") >= 0.85 && active) {
            firebotM.render();
        } else if (entity.getData("fiskheroes:beam_charge") >= 0.8 && active) {
            firebotR.render();
        } else if (entity.getData("fiskheroes:beam_charge") >= 0.7 && active) {
            firetopL.render();
        } else if (entity.getData("fiskheroes:beam_charge") >= 0.6 && active) {
            firetopM.render();
        } else if (entity.getData("fiskheroes:beam_charge") < 0.1 && !active) {
            active = true;
        }
    }
}
