extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:ezio/ezio_layer1",
    "layer2": "mhp:ezio/ezio_layer2",
    "leg": "mhp:ezio/ezio_leg"
});

var utils = implement("fiskheroes:external/utils");

var leg_left, leg_right;

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

    addAnimationWithData(renderer, "ezio.CLIMB", "fiskheroes:crawl_wall", "mhp:dyn/climb_timer")
    .priority = 10;

   /*  addAnimationWithData(renderer, "ezio.VAULT", "mhp:vault_galahad", "mhp:dyn/vault_timer")
    .priority = 10; */

    addAnimation(renderer, "ezio.VAULT", "mhp:vault_galahad")
    .setData((entity, data) => {
        var range = 1.0; // Set the range to 1 block
        var yawRad = (Math.PI / 180) * entity.rotYaw();
        var offsetX = -Math.sin(yawRad);
        var offsetZ = Math.cos(yawRad);

        var posX = entity.posX();
        var posY = entity.posY();
        var posZ = entity.posZ();

        var frontFeetPosX = posX + offsetX * range;
        var frontFeetPosY = posY;
        var frontFeetPosZ = posZ + offsetZ * range;

        var world = entity.world();

        var isBlockInFrontFeet = world.blockAt(
            Math.floor(frontFeetPosX),
            Math.floor(frontFeetPosY),
            Math.floor(frontFeetPosZ)
        ).isSolid();

        data.load(entity.getData("mhp:dyn/vault_timer") > 0 && isBlockInFrontFeet);
    }).priority = 10;

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

}

function render(entity, renderLayer) {
if (renderLayer == "CHESTPLATE") {
    leg_left.render();
    leg_right.render();
}
}