extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:eren/eren_yeager",
    "layer2": "misc:eren/eren_yeager",
    "titan": "misc:eren/eren_titan",
    "gear": "misc:eren/odm_gear",
    "blade": "misc:eren/odm_blade"
});
var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
       if (!entity.is("DISPLAY") && entity.getData("misc:dyn/float_interp1") > 0.1) {
            return "titan";
        } return "layer1";
    });
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
/*     renderer.fixHatLayer("CHESTPLATE"); */

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "eren.BITE", "misc:bite") 
    .setData((entity, data) => {
    data.load(entity.getInterpolatedData("misc:dyn/float_interp"));
})
}

function initEffects(renderer) {
    utils.bindTrail(renderer, "misc:powerplex_flicker_beam").setCondition(entity => entity.getData("misc:dyn/float_interp1") > 0.3  && entity.getData("misc:dyn/float_interp1") < 1)
    utils.bindTrail(renderer, "misc:powerplex_flicker").setCondition(entity => entity.getData("misc:dyn/float_interp1") > 0.8 && entity.getData("misc:dyn/float_interp1") < 1)
    utils.bindParticles(renderer, "misc:shazam").setCondition((entity => entity.getData("misc:dyn/float_interp1") > 0.2 && entity.getData("misc:dyn/float_interp1") < 1));
  
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
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (entity.getData("misc:dyn/float_interp1") > 0.1 && entity.getData("misc:dyn/float_interp1") < 1) {
      shazam.render()
    }
}