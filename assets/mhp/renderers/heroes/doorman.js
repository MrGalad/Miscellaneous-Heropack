extend("fiskheroes:hero_basic");
loadTextures({
    "suit": "mhp:doorman/doorman_base",
    "xor": "mhp:doorman/doorman_suit.tx.json",
    "base": "mhp:doorman/doorman_suit",
    "cape": "mhp:doorman/doorman_cape.tx.json",
    "fullcape": "mhp:doorman/doorman_cape",
    "blank": "mhp:blank"

});
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var suit
var cape


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        if (!entity.isDisplayStand()) {
            var timer = entity.getInterpolatedData("mhp:dyn/transformation_timer");
            return timer == 0 ? "suit" : timer < 1 ? "xor" : "base";
        }
        return "suit";
    });
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    suit = renderer.createEffect("fiskheroes:overlay");
    suit.texture.set("xor");
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 1.0;
    physics.maxFlare = 0.5;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");

    utils.setOpacityWithData(renderer, 0.5, 1.0, "fiskheroes:intangibility_timer");
	utils.bindCloud(renderer, "fiskheroes:teleportation", "mhp:doorman_teleport");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
}

function render (entity, renderLayer, isFirstPersonArm) {
   var timer = entity.getInterpolatedData("mhp:dyn/transformation_timer");
   var hologram = entity.is("DISPLAY") && entity.as("DISPLAY").getDisplayType() != "HOLOGRAM"


    if (timer > 0 && timer < 1){
        suit.render();
    }   
     if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
    }
}



/*function render(entity, renderLayer, isFirstPersonArm) {
    var timer = entity.getInterpolatedData("mhp:dyn/transformation_timer");
    
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && (timer > 0 && timer < 1)) {
        cape.render(entity);
    }
}*/
