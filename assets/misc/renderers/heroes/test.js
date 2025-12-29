extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "argall": "misc:sentinal/sentinelScales",
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var layer2


function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    var argallModel = renderer.createResource("MODEL", "misc:slash");
    argallModel.texture.set("argall");
    argallModel.bindAnimation("misc:test").setData((entity, data) => {
        data.load(0, entity.getData("misc:dyn/slide_timer"));
    });
    argall = renderer.createEffect("fiskheroes:model").setModel(argallModel);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
}

function render(entity, renderLayer) {
    parent.render(entity, renderLayer);
    if (entity.getData("misc:dyn/slide_timer") > 0) {
        argall.render()
        argall.setScale(1 + entity.getData("misc:dyn/slide_timer") * 2);
        argall.opacity = 1 - entity.getData("misc:dyn/slide_timer");
    }

}