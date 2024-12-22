extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:goblin/drip_or_drown_layer1",
    "layer2": "mhp:goblin/drip_or_drown_layer1",
    "glider": "mhp:goblin/goblin_glider_texture"
});

var utils = implement("fiskheroes:external/utils");
var cancelAnimations = false;


function initEffects(renderer) {
    var model = renderer.createResource("MODEL", "mhp:goblin/goblin_glider");
   /*  model.bindAnimation("mhp:goblin/goblin_jump_glider").setData((entity, data) => {
        if (cancelAnimations) {
            data.load(0,0)
            return;
        }
        data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer"));
    }); */
    model.texture.set("glider");
    glider = renderer.createEffect("fiskheroes:model").setModel(model);
    glider.anchor.set("body");
    glider.setScale(1.6);
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    
    utils.addFlightAnimation(renderer, "goblin.FLIGHT", "mhp:goblin/goblin_pose.anim.json");

}

function render(entity, renderLayer, isFirstPersonArm) {    
    var f = entity.getInterpolatedData("fiskheroes:flight_timer");
    var b = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
    var s = entity.getData("fiskheroes:flying");
    
    if (f > 0) {
        glider.setOffset(5, -3, (s ? 300 : -200) * (1 - f));
        glider.render();
        }
}
