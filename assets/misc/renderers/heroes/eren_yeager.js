extend("fiskheroes:hero_basic");
loadTextures({
  "layer1": "misc:eren/eren_yeager_noarm",
  "layer2": "misc:eren/eren_yeager_layer2",
  "arms": "misc:eren/eren_yeager_arms",
  "titan": "misc:eren/eren_titan",
  "eyes": "misc:eren/eren_yeager_titan_eyes",
  "gear": "misc:eren/odm_gear",
  "blade": "misc:eren/odm_blade",
  "rope": "misc:master_chief/rope",
  "rope_end": "misc:master_chief/rope_end",
});
var utils = implement("fiskheroes:external/utils");
var overlay;
var arm1
var arm2

function init(renderer) {
  parent.init(renderer);
  renderer.setTexture((entity, renderLayer) => {
    if (!entity.is("DISPLAY") && entity.getData("misc:dyn/float_interp1") > 0.1) {
      return "titan";
    } return "layer1";
  });

  /*  renderer.setLights((entity, renderLayer) => {
     if (!entity.is("DISPLAY") && entity.getData("misc:dyn/float_interp1") > 0.1) {
       return "eyes";
     } return renderLayer == "LEGGINGS" ? null : null
   }) */

  renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
  /*     renderer.fixHatLayer("CHESTPLATE"); */

}

function initAnimations(renderer) {
  parent.initAnimations(renderer);
  addAnimation(renderer, "eren.BITE", "misc:bite")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("misc:dyn/float_interp"));
    }).priority = -8
  addAnimation(renderer, "eren.BLADE", "misc:eren_blade")
    .setData((entity, data) => {
      data.load(/* entity.getData("misc:dyn/float_interp3") == 0 ? 0 : */ entity.getInterpolatedData("misc:dyn/float_interp3"));
    }).priority = -8

  addAnimation(renderer, "eren.TITAN", "misc:eren_yeager_titan_animation")
    .setData((entity, data) => {
      data.load(/* entity.getData("misc:dyn/float_interp2") == 0 ? 0 :  */entity.getInterpolatedData("misc:dyn/float_interp2"));
    }).priority = -8

  addAnimation(renderer, "eren.PUNCH", "misc:dual_punch")
    .setData((entity, data) => {
      data.load(entity.isPunching() ? entity.getInterpolatedData("fiskheroes:blade_timer") : 0);
    }).priority = -8;

    addAnimation(renderer, "eren.ARM", "misc:eren_zip")
    .setData((entity, data) => {
      data.load(entity.getInterpolatedData("fiskheroes:blade_timer"));
    }).setCondition(entity => !entity.isPunching() && entity.getInterpolatedData("fiskheroes:blade_timer") && !entity.getData("fiskheroes:moving") && entity.getInterpolatedData("misc:dyn/float_interp3") > 0.7 && entity.getData("misc:dyn/float_interp1") < 0.1).priority = -8;

    addAnimationWithData(renderer, "ezio.SPRINT", "fiskheroes:speedster_sprint", "misc:dyn/sprinting").priority = -1;
    utils.addAnimationEvent(renderer, "WEBSWING_DEFAULT", "misc:odm_swing");
    addAnimationWithData(renderer, "spiderman.WEB_RAPPEL", "fiskheroes:web_rappel", "fiskheroes:web_rappel_timer")
    .priority = 5;
    utils.addAnimationEvent(renderer, "WEBSWING_DEFAULT", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBSWING_RIGHT", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBSWING_LEFT", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBSWING_TRICK_DEFAULT", [
        "misc:odm_swing",
        "misc:odm_swing",
        "misc:odm_swing"
    ]);
    utils.addAnimationEvent(renderer, "WEBSWING_TRICK_RIGHT", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBSWING_TRICK_LEFT", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBSWING_ZIP", "misc:odm_swing");
    utils.addAnimationEvent(renderer, "WEBswing_roll", [
        "misc:odm_swing",
        "misc:odm_swing"
    ]);
    utils.addAnimationEvent(renderer, "WEBSWING_LEAP", "misc:odm_swing");
}

function initEffects(renderer) {
  renderer.bindProperty("fiskheroes:opacity").setOpacity((entity, renderLayer) => {
    return 0.99999;
});
  var armModel = renderer.createResource("MODEL", "misc:invincible_arm");
  armModel.texture.set("arms");

  arm1 = renderer.createEffect("fiskheroes:model").setModel(armModel);
  arm1.anchor.set("leftArm");
  arm1.setScale(1);
  /* arm1.setOffset(4.5, -6.4, 0) */

  arm2 = renderer.createEffect("fiskheroes:model").setModel(armModel);
  arm2.anchor.set("rightArm");
  arm2.setScale(1);
  /* arm2.setOffset(7.5, -6.4, 0) */



  var bladeRight = renderer.createResource("MODEL", "misc:odm_blade_right");
  bladeRight.texture.set("blade");
  bladeRightEffect = renderer.createEffect("fiskheroes:model").setModel(bladeRight);
  bladeRightEffect.anchor.set("rightArm");

  var bladeLeft = renderer.createResource("MODEL", "misc:odm_blade");
  bladeLeft.texture.set("blade");
  bladeLeftEffect = renderer.createEffect("fiskheroes:model").setModel(bladeLeft);
  bladeLeftEffect.anchor.set("leftArm");

  var webs = renderer.bindProperty("fiskheroes:webs");
  webs.textureRope.set("rope", null);
  webs.textureRopeBase.set("rope_end", null);


  var gear = renderer.createResource("MODEL", "misc:odm_gear");
  gear.texture.set("gear");
  gearEffect = renderer.createEffect("fiskheroes:model").setModel(gear);
  /* gearEffect.anchor.set("gear");
  gearEffect.setScale(1.4);
 */
  utils.bindTrail(renderer, "misc:powerplex_flicker_beam").setCondition(entity => entity.getData("misc:dyn/float_interp") > 0.8 && entity.getData("misc:dyn/float_interp1") < 1)
  utils.bindTrail(renderer, "misc:powerplex_flicker").setCondition(entity => entity.getData("misc:dyn/float_interp") > 0.8 && entity.getData("misc:dyn/float_interp1") < 1)
  utils.bindParticles(renderer, "misc:shazam").setCondition((entity => entity.getData("misc:dyn/float_interp1") > 0.2 && entity.getData("misc:dyn/float_interp1") < 1));
  utils.bindParticles(renderer, "misc:odm_particles").setCondition((entity =>/*  entity.isSprinting() &&  */entity.getData("fiskheroes:web_swinging")));

  var forcefield = renderer.bindProperty("fiskheroes:forcefield");
  forcefield.color.set(0xFFD700);
  forcefield.setOffset(0.0, 6.0, 0.0)
  forcefield.setCondition(entity => {
    forcefield.opacity = Math.max((entity.getInterpolatedData("misc:dyn/float_interp1") < 1 && entity.getInterpolatedData("misc:dyn/float_interp1") > 0.2));
    forcefield.setScale(entity.getData("misc:dyn/float_interp1") * 2);
    return true;
  });

  var beam_1 = renderer.createResource("BEAM_RENDERER", "misc:shazam");
  var color = 0xFFD700;

  shazam = utils.createLines(renderer, beam_1, color, [
    {
      "start": [0, -80, 0],
      "end": [0, -5, 0],
      "size": [20.0, 20.0]
    },
  ])

  shazam.anchor.set("body");
  shazam.setOffset(1.5, 97.0, -4.5).setRotation(0, 90.0, 0).setScale(15.0);
  shazam.mirror = false;

  utils.addCameraShake(renderer, 0.015, 1.5, "misc:dyn/float_interp1");
  var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
    shake.factor = entity.getData("misc:dyn/float_interp1") > 0.1 && entity.getData("misc:dyn/float_interp1") < 1
    return true;
  });
  shake.intensity = 0.0;

  overlay = renderer.createEffect("fiskheroes:overlay");
  overlay.texture.set(null, "eyes");
  layer2 = renderer.createEffect("fiskheroes:overlay");
  layer2.texture.set("layer2");
}

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.getData("misc:dyn/float_interp1") > 0.1 && entity.getData("misc:dyn/float_interp1") < 1) {
    shazam.render()
  } if (!entity.is("DISPLAY") && entity.getData("misc:dyn/float_interp1") > 0.1) {
    overlay.render()
  } if (renderLayer == "LEGGINGS" && entity.getData("misc:dyn/float_interp1") < 0.1) {
    layer2.render();
  }

  if (entity.getData("misc:dyn/float_interp3") > 0.4 && entity.getData("misc:dyn/float_interp1") < 0.1) {
    bladeRightEffect.render()
    bladeRightEffect.setOffset(-5, -6.0, -1)
    bladeLeftEffect.render()
    bladeLeftEffect.setOffset(5, -6.0, -1)
  } if (entity.getData("misc:dyn/float_interp1") < 0.1) {
    gearEffect.render()
  }
  arm1.setOffset(4.5, -2.4, 0)
  arm2.setOffset(7.5, -2.4, 0)
  if (!entity.isPunching() && entity.getInterpolatedData("fiskheroes:blade_timer") && !entity.getData("fiskheroes:moving") && entity.getInterpolatedData("misc:dyn/float_interp3") > 0.7 && entity.getData("misc:dyn/float_interp1") < 0.1) {
    arm1.setOffset(4.5, -6.4, 0)
    arm2.setOffset(7.5, -6.4, 0)
  }
   
  
  arm1.render()
  arm2.render()
}