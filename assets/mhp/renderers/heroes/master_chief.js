extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:master_chief/master_chief_layer1",
    "layer2": "mhp:master_chief/master_chief_layer2",
    "blade": "mhp:master_chief/master_chief_blade",
    "helmet": "mhp:master_chief/master_chief_helmet_new",
    "nohelm": "mhp:master_chief/master_chief_nohelm",
    "grapple": "mhp:master_chief/grapple",
    "rope": "mhp:master_chief/rope",
    "rope_end": "mhp:master_chief/rope_end",
    "mac": "mhp:master_chief/mac"
});
var utils = implement("fiskheroes:external/utils");
var grapple
var helm
var mac
/* 
function init(renderer) {
    parent.init(renderer);
    
    renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "LEGGINGS") {
            return "layer2";
        } else {
            return entity.getInterpolatedData("fiskheroes:mask_open_timer2") >= 0.5 ? "nohelm" : "layer1";
        }
    })
} */

function initEffects(renderer) {
  /*   helm = renderer.createResource("MODEL", "mhp:MasterChiefHelmet");
    helm.bindAnimation("mhp:helm").setData((entity, data) => {
        var f = entity.getInterpolatedData("fiskheroes:mask_open_timer2");
        data.load(f < 1 ? f : 0);
    });
    helm.texture.set("helmet");
    helm = renderer.createEffect("fiskheroes:model").setModel(helm);
    helm.setScale(1.1)
    helm.anchor.set("head");
    helm.mirror = false;
 
    mac = renderer.createEffect("fiskheroes:model");
    mac.setModel(utils.createModel(renderer, "fisktag:MA5C", "mac"));
    mac.anchor.set("body");
    mac.setOffset(12, 2, 3);
    mac.setRotation(270, 225, 90);
    mac.setScale(0.8); */

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.7,"offset": [7, 1, 5.0], "rotation": [400.0, 90.0, 0.0] }
    ]).slotIndex = 0;

    var webs = renderer.bindProperty("fiskheroes:webs");
    //webs.setOffset(-1.5, 11.0, 0.0);
    //webs.anchor.set("leftArm");
    webs.textureRope.set("rope", null);
    webs.textureRopeBase.set("rope_end", null);

   /*  grapple = renderer.createResource("MODEL", "mhp:grapple");
    grapple.texture.set("grapple");
	grapple_arm = renderer.createEffect("fiskheroes:model").setModel(grapple);
	grapple_arm.anchor.set("rightArm");
    grapple_arm.setOffset(-1.5, 11.0, 0.0).setRotation(90, 0, 0.0)
 */
    blade = renderer.createEffect("fiskheroes:shield");
    blade.texture.set(null, "blade");
    blade.anchor.set("rightArm");
    blade.setOffset(1.5, 11.0, 0.0);
    blade.large = true;

    night_v = renderer.bindProperty("fiskheroes:night_vision");
    night_v.setCondition(entity => entity.getData("mhp:dyn/nv_timer") > 0.1 && entity.getInterpolatedData("fiskheroes:mask_open_timer2") < 0.1 );
    night_v.firstPersonOnly = false;

      var beam = 0xFF6500;
     // Aura Head
     aura_head = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.1, 0.0],
         "size": [8.1, 8.1]
     }
     ]);
     aura_head.anchor.set("head");
     aura_head.setOffset(0.0, 0.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 8.0, 16.0);
     aura_head.mirror = false;
 
     aura_head2 = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.1, 0.0],
         "size": [8.1, 8.1]
     }
     ]);
     aura_head2.anchor.set("head");
     aura_head2.setOffset(0.0, -4.0, 4.0).setRotation(90, 0, 0.0).setScale(16.0, 8.0, 16.0);
     aura_head2.mirror = false;
 
     //Aura Body
     aura_body = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.0, 0.0],
         "size": [4.0, 8.0]
     }
     ]);
     aura_body.anchor.set("body");
     aura_body.setOffset(0.0, 12.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
     aura_body.mirror = false;
 
     //Aura Arms
     aura_arms = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.0, 0.0],
         "size": [4.0, 4.0]
     }
     ]);
     aura_arms.anchor.set("rightArm");
     aura_arms.setOffset(1.0, 10.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
     aura_arms.mirror = true;
 
     aura_arms2 = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.0, 0.0],
         "size": [12.0, 4.0]
     }
     ]);
     aura_arms2.anchor.set("leftArm");
     aura_arms2.setOffset(1.0, 4.0, 2.0).setRotation(90, 0, 0.0).setScale(16.0, 4.0, 16.0);
     aura_arms2.mirror = false;
 
     //Aura Legs
     aura_legs = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.0, 0.0],
         "size": [4.0, 4.0]
     }
     ]);
     aura_legs.anchor.set("leftLeg");
     aura_legs.setOffset(0.0, 12.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
     aura_legs.mirror = true;
 
     aura_legs2 = utils.createLines(renderer, "mhp:aura", beam, [{
         "start": [0.0, 0.0, 0.0],
         "end": [0.0, -1.0, 0.0],
         "size": [12.0, 4.0]
     }
     ]);
     aura_legs2.anchor.set("rightLeg");
     aura_legs2.setOffset(0.0, 6.0, 2.0).setRotation(90, 0, 0.0).setScale(16.0, 4.0, 16.0);
     aura_legs2.mirror = true;
}


function render(entity, renderLayer, isFirstPersonArm) {
 var glow = entity.getInterpolatedData("fiskheroes:shield_blocking_timer");

 if (glow && entity.getData("fiskheroes:shield_damage") > 1) { 

        aura_head.render();
        aura_head2.render();
        aura_body.render();
        aura_arms.render();
        aura_arms2.render();
        aura_legs.render();
        aura_legs2.render();

    } /* else if (entity.getHeldItem().nbt().getString("WeaponType") != "fisktag:ma5c"){
        mac.render();
    } */
  /* aura_head.opacity = glow;
  aura_head.render();
  aura_head2.opacity = glow;
  aura_head2.render()

  aura_body.opacity = glow;
  aura_body.render();

  aura_arms.opacity = glow;
  aura_arms.render();
  aura_arms2.opacity = glow;
  aura_arms2.render();

  aura_legs.opacity = glow;
  aura_legs.render();
  aura_legs2.opacity = glow;
  aura_legs2.render(); */

   //grapple_arm.render()
   //grapple_arm.setOffset(0, -13, 4.0).setRotation(0, 0.5, -0.22);
   //webs.render()

  blade.unfold = entity.getInterpolatedData("fiskheroes:blade_timer");
  blade.render();

 /*  if(entity.getData("fiskheroes:mask_open_timer2") < 0.80){ 
  helm.render();
  } */
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");  

  /*   addAnimation(renderer, "chief.HELM", "mhp:helm")
    .setData((entity, data) => {
        data.load(entity.getInterpolatedData("fiskheroes:mask_open_timer2"));
    }).priority = 1; */

    addAnimation(renderer, "chief.HELM", "mhp:helm")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("fiskheroes:mask_open_timer2");
            data.load(f < 1 ? f : 0);
        });
}