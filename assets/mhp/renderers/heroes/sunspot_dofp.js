extend("mhp:sunspot");
loadTextures({
    "base": "mhp:sunspot/solar",
    "suit": "mhp:sunspot/solar_transformation.tx.json",
    "reactor": "mhp:sunspot/sun_black"
});

function init(renderer) {
    parent.init(renderer);
    renderer.setItemIcons("%s_0", "sunspot_dofp_1", "sunspot_dofp_2", "sunspot_dofp_3");
    renderer.setTexture((entity, renderLayer) => {

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            var timer = entity.getInterpolatedData("mhp:dyn/solar_timer");
            return  timer < 1 ? "reactor" : "base";
        }
        return "base";
    });

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE")
}