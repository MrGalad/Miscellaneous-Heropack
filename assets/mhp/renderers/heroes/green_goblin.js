extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:goblin/green_goblin_layer1",
    "layer2": "mhp:goblin/green_goblin_layer2",
    "glider": "mhp:goblin/goblin_glider_texture"
});

var utils = implement("fiskheroes:external/utils");
var cancelAnimations = false;


function initEffects(renderer) {
    var model = renderer.createResource("MODEL", "mhp:goblin/goblin_glider");
    model.bindAnimation("mhp:goblin/goblin_jump_glider").setData((entity, data) => {
        if (cancelAnimations) {
            data.load(0, (entity.getInterpolatedData("fiskheroes:flight_timer") > 0))
            return;
        }
    
    });
    model.texture.set("glider");
    glider = renderer.createEffect("fiskheroes:model").setModel(model);
    glider.anchor.set("body");
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);

   /*  utils.addHoverAnimation(renderer, "goblin.HOVER", "mhp:goblin/goblin_jump"); */
    /* addAnimationWithData(renderer, "goblin.POSE", "mhp:goblin/goblin_jump", "fiskheroes:flight_timer"); */

    addAnimation(renderer, "goblin.Pose", "mhp:goblin/goblin_jump").setData((entity, data) => data.load(entity.getInterpolatedData("fiskheroes:flight_timer") > 0 ? 1 : 0));
   /*  utils.addFlightAnimation(renderer, "goblin.FLIGHT", "mhp:goblin/goblin_flight_anim") */
   /*  utils.addFlightAnimation(renderer, "goblin.FLIGHT", "mhp:goblin/goblin_pose.anim.json", (entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
        data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        data.load(3, entity.getInterpolatedData("fiskheroes:dyn/flight_super_boost_timer"));
    }); */
}

function render(entity, renderLayer, isFirstPersonArm) {    
    var f = entity.getInterpolatedData("fiskheroes:flight_timer");
    var b = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
    var s = entity.getData("fiskheroes:flying");

    if (f > 0) {
        glider.setOffset(0, 1, (s ? 200 : -200) * (1 - f));
        glider.setScale(1 * f);

       /*  if (isFirstPersonArm) {
            glider.setOffset(0, -6 * b + (s ? 200 : -entity.rotPitch() * Math.PI) * (1 - f), -2 * b + s ? 0 : -200 * (1 - f));
            glider.setRotation(-entity.rotPitch() * (f - b), 0, 0);
            glider.anchor.ignoreAnchor(true);

            cancelAnimations = true;
        } else {
            glider.setRotation(0, 0, 0);
            glider.anchor.ignoreAnchor(false);
        } */

        glider.render();
    }
}
