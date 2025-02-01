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
    // Create multiple overlays
    suit1 = renderer.createEffect("fiskheroes:overlay");
    suit1.texture.set(null, "glow"); // Assign the "glow" texture
   

    suit2 = renderer.createEffect("fiskheroes:overlay");
    suit2.texture.set(null, "glow"); // Assign the "glow" texture
    

    suit3 = renderer.createEffect("fiskheroes:overlay");
    suit3.texture.set(null, "glow"); // Assign the "glow" texture

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
    var halfTimer = entity.getData("mhp:dyn/half_solar_timer") > 0; // Check if halfTimer is active

    var duration1 = 2000; // Duration for suit1 (2 seconds)
    var duration2 = 3000; // Duration for suit2 (3 seconds)
    var duration3 = 2500; // Duration for suit3 (2.5 seconds)
    var durationHalf = 1500; // Duration for half overlay (1.5 seconds)

    // Calculate elapsed time for each overlay using modulo for infinite looping
    var elapsedTime1 = Date.now() % duration1;
    var elapsedTime2 = Date.now() % duration2;
    var elapsedTime3 = Date.now() % duration3;
    var elapsedTimeHalf = Date.now() % durationHalf; // Elapsed time for half overlay

    // Calculate progress for each overlay
    var progress1 = elapsedTime1 / duration1;
    var progress2 = elapsedTime2 / duration2;
    var progress3 = elapsedTime3 / duration3;
    var progressHalf = elapsedTimeHalf / durationHalf; // Progress for half overlay

    // Use sine waves for smooth transitions
    var opacity1 = Math.sin(progress1 * Math.PI * 2) * 0.5 + 0.5; // Oscillates between 0 and 1
    var opacity2 = Math.sin(progress2 * Math.PI * 2) * 0.5 + 0.5; // Oscillates between 0 and 1
    var opacity3 = Math.sin(progress3 * Math.PI * 2) * 0.5 + 0.5; // Oscillates between 0 and 1
    var opacityHalf = Math.sin(progressHalf * Math.PI * 2) * 0.5 + 0.5; // Oscillates between 0 and 1

    // Ensure opacity values are clamped between 0 and 1
    opacity1 = Math.min(Math.max(opacity1, 0), 1);
    opacity2 = Math.min(Math.max(opacity2, 0), 1);
    opacity3 = Math.min(Math.max(opacity3, 0), 1);
    opacityHalf = Math.min(Math.max(opacityHalf, 0), 1); // Clamp half opacity

    if (halfTimer) {
        // Render the half overlay if halfTimer is active
       /*  half.opacity = opacityHalf */; // Set opacity for half overlay
        half.render(); // Render the half overlay
        half_light.render()
    } else if (timer >= 0.5) {
        // Update opacity for each overlay
        suit1.opacity = opacity1; // suit1 fades in and out
        suit2.opacity = opacity2; // suit2 fades in and out
        suit3.opacity = opacity3; // suit3 fades in and out

        // Render the overlays
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
