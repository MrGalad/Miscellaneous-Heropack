extend("fiskheroes:hero_basic");
loadTextures({
  "layer1": "misc:blank",
  "base": "misc:eren/eren_yeager",
  "layer2": "misc:eren/eren_yeager_layer2",
  "arms": "misc:eren/eren_yeager_arms",
  "eyemarks": "misc:eren/eren_eyemarks",
  "titan": "misc:eren/eren_titan",
  "eyes": "misc:eren/eren_yeager_titan_eyes",
  "Ereneyes": "misc:powerplex/powerplex_light_eyes",
  "hardened": "misc:eren/eren_hardened_hands",
  "gear": "misc:eren/odm_gear",
  "blade": "misc:eren/odm_blade",
  "rope": "misc:master_chief/rope",
  "rope_end": "misc:master_chief/rope_end",
  "blank": "misc:blank",
  "spikes": "misc:eren/eren_spikes",
});
var utils = implement("fiskheroes:external/utils");
var overlay;
var arm1
var arm2
var titan
var hardened
var eyemarks
var Ereneyes

function init(renderer) {
  parent.init(renderer);
  renderer.setTexture((entity, renderLayer) => {
    if (!entity.is("DISPLAY") && entity.getData("misc:dyn/float_interp1") < 0.8) {
      return "base";
    } return "blank";
  });
  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initAnimations(renderer) {
  parent.initAnimations(renderer);
  renderer.removeCustomAnimation("basic.AIMING");
  addAnimation(renderer, "eren.BITE", "misc:bite")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("misc:dyn/float_interp"));
    }).priority = 8
  addAnimation(renderer, "eren.BLADE", "misc:eren_blade")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("misc:dyn/float_interp3"));
    }).priority = 7

  addAnimation(renderer, "eren.TITAN", "misc:eren_yeager_titan_animation")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("misc:dyn/float_interp2"));
    }).priority = -8

  addAnimation(renderer, "eren.PUNCH", "misc:dual_punch")
    .setData((entity, data) => {
      data.load(entity.isPunching() ? entity.getInterpolatedData("fiskheroes:blade_timer") : 0);
    }).priority = -8;

  addAnimation(renderer, "eren.RELEASE", "misc:eren_release")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("misc:dyn/release_timer"));
    }).priority = 10;
  /* addAnimation(renderer, "eren.SWING", "misc:odm_dive")
    .setData((entity, data) => {
      data.load(entity.getData("fiskheroes:web_swinging_timer") / 4);
    }).priority = -8; */

  //addAnimation(renderer, "eren.ARM", "misc:eren_zip")
  //  .setData((entity, data) => {
  //    data.load(entity.getInterpolatedData("fiskheroes:blade_timer") && entity.getInterpolatedData("misc:dyn/eren_boost_timer") > 0);
  //  }).setCondition(entity => /* entity.getData("misc:dyn/eren_boost_timer") > 0.2 && */ !entity.isPunching() && entity.getInterpolatedData("fiskheroes:blade_timer") /* && !entity.isSprinting()  *//* && !entity.getData("fiskheroes:moving") */ && entity.getInterpolatedData("misc:dyn/float_interp3") > 0.8 && !entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp1") < 0.1).priority = -8;

  addAnimationWithData(renderer, "ezio.SPRINT", "fiskheroes:speedster_sprint", "misc:dyn/sprinting").priority = -1;
  utils.addAnimationEvent(renderer, "WEBSWING_DEFAULT", "misc:odm_dive");
  addAnimationWithData(renderer, "spiderman.WEB_RAPPEL", "fiskheroes:web_rappel", "fiskheroes:web_rappel_timer")
    .priority = 5;
  utils.addAnimationEvent(renderer, "WEBSWING_DEFAULT", "misc:odm_dive");
  utils.addAnimationEvent(renderer, "WEBSWING_RIGHT", "misc:odm_dive");
  utils.addAnimationEvent(renderer, "WEBSWING_LEFT", "misc:odm_dive");
  utils.addAnimationEvent(renderer, "WEBSWING_TRICK_DEFAULT", [
    "fiskheroes:swing_roll",
    "fiskheroes:swing_roll2",
    "fiskheroes:swing_roll5"
  ]);
  utils.addAnimationEvent(renderer, "WEBSWING_TRICK_RIGHT", "fiskheroes:swing_rotate_right");
  utils.addAnimationEvent(renderer, "WEBSWING_TRICK_LEFT", "fiskheroes:swing_rotate_left");
  utils.addAnimationEvent(renderer, "WEBSWING_ZIP", "misc:odm_dive");
  utils.addAnimationEvent(renderer, "WEBSWING_DIVE", [
    /* "fiskheroes:swing_dive", */
    "fiskheroes:swing_dive2"
  ]);
}

function initEffects(renderer) {
  /*  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
     return 0.99999;
   });
 
   var armModel = renderer.createResource("MODEL", "misc:invincible_arm");
   armModel.texture.set("arms");
 
   arm1 = renderer.createEffect("fiskheroes:model").setModel(armModel);
   arm1.anchor.set("leftArm");
   arm1.setScale(1);
 
   arm2 = renderer.createEffect("fiskheroes:model").setModel(armModel);
   arm2.anchor.set("rightArm");
   arm2.setScale(1); */

  var bladeRight = renderer.createResource("MODEL", "misc:odm_blade_right");
  bladeRight.texture.set("blade");
  bladeRightEffect = renderer.createEffect("fiskheroes:model").setModel(bladeRight);
  bladeRightEffect.anchor.set("rightArm");

  var bladeLeft = renderer.createResource("MODEL", "misc:odm_blade");
  bladeLeft.texture.set("blade");
  bladeLeftEffect = renderer.createEffect("fiskheroes:model").setModel(bladeLeft);
  bladeLeftEffect.anchor.set("leftArm");

  var spikes = renderer.createResource("MODEL", "misc:spikes_new");
  spikes.bindAnimation("misc:eren_spikes").setData((entity, data) => {
    data.load(Math.min(1, entity.getInterpolatedData("fiskheroes:beam_charge") *2));
});
  spikes.texture.set("spikes");
  spikesEffect = renderer.createEffect("fiskheroes:model").setModel(spikes);
  /* spikesEffect.anchor.set("leftArm"); */

  var webs = renderer.bindProperty("fiskheroes:webs");
  webs.textureRope.set("rope", null);
  webs.textureRopeBase.set("rope_end", null);


  var gear = renderer.createResource("MODEL", "misc:odm_gear");
  gear.texture.set("gear");
  gearEffect = renderer.createEffect("fiskheroes:model").setModel(gear);

  utils.bindTrail(renderer, "misc:powerplex_flicker_beam").setCondition(entity => entity.getData("misc:dyn/float_interp") > 0.8 && entity.getData("misc:dyn/float_interp2") < 1)
  utils.bindTrail(renderer, "misc:powerplex_flicker").setCondition(entity => entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp") > 0.5 && entity.getData("misc:dyn/float_interp1") < 1)
  utils.bindParticles(renderer, "misc:shazam").setCondition((entity => entity.getData("misc:dyn/float_interp1") > 0.2 && entity.getData("misc:dyn/float_interp1") < 1));
  utils.bindParticles(renderer, "misc:odm_particles").setCondition((entity => entity.getData("misc:dyn/eren_boost_timer") > 0));
  utils.bindParticles(renderer, "misc:titan_release").setCondition((entity => entity.getData("misc:dyn/release")));
  utils.bindParticles(renderer, "misc:eren_regen").setCondition((entity =>(entity.getData("misc:dyn/detransformation_timer") > 0) || (entity.getData("misc:dyn/regen_timer") > 0) || (entity.getData("misc:dyn/charge_timer") > 0.9) && !entity.getHealth() == 20 ));
  utils.bindParticles(renderer, "misc:eren_bite").setCondition((entity => entity.getData("misc:dyn/float_interp") > 0.4 && entity.getData("misc:dyn/float_interp") < 0.7));

 // Core - White Hot Center
 var ff1 = renderer.bindProperty("fiskheroes:forcefield");
 ff1.color.set(0xFFFFFF); // White
 ff1.setOffset(0.0, 6.0, 0.0);
 ff1.setCondition(function (entity) {
     var interp = entity.getInterpolatedData("misc:dyn/float_interp1");
     var pulse = Math.sin(Date.now() * 0.015) * 0.15;
     var scale = interp * 1.0 + pulse;
 
     ff1.opacity = Math.max(interp < 1 && interp > 0 ? 0.7 : 0.0);
     ff1.setScale(scale);
     return true;
 });
 
 // Middle - Orange Glow
 var ff2 = renderer.bindProperty("fiskheroes:forcefield");
 ff2.color.set(0xFF9900); // Deep Orange
 ff2.setOffset(0.0, 6.0, 0.0);
 ff2.setCondition(function (entity) {
     var interp = entity.getInterpolatedData("misc:dyn/float_interp1");
     var pulse = Math.sin(Date.now() * 0.02 + 1) * 0.25;
     var scale = interp * 1.8 + pulse;
 
     ff2.opacity = Math.max(interp < 1 && interp > 0 ? 0.5 : 0.0);
     ff2.setScale(scale);
     return true;
 });
 
 // Outer - Yellow Burst
 var ff3 = renderer.bindProperty("fiskheroes:forcefield");
 ff3.color.set(0xFFD700); // Bright Gold
 ff3.setOffset(0.0, 6.0, 0.0);
 ff3.setCondition(function (entity) {
     var interp = entity.getInterpolatedData("misc:dyn/float_interp1");
     var pulse = Math.sin(Date.now() * 0.025 + 2) * 0.35;
     var scale = interp * 2.6 + pulse;
 
     ff3.opacity = Math.max(interp < 1 && interp > 0 ? 0.4 : 0.0);
     ff3.setScale(scale);
     return true;
 });

utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:invis", "head", 0xAA00AA, [{
  "firstPerson": [0, 0, 0],
  "offset": [0, 0, 0],
  "size": [0, 0]
}
]);

  var beam_1 = renderer.createResource("BEAM_RENDERER", "misc:shazam");
  var color = 0xFFD700;

  shazam = utils.createLines(renderer, beam_1, color, [
    {
      "start": [0, -80, 0],
      "end": [0, -5, 0],
      "size": [5.0, 5.0]
    },
  ])

  shazam.anchor.set("body");
  shazam.setOffset(1.5, 97.0, -4.5).setRotation(0, 90.0, 0).setScale(15.0);
  shazam.mirror = false;

  utils.addCameraShake(renderer, 0.015, 1.5, "misc:dyn/float_interp1");
  var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
    shake.factor = entity.getData("misc:dyn/float_interp1") > 0 && entity.getData("misc:dyn/float_interp2") < 1
    return true;
  });
  shake.intensity = 0.0;

  utils.addCameraShake(renderer, 0.3, 0.6, "misc:dyn/boolean" && "misc:dyn/sprinting");
  utils.addCameraShake(renderer, 0.3, 0.6, "fiskheroes:beam_charging");
  

  /* overlay = renderer.createEffect("fiskheroes:overlay");
  overlay.texture.set("arms"); */

  layer2 = renderer.createEffect("fiskheroes:overlay");
  layer2.texture.set("layer2");

  titan = renderer.createEffect("fiskheroes:overlay");
  titan.texture.set("titan", "eyes");

  hardened = renderer.createEffect("fiskheroes:overlay");
  hardened.texture.set("hardened");

  eyemarks = renderer.createEffect("fiskheroes:overlay");
  eyemarks.texture.set("eyemarks");

  Ereneyes = renderer.createEffect("fiskheroes:overlay");
  Ereneyes.texture.set(null, "Ereneyes");
}

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.getData("misc:dyn/float_interp1") > 0 && entity.getData("misc:dyn/float_interp1") < 1) {
    shazam.render()
  }/*  if (isFirstPersonArm && entity.getData("misc:dyn/float_interp1") < 0.1) {
    overlay.render()
  }  */if (renderLayer == "LEGGINGS" && entity.getData("misc:dyn/float_interp") < 0.7) {
    layer2.render();
  } if (entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp") > 0.5 && entity.getData("misc:dyn/float_interp1") < 1) {
    Ereneyes.render();
  }

  if (entity.getData("misc:dyn/float_interp3") > 0.4 && entity.getData("misc:dyn/float_interp") < 0.1) {
    bladeRightEffect.render()
    bladeLeftEffect.render()
    bladeRightEffect.setOffset(-5, -3.0, -1)
    bladeLeftEffect.setOffset(5, -3.0, -1)
  } if (entity.getData("misc:dyn/float_interp1") < 0.1) {
    gearEffect.render()
  }

  if (entity.getData("fiskheroes:beam_charge") != 0) {
   /*  spikesEffect.setOffset(0, 15, 0); */
    /* spikesEffect.setScale(7); */
    spikesEffect.render();
}
  //arm1.setOffset(4.5, -2.4, 0)
  //arm2.setOffset(7.5, -2.4, 0)
  //if (entity.getInterpolatedData("misc:dyn/eren_boost_timer") > 0 && !entity.isPunching() && entity.getInterpolatedData("fiskheroes:blade_timer") && entity.getInterpolatedData("misc:dyn/float_interp3") > 0.8 && !entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp1") < 0.1) {
  //  arm1.setOffset(4.5, -6.4, 0)
  //  arm2.setOffset(7.5, -6.4, 0)
  //} else {
  //  bladeRightEffect.setOffset(-5, -3.0, -1)
  //  bladeLeftEffect.setOffset(5, -3.0, -1)
  //}

  titan.opacity = entity.getData("misc:dyn/float_interp1") > 0.6
  titan.render()
  hardened.opacity = entity.getData("misc:dyn/hardened_timer")
  hardened.render()
  eyemarks.opacity = (!entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp1") < 0.1) ? entity.getData("misc:dyn/charge_timer") * 0.5 : 0;
  eyemarks.render()

  /*   if (!isFirstPersonArm && entity.getData("misc:dyn/float_interp1") < 0.1) {
      arm1.render()
      arm2.render()
    } */
}