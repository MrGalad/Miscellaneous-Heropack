//extend("mhp:black_adam");
//loadTextures({
//    "layer1": "mhp:adam/adam_suit_cape",
//    "layer2": "mhp:adam/adam_suit_cape",
//    "lights": "mhp:adam/adam_light",
//    "charge": "mhp:adam/adam_lightning",
//    "harley": "mhp:adam/1harleyeyes",
//    "cape": "mhp:adam/adam_cape",
//    "full": "mhp:adam/adam_suit_cape",
//    "blank": "mhp:adam/adam_robes"
//});
//var overlay;
//var harley
//var utils = implement("fiskheroes:external/utils");
//var capes = implement("fiskheroes:external/capes");
//
//var cape;
//function init(renderer) {
//    parent.init(renderer);
//    renderer.setItemIcons("%s_0", "black_adam_1", "black_adam_2", "black_adam_3");
//
//    renderer.setTexture((entity, renderLayer) => {
//        if (!entity.is("DISPLAY") && entity.getData("mhp:dyn/shazam_timer") >= 0.5) {
//            return "full";
//        }
//        return renderLayer == "LEGGINGS" ? "blank" : "blank";
//    });
//    renderer.setLights((entity, renderLayer) => {
//        if (!entity.is("DISPLAY") && entity.getData("mhp:dyn/shazam_timer") >= 0.5) {
//            return "lights";
//        }
//        return renderLayer == "LEGGINGS" ? null : null;
//    });
//    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
//    renderer.fixHatLayer("CHESTPLATE");
//}
//
//function initEffects(renderer) {
//    var physics = renderer.createResource("CAPE_PHYSICS", null);
//    physics.weight = 0.9;
//    physics.maxFlare = 0.5;
//    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
//    cape.effect.texture.set("cape");
//
//    utils.bindTrail(renderer, "mhp:shazam_flicker").setCondition(entity => entity.getData("fiskheroes:beam_charging") > 0)
//    overlay = renderer.createEffect("fiskheroes:overlay");
//    overlay.texture.set(null, "charge");
//
//    harley = renderer.createEffect("fiskheroes:overlay");
//    harley.texture.set(null, "harley");
//
//    var beam = renderer.createResource("BEAM_RENDERER", "mhp:charged_beam");
//    utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "rightArm", 0x52E6FB, [
//        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 9.0, 0.0], "size": [1.5, 1.5] },
//        { "firstPerson": [3.75, 3.0, -8.0], "offset": [0.5, 9.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
//    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
//    utils.bindBeam(renderer, "fiskheroes:charged_beam", null, "body", null, []);
//
//    charge = renderer.bindProperty("fiskheroes:trail");
//    charge.setTrail(renderer.createResource("TRAIL", "mhp:charge"));
//    charge.setCondition(entity => entity.getData("fiskheroes:beam_charging"));
//
//    release = renderer.bindProperty("fiskheroes:trail");
//    release.setTrail(renderer.createResource("TRAIL", "mhp:release"));
//    release.setCondition(entity => entity.getData("fiskheroes:beam_charge") > 0.9);
//
//    /*  utils.bindParticles(renderer, "mhp:landing_particles").setCondition(
//         (entity => entity.getData("mhp:dyn/shazam_timer") > 0 )); */
//    utils.bindParticles(renderer, "mhp:shazam").setCondition((entity => entity.getData("mhp:dyn/shazam_timer") > 0.4 && entity.getData("mhp:dyn/shazam_timer") < 0.7));
//
//    var beam_1 = renderer.createResource("BEAM_RENDERER", "mhp:shazam");
//    var color = 0x80F1E7;
//
//    shazam = utils.createLines(renderer, beam_1, color, [
//        {
//          "start": [0, -80, 0],
//          "end": [0, -5, 0],
//          "size": [20.0, 20.0]
//        },
//      ])
//    
//    shazam.anchor.set("body");
//    shazam.setOffset(1.5, 97.0, -4.5).setRotation(0, 90.0, 0).setScale(15.0);
//    shazam.mirror = false;
//
//    utils.addCameraShake(renderer, 0.015, 1.5, "mhp:dyn/shazam_timer");
//    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
//        shake.factor = entity.getData("mhp:dyn/shazam_timer") > 0.4 && entity.getData("mhp:dyn/shazam_timer") < 0.7
//        return true;
//    });
//    shake.intensity = 0.0;
//}
//
//function render(entity, renderLayer, isFirstPersonArm) {
//    if (entity.getData("mhp:dyn/shazam_timer") > 0.4 && entity.getData("mhp:dyn/shazam_timer") < 0.7) {
//        shazam.render()
//    }
//    else if (entity.getUUID() != "f42e754f-158f-4293-8406-eaf8cb67fa79") {
//        overlay.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
//        overlay.render();
//    }
//    else if (entity.getUUID() == "f42e754f-158f-4293-8406-eaf8cb67fa79") {
//        harley.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
//        harley.render();
//    } if (!isFirstPersonArm && renderLayer == "CHESTPLATE" && !entity.is("DISPLAY") && entity.getData("mhp:dyn/shazam_timer") >= 0.5) {
//        cape.render(entity);
//    } 
//}
extend("fiskheroes:hero_basic");
loadTextures({
  "layer1": "hhp:super_layer1",
  "layer2": "hhp:super_layer2",
  "cape":   "hhp:super_cape",
  "beam": "hhp:super_eyes",
  "harley": "hhp:harley_eyes"
  
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var overlay;
var harley;
var cape;

function init(renderer) {
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    var prop = renderer.bindProperty("fiskheroes:trail");
    prop.setCondition(entity => entity.getData("fiskheroes:speeding"));
  utils.addCameraShake(renderer, 0.015, 1.5, "hhp:dyn/super_timer");
  var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
    shake.factor = entity.getData("hhp:dyn/super_timer") > 0.3 && entity.getData("hhp:dyn/super_timer") < 0.7
    return true;
  });
  shake.intensity = 0.3;   
  
  utils.bindParticles(renderer, "hhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/superhero_landing_timer") == 1)
  
  overlay = renderer.createEffect("fiskheroes:overlay");
  overlay.texture.set(null, "beam");
  harley = renderer.createEffect("fiskheroes:overlay");
  harley.texture.set(null, "harley");
  
  var physics = renderer.createResource("CAPE_PHYSICS", null);
  physics.weight = 0.9;
  physics.maxFlare = 0.5;
  cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
  cape.effect.texture.set("cape");
  
  utils.bindParticles(renderer, "hhp:landing_particles").setCondition(entity => entity.getData("fiskheroes:dyn/flight_super_boost") == 1) ;
  
  utils.bindBeam(renderer, "fiskheroes:heat_vision", "hhp:superbeams", "head", 0x8a120a, [
    { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.2, -3.3, -4.0], "size": [1.0, 0.5] },
    { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-2.2, -3.3, -4.0], "size": [1.0, 0.5] }
  ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
}


function initAnimations(renderer) {
    parent.initAnimations(renderer)
    
    utils.addHoverAnimation(renderer, "super.HOVER", "fiskheroes:flight/idle/default");
    utils.addFlightAnimationWithLanding(renderer, "super.FLIGHT", "hhp:flight/default_brit.anim.json");
    
    var anim = renderer.createResource("ANIMATION", "fiskheroes:speedster_sprint");
    anim.setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:dyn/speed_sprint_timer")));
    renderer.addCustomAnimation("speedster.SPRINT", anim);    
    addAnimationWithData(renderer, "super.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
    .priority = -8;
  }
  

function render(entity, renderLayer, isFirstPersonArm) {
  if (entity.getUUID() != "f42e754f-158f-4293-8406-eaf8cb67fa79") {
    overlay.opacity = entity.getInterpolatedData("fiskheroes:heat_vision_timer");
    overlay.render();
  } else if (entity.getUUID() == "f42e754f-158f-4293-8406-eaf8cb67fa79") {
    harley.opacity = entity.getInterpolatedData("fiskheroes:heat_vision_timer");
    harley.render();
    
  }  if (renderLayer == "CHESTPLATE") {
    cape.render(entity);
  }
  
}