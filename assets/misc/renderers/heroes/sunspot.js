extend("fiskheroes:hero_basic");
loadTextures({
    "base": "misc:sunspot/sunspot_full",
    "suit": "misc:sunspot/solar_transformation.tx.json",
    "reactor": "misc:sunspot/sunspot_clothes",
    "glow": "misc:sunspot/sunspot_lightlayer",
    "half": "misc:sunspot/sunspot_semi",
    "half_light": "misc:sunspot/sunspot_semi_lights",
});

var utils = implement("fiskheroes:external/utils");
//var flames = implement("fiskheroes:external/flames");
var color = 0xFF6500;

var suit
var suit1;
var suit2;
var suit3;
var suit4;
var half_light
var half
//var hand_flames;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            var timer = entity.getInterpolatedData("misc:dyn/solar_timer");
            return timer < 1 ? "reactor" : "base";
        }
        return "base";
    });
    /*  renderer.setLights((entity, renderLayer) => {
         if (entity.is("DISPLAY") || entity.getData("misc:dyn/solar_timer") >= 0.5) {
           return "glow";
         }
         return renderLayer == "LEGGINGS" ? null : null;
       }); */
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}


function initEffects(renderer) {
    suit1 = renderer.createEffect("fiskheroes:overlay");
    suit1.texture.set(null, "glow");


    suit2 = renderer.createEffect("fiskheroes:overlay");
    suit2.texture.set(null, "glow");


    suit3 = renderer.createEffect("fiskheroes:overlay");
    suit3.texture.set(null, "glow");

    half_light = renderer.createEffect("fiskheroes:overlay");
    half_light.texture.set(null, "half_light")

    half = renderer.createEffect("fiskheroes:overlay");
    half.texture.set("half")



    utils.bindParticles(renderer, "misc:flame").setCondition(entity => entity.getData("fiskheroes:energy_projection"));
    utils.bindParticles(renderer, "misc:sunspot_transform").setCondition(entity => entity.getData("misc:dyn/solar_timer") > 0.3 && entity.getData("misc:dyn/solar_timer") < 0.5);
    utils.bindParticles(renderer, "misc:sunspot_on").setCondition(entity => entity.getData("misc:dyn/solar"));
    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.color.set(0xF3985B);
}

function render(entity, renderLayer) {
    var now = Date.now();
    var timer = entity.getData("misc:dyn/solar_timer") >= 1;
    var halfTimer = entity.getData("misc:dyn/half_solar_timer") > 0;

    var durations = [2000, 3000, 2500, 1500]
    var opacities = [];

    for (var i = 0; i < durations.length; i++) {
        var progress = (now % durations[i]) / durations[i];
        opacities.push((Math.sin(progress * Math.PI * 2) * 0.5) + 0.5);
    }

    if (halfTimer) {
        half.render();
        half_light.render();
    } else if (timer >= 0.5) {
        var suits = [suit1, suit2, suit3];
        for (var j = 0; j < suits.length; j++) {
            suits[j].opacity = opacities[j];
            suits[j].render();
        }
    }


    glow.opacity = 1 * (1 - Math.abs(2 * entity.getInterpolatedData("misc:dyn/solar_timer") - 1));
    glow.render();
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    utils.addFlightAnimation(renderer, "shazam.FLIGHT", "fiskheroes:flight/default.anim.json");
    utils.addHoverAnimation(renderer, "shazam.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimationWithData(renderer, "ray.ENERGY_PROJ", "fiskheroes:aiming", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "ray.ENERGY_PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");
}
