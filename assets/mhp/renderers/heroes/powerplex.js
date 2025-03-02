extend("fiskheroes:hero_basic");
loadTextures({
  "layer1": "mhp:powerplex/powerplex_layer1",
  "layer2": "mhp:powerplex/powerplex_layer2",
  "charge": "mhp:powerplex/powerplex_light",
  "eyes": "mhp:powerplex/powerplex_light_eyes",
});

var utils = implement("fiskheroes:external/utils");
var overlay;
var eyes


/* function init(renderer) {
  parent.init(renderer);
  renderer.setTexture((entity, renderLayer) => {
    if (!entity.is("DISPLAY") && entity.getData("mhp:dyn/shazam_timer") >= 0.5) {
      return "full";
    }
    return renderLayer == "LEGGINGS" ? "blank" : "blank";
  });
  renderer.setLights((entity, renderLayer) => {
    if (!entity.is("DISPLAY") && entity.getData("mhp:dyn/shazam_timer") >= 0.5) {
      return "lights";
    }
    return renderLayer == "LEGGINGS" ? null : null;
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
  renderer.fixHatLayer("CHESTPLATE");
}
 */

function initEffects(renderer) {
  utils.bindTrail(renderer, "mhp:powerplex_flicker_beam").setCondition(entity => entity.getData("fiskheroes:beam_charging") > 0)
  utils.bindTrail(renderer, "mhp:powerplex_flicker").setCondition(entity => entity.getData("mhp:dyn/power_charge") > 0.2)

  overlay = renderer.createEffect("fiskheroes:overlay");
  overlay.texture.set(null, "charge");
  eyes = renderer.createEffect("fiskheroes:overlay");
  eyes.texture.set(null, "eyes");

  var forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.color.set(0xFFD700);
  forcefield.setOffset(0.0, 6.0, 0.0)
  forcefield.setCondition(entity => {
    forcefield.opacity = Math.max(entity.getInterpolatedData("fiskheroes:beam_shooting_timer") / 2, 0);
    forcefield.setScale(entity.getInterpolatedData("fiskheroes:beam_shooting_timer") * 6);
    return true;
  });


  var beam = renderer.createResource("BEAM_RENDERER", "mhp:charged_beam");
  utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "rightArm", 0xFFD700, [
    { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] },
    { "firstPerson": [3.75, 3.0, -8.0], "offset": [0.5, 9.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  utils.bindBeam(renderer, "fiskheroes:charged_beam", null, "body", null, []);

  utils.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:lightning_cast", "rightArm", 0xFFD700, [
    { "firstPerson": [-2.5, 0.0, -7.0], "offset": [-0.5, 19.0, -12.0], "size": [2.0, 2.0] }
  ]);

  charge = renderer.bindProperty("fiskheroes:trail");
  charge.setTrail(renderer.createResource("TRAIL", "mhp:powerplex_charge"));
  charge.setCondition(entity => entity.getData("fiskheroes:beam_charging"));

  release = renderer.bindProperty("fiskheroes:trail");
  release.setTrail(renderer.createResource("TRAIL", "mhp:powerplex_release"));
  release.setCondition(entity => entity.getData("fiskheroes:beam_charge") > 0.9);


  /* utils.addCameraShake(renderer, 0.015, 1.5, "mhp:dyn/shazam_timer");
  var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
    shake.factor = entity.getData("mhp:dyn/shazam_timer") > 0.3 && entity.getData("mhp:dyn/shazam_timer") < 0.7
    return true;
  });
  shake.intensity = 0.0; */
}

function initAnimations(renderer) {
  parent.initAnimations(renderer);
  renderer.removeCustomAnimation("basic.CHARGED_BEAM");
  renderer.removeCustomAnimation("basic.ENERGY_PROJ");
  addAnimationWithData(renderer, "powerplex.ENERGY_PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");
  /* addAnimationWithData(renderer, "powerplex.CHARGED_BEAM", "mhp:powerplex_explosion", "fiskheroes:beam_charge"); */

  addAnimation(renderer, "powerplex.CHARGED_BEAM", "mhp:powerplex_explosion")
    .setData((entity, data) => {
      var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
      data.load(0, entity.getData("fiskheroes:beam_charging") ? charge : 0);
  data.load(1, entity.getInterpolatedData("fiskheroes:beam_shooting_timer"))
    }).priority = 0;
    

  utils.addFlightAnimation(renderer, "powerplex.FLIGHT", "fiskheroes:flight/default.anim.json");
  utils.addHoverAnimation(renderer, "powerplex.HOVER", "fiskheroes:flight/idle/default");
}

function render(entity, renderLayer, isFirstPersonArm) {
  var timer = entity.getData("mhp:dyn/power_charge");

  var finalOpacity = 0;

  if (timer > 0.2 && timer < 0.5) {
    finalOpacity = 0.25;
  } else if (timer >= 0.5 && timer < 0.8) {
    finalOpacity = 0.5;
  } else if (timer >= 0.8 && timer < 1) {
    finalOpacity = 0.75;
  } else if (timer >= 1) {
    finalOpacity = 1;
  }

  overlay.opacity = finalOpacity;
  overlay.render();

  if (timer >= 1) {
    eyes.render();
  }
}