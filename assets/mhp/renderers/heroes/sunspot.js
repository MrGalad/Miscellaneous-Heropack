extend("fiskheroes:hero_basic");
loadTextures({
    "base": "mhp:sunspot/sunspot_full",
    "suit": "mhp:sunspot/solar_transformation.tx.json",
    "reactor": "mhp:sunspot/sunspot_clothes",
    "glow": "mhp:sunspot/sunspot_lightlayer",
    "half": "mhp:sunspot/sunspot_semi",
    "half_light": "mhp:sunspot/sunspot_semi_lights",
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
            var timer = entity.getInterpolatedData("mhp:dyn/solar_timer");
            return  timer < 1 ? "reactor" : "base";
        }
        return "base";
    });
   /*  renderer.setLights((entity, renderLayer) => {
        if (entity.is("DISPLAY") || entity.getData("mhp:dyn/solar_timer") >= 0.5) {
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
    
    

    utils.bindParticles(renderer, "mhp:flame").setCondition(entity => entity.getData("fiskheroes:energy_projection"));
    utils.bindParticles(renderer, "mhp:sunspot_transform").setCondition(entity => entity.getData("mhp:dyn/solar_timer") > 0.3 && entity.getData("mhp:dyn/solar_timer") < 0.5);
    utils.bindParticles(renderer, "mhp:sunspot_on").setCondition(entity => entity.getData("mhp:dyn/solar"));
    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.color.set(0xF3985B);
}

function render(entity, renderLayer) {
    var timer = entity.getData("mhp:dyn/solar_timer") >= 1;
    var halfTimer = entity.getData("mhp:dyn/half_solar_timer") > 0;

    var duration1 = 2000;
    var duration2 = 3000;
    var duration3 = 2500;
    var durationHalf = 1500; 

    var elapsedTime1 = Date.now() % duration1;
    var elapsedTime2 = Date.now() % duration2;
    var elapsedTime3 = Date.now() % duration3;
    var elapsedTimeHalf = Date.now() % durationHalf;

    var progress1 = elapsedTime1 / duration1;
    var progress2 = elapsedTime2 / duration2;
    var progress3 = elapsedTime3 / duration3;
    var progressHalf = elapsedTimeHalf / durationHalf; 

    var opacity1 = Math.sin(progress1 * Math.PI * 2) * 0.5 + 0.5; 
    var opacity2 = Math.sin(progress2 * Math.PI * 2) * 0.5 + 0.5; 
    var opacity3 = Math.sin(progress3 * Math.PI * 2) * 0.5 + 0.5; 
    var opacityHalf = Math.sin(progressHalf * Math.PI * 2) * 0.5 + 0.5; 

  
    opacity1 = Math.min(Math.max(opacity1, 0), 1);
    opacity2 = Math.min(Math.max(opacity2, 0), 1);
    opacity3 = Math.min(Math.max(opacity3, 0), 1);
    opacityHalf = Math.min(Math.max(opacityHalf, 0), 1);

    if (halfTimer) {
        half.render();
        half_light.render()
    } else if (timer >= 0.5) {
        suit1.opacity = opacity1;
        suit2.opacity = opacity2; 
        suit3.opacity = opacity3; 

        suit1.render();
        suit2.render();
        suit3.render();
    }

    glow.opacity = 1 * (1 - Math.abs(2 * entity.getInterpolatedData("mhp:dyn/solar_timer") - 1));
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
