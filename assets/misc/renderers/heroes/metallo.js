extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:metallo/metallo_layer1",
    "layer2": "misc:metallo/metallo_layer2",
    "chest": "misc:metallo/chest",
    "chainsaw": "misc:metallo/metallo_chainsaw.tx.json",
    "chainsaw_active": "misc:metallo/metallo_chainsaw_active.tx.json",
    "hammer": "misc:metallo/metallo_hammer.tx.json"
});
var utils = implement("fiskheroes:external/utils");

var overlay;
var hammer;
var chainsaw_active;
var chainsaw;
var night_vision;

function initEffects(renderer) {
    parent.initEffects(renderer);
    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "chest");

    night_vision = renderer.bindProperty("fiskheroes:night_vision");
    night_vision.factor = 1;
    night_vision.firstPersonOnly = false;

    utils.bindBeam(renderer, "fiskheroes:heat_vision", "misc:heat_vision", "head", 0x55FF55, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.0, -3.3, -4.0], "size": [0.6, 0.3] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.0, -3.3, -4.0], "size": [0.6, 0.3] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:heat_vision", "body", getBeamColor(), [
        { "firstPerson": [0.0, 7.0, 0.0], "offset": [0.0, 2.5, -2.0], "size": [0.7, 0.6] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    var modelChainsaw = renderer.createResource("MODEL", "misc:metallo_chainsaw");
    modelChainsaw.texture.set("chainsaw", null);
    chainsaw = renderer.createEffect("fiskheroes:model").setModel(modelChainsaw);
    chainsaw.anchor.set("rightArm");

    var modelChainsawActive = renderer.createResource("MODEL", "misc:metallo_chainsaw");
    modelChainsawActive.texture.set("chainsaw_active", null);
    chainsaw_active = renderer.createEffect("fiskheroes:model").setModel(modelChainsawActive);
    chainsaw_active.anchor.set("rightArm");

    var modelHammer = renderer.createResource("MODEL", "misc:metallo_hammer");
    modelHammer.texture.set("hammer", null);
    hammer = renderer.createEffect("fiskheroes:model").setModel(modelHammer);
    hammer.anchor.set("leftArm");
}

function getBeamColor() {
    return 0x55FF55;
}
function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "DUAL_PUNCH", "misc:dual_punch")
        .setData((entity, data) => {
            data.load(entity.isPunching() ? entity.getInterpolatedData("fiskheroes:blade_timer") : 0);
	});
}
function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        overlay.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        overlay.render();
    }
    var blade_timer = entity.getData("fiskheroes:blade_timer")
    var eq = -(1.5*blade_timer - 1.15) * (1.5*blade_timer - 1.15) + 1.125; //I LOVE MATH HAHAHAHHA --> 3T
    if(entity.getData("fiskheroes:blade_timer") > 0){
        hammer.setOffset(-1, -2+blade_timer-1, 0).setScale(Math.max(0.6, eq));
        hammer.render();

        if(entity.getData("fiskheroes:blade_timer") < 1){
            chainsaw.setOffset(1, -2+blade_timer-1, 0).setScale(Math.max(0.6, eq));
            chainsaw.render();
        }else{ //only render active chainsaw when blade timer equals 1 --> 3T
            chainsaw_active.setOffset(1, -2, 0);
            chainsaw_active.render();
        }
    }

}
