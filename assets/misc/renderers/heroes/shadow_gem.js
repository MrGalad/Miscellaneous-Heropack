
extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "necklace": "misc:oc/darkness_necklace",
    "portal": "misc:oc/portal",
    "gem": "misc:oc/darkness",
    "armor": "misc:oc/darkness_armour"
});
var utils = implement("fiskheroes:external/utils");
var flames = implement("fiskheroes:external/flames");

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            var timer = entity.getInterpolatedData("misc:dyn/solar_timer");
            return timer < 0.4 ? "necklace" : "armor";
        }
        return "armor";
    });
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    utils.bindParticles(renderer, "misc:darkness_transformation").setCondition(entity => entity.getInterpolatedData("misc:dyn/solar_timer") > 0 && entity.getInterpolatedData("misc:dyn/solar_timer") < 1);
    utils.bindParticles(renderer, "misc:darkness_on").setCondition(entity => entity.getInterpolatedData("misc:dyn/solar_timer") > 0);

    var model_portal = renderer.createResource("MODEL", "misc:portal");
    model_portal.texture.set(null, "portal");
    portal = renderer.createEffect("fiskheroes:model").setModel(model_portal);
    portal.anchor.set("body");

    var gem = renderer.createResource("MODEL", "misc:gem");
    gem.texture.set("gem");
    gemEffect = renderer.createEffect("fiskheroes:model").setModel(gem);
    gemEffect.anchor.set("body");
}


function render(entity, renderLayer, isFirstPersonArm) {
    if (entity.getInterpolatedData("misc:dyn/solar_timer") > 0 && entity.getInterpolatedData("misc:dyn/solar_timer") < 1) {
        var scale = Math.min(1, 5 * entity.getInterpolatedData("misc:dyn/solar_timer"))
        portal.setScale(scale, 1, scale);
        portal.anchor.ignoreAnchor(!isFirstPersonArm);
        portal.setOffset(0, -1.5/*  * (entity.getData("g3hp:dyn/sneaking_timer2") > 0) */, 0);
        portal.render();
    } if (entity.getInterpolatedData("misc:dyn/solar_timer") < 0.3) {
        /*  gemEffect.setScale(1, 1, 1);
         gemEffect.anchor.ignoreAnchor(!isFirstPersonArm);
         gemEffect.setOffset(0, -0.5, 0); */
        gemEffect.render();
    }
}

function initAnimations(renderer) {
    addAnimationWithData(renderer, "shadow.TRANSFORM", "misc:darkness_equip", "misc:dyn/solar_timer");
}
