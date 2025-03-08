extend("fiskheroes:hero_basic");
loadTextures({
    "suit": "misc:doorman/doorman_base",
    "xor": "misc:doorman/doorman_suit.tx.json",
    "base": "misc:doorman/doorman_suit",
    "cape": "misc:doorman/doorman_cape.tx.json",
    "fullcape": "misc:doorman/doorman_cape",
    "blank": "misc:blank"

});
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var suit
var cape
var glow


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
       /*  if (!entity.isDisplayStand()) {
            var timer = entity.getInterpolatedData("misc:dyn/transformation_timer");
            return timer == 0 ? "suit" : timer < 0.3 ? "xor" : "base";
        }
        return "suit"; */
        if (entity.getInterpolatedData("misc:dyn/transformation_timer") > 0.4){
            return "base"
        }
        return "suit"
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
    cape.effect.texture.set("fullcape");

    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.includeEffects(cape.effect);
    glow.color.set(0x000000);
    utils.bindParticles(renderer, "misc:doorman_glow");

    utils.setOpacityWithData(renderer, 0.5, 1.0, "fiskheroes:intangibility_timer");
	utils.bindCloud(renderer, "fiskheroes:teleportation", "misc:doorman_teleport");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");
}

function render (entity, renderLayer, isFirstPersonArm) {
   var timer = entity.getInterpolatedData("misc:dyn/transformation_timer");
   var hologram = entity.is("DISPLAY") && entity.as("DISPLAY").getDisplayType() != "HOLOGRAM"


    if (timer > 0.5 && timer < 1){
        suit.render();
    }   
     if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && entity.getInterpolatedData("misc:dyn/transformation_timer") > 0.4) {
        cape.render(entity);
    }

    glow.opacity = 1 * (1 - Math.abs(2 * entity.getInterpolatedData("misc:dyn/transformation_timer") - 1));
    glow.render();
}



/*function render(entity, renderLayer, isFirstPersonArm) {
    var timer = entity.getInterpolatedData("misc:dyn/transformation_timer");
    
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && (timer > 0 && timer < 1)) {
        cape.render(entity);
    }
}*/
