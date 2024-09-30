extend("fiskheroes:hero_basic");
loadTextures({
  "layer1": "mhp:adam/adam_suit",
  "layer2": "mhp:adam/adam_suit",
  "lights": "mhp:adam/adam_light",
  "charge": "mhp:adam/adam_lightning",
  "harley": "mhp:adam/1harleyeyes",
  "full": "mhp:adam/adam_suit",
  "blank": "mhp:adam/adam_robes"
});

var utils = implement("fiskheroes:external/utils");
var overlay;


function init(renderer) {
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


function initEffects(renderer) {
  utils.bindTrail(renderer, "mhp:shazam_flicker").setCondition(entity => entity.getData("fiskheroes:beam_charging") > 0)
  overlay = renderer.createEffect("fiskheroes:overlay");
  overlay.texture.set(null, "charge");
  harley = renderer.createEffect("fiskheroes:overlay");
  harley.texture.set(null, "harley");


  var beam = renderer.createResource("BEAM_RENDERER", "mhp:charged_beam");
  utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "rightArm", 0x52E6FB, [
    { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] },
    { "firstPerson": [3.75, 3.0, -8.0], "offset": [0.5, 9.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
  utils.bindBeam(renderer, "fiskheroes:charged_beam", null, "body", null, []);

  charge = renderer.bindProperty("fiskheroes:trail");
  charge.setTrail(renderer.createResource("TRAIL", "mhp:charge"));
  charge.setCondition(entity => entity.getData("fiskheroes:beam_charging"));

  release = renderer.bindProperty("fiskheroes:trail");
  release.setTrail(renderer.createResource("TRAIL", "mhp:release"));
  release.setCondition(entity => entity.getData("fiskheroes:beam_charge") > 0.9);

  /*  utils.bindParticles(renderer, "mhp:landing_particles").setCondition(
       (entity => entity.getData("mhp:dyn/shazam_timer") > 0 )); */
  utils.bindParticles(renderer, "mhp:shazam").setCondition((entity => entity.getData("mhp:dyn/shazam_timer") > 0.3 && entity.getData("mhp:dyn/shazam_timer") < 0.7));

  var beam_1 = renderer.createResource("BEAM_RENDERER", "mhp:shazam");
  var color = 0x80F1E7;

  shazam = utils.createLines(renderer, beam_1, color, [
    {
      "start": [0, -64, 0],
      "end": [0, -1, 0],
      "size": [15.0, 15.0]
    },
  ])

  shazam.anchor.set("body");
  shazam.setOffset(1.0, 38.0, -3.2).setRotation(0, 90.0, 0).setScale(15.0);
  shazam.mirror = false;

  utils.addCameraShake(renderer, 0.015, 1.5, "mhp:dyn/shazam_timer");
  var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
    shake.factor = entity.getData("mhp:dyn/shazam_timer") > 0.3 && entity.getData("mhp:dyn/shazam_timer") < 0.7
    return true;
  });
  shake.intensity = 0.0;
}

function initAnimations(renderer) {
  parent.initAnimations(renderer);
  renderer.removeCustomAnimation("basic.CHARGED_BEAM");
  renderer.removeCustomAnimation("basic.ENERGY_PROJ");
  addAnimationWithData(renderer, "basic.ENERGY_PROJ", "fiskheroes:dual_aiming", "fiskheroes:energy_projection_timer");


  utils.addFlightAnimation(renderer, "adam.FLIGHT", "fiskheroes:flight/default.anim.json");
  utils.addHoverAnimation(renderer, "adam.HOVER", "fiskheroes:flight/idle/default");
}

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.getData("mhp:dyn/shazam_timer") > 0.3 && entity.getData("mhp:dyn/shazam_timer") < 0.7) {
    shazam.render()
  } else if (entity.getUUID() != "f42e754f-158f-4293-8406-eaf8cb67fa79") {
  overlay.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
  overlay.render();
  }

 else if (entity.getUUID() == "f42e754f-158f-4293-8406-eaf8cb67fa79") {
    harley.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
    harley.render();
}
}