extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:ezio/ezio_layer1",
    "layer2": "mhp:ezio/ezio_layer2",
    "leg": "mhp:ezio/ezio_leg",
    "blade": "mhp:ezio/ezio_blade"
});

var utils = implement("fiskheroes:external/utils");

var leg_left, leg_right, blade, bladeLeft;

function init(renderer) {
    parent.init(renderer);
    
   renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "ezio.LAND", "mhp:roll_galahad") 
    .setData((entity, data) => {
    data.load(entity.getData("mhp:dyn/roll") ? entity.getInterpolatedData("mhp:dyn/roll_timer") : 0);
}).priority = 0;
    /* addAnimationWithData(renderer, "ezio.LAND", "mhp:roll_galahad", "fiskheroes:dyn/superhero_landing_timer")
    .priority = -8; */

    addAnimationWithData(renderer, "ezio.LEAP", "mhp:leap_galahad", "mhp:dyn/float_interp")
    .priority = 10;

    addAnimationWithData(renderer, "ezio.SNEAK", "mhp:ezio_crouch", "mhp:dyn/sneaking_timer")
    .priority = 10;

    /* addAnimationWithData(renderer, "ezio.CLIMB", "fiskheroes:crawl_wall", "mhp:dyn/climb_timer")
    .priority = 10; */

   /*  addAnimationWithData(renderer, "ezio.VAULT", "mhp:vault_galahad", "mhp:dyn/vault_timer")
    .priority = 10; */

	addAnimationWithData(renderer, "ezio.BLADE", "mhp:ezio_arms", "fiskheroes:blade_timer");

   /*  addAnimation(renderer, "ezio.VAULT", "mhp:vault_galahad")
    .setData((entity, data) => {
       var data11 = entity.getInterpolatedData("mhp:dyn/vault_timer")
       var data1 = Math.max(data11 - 0.2) * 1.2

        data.load(0, (entity.getInterpolatedData("mhp:dyn/vault_timer") - 0.25));
    }).priority = 10; */

  /*   addAnimationWithData(renderer, "ezio.SLIDE", "mhp:slide_galahad", "mhp:dyn/slide_timer")
    .priority = -8;
 */
    addAnimationWithData(renderer, "ezio.SPRINT", "fiskheroes:speedster_sprint", "mhp:dyn/sprinting").priority = -1;
    addAnimation(renderer, "ezio.SLIDE", "mhp:slide_galahad") 
    .setData((entity, data) => {
    data.load(entity.getData("mhp:dyn/slide") ? entity.getInterpolatedData("mhp:dyn/slide_timer") : 0);
}).priority = 0;
}

function initEffects(renderer) {
    
    leg_left = renderer.createEffect("fiskheroes:model");
    leg_left.setModel(utils.createModel(renderer, "mhp:ezio_leg_left", "leg"));
    leg_left.anchor.set("leftLeg");
    leg_left.setScale(1);
    leg_left.setOffset(0, 0, 0);
    leg_left.setRotation(0, 0, 0)

    leg_right = renderer.createEffect("fiskheroes:model");
    leg_right.setModel(utils.createModel(renderer, "mhp:ezio_leg_right", "leg"));
    leg_right.anchor.set("rightLeg");
    leg_right.setScale(1);
    leg_right.setOffset(0, 0, 0);
    leg_right.setRotation(0, 0, 0)

    var bladeModel = renderer.createResource("MODEL", "mhp:ezio_blade");
    bladeModel.bindAnimation("mhp:blade").setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:blade_timer"));
    });
    bladeModel.texture.set("blade");
    blade = renderer.createEffect("fiskheroes:model").setModel(bladeModel);
    blade.anchor.set("rightArm");
    blade.setScale(1);
    blade.setOffset(0, 0, 0);
    blade.setRotation(0, 0, 0)
    blade.mirror = true


}

function render(entity, renderLayer) {
if (renderLayer == "CHESTPLATE") {
    leg_left.render();
    leg_right.render();
    blade.render();
}
}