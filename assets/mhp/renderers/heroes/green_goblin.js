extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:goblin/green_goblin_layer1",
    "layer2": "mhp:goblin/green_goblin_layer2",
    "glider": "mhp:goblin/goblin_glider_texture",
    "fire": "mhp:striker_eureka/striker_eureka_repulsor_layer.tx.json"
});

var utils = implement("fiskheroes:external/utils");
var cancelAnimations = false;


function initEffects(renderer) {
    var model = renderer.createResource("MODEL", "mhp:goblin/goblin_glider");
    model.texture.set("glider");
    glider = renderer.createEffect("fiskheroes:model").setModel(model);
    glider.anchor.set("body");
    glider.setScale(1.4);

    var fireModel = renderer.createResource("MODEL", "mhp:goblin/green_gobbler_fire");
    fireModel.texture.set(null, "fire");
    fire = renderer.createEffect("fiskheroes:model").setModel(fireModel);
    fire.anchor.set("body");
    fire.setScale(1.3);
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    
    utils.addFlightAnimation(renderer, "goblin.FLIGHT", "mhp:goblin/goblin_pose.anim.json");
    
    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer, isFirstPersonArm) {    
    var f = entity.getInterpolatedData("fiskheroes:flight_timer");
    var b = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
    var s = entity.getData("fiskheroes:flying");
    
    if (f > 0) {
        glider.setOffset(4, 1, (s ? 300 : -200) * (1 - f));
        glider.render();
        /* fire.setOffset(0, 12, (s ? 50000 : -200) * (1 - f)); */
        fire.setOffset(-0.2, 3, -8.2);
        fire.render()
        }
}
