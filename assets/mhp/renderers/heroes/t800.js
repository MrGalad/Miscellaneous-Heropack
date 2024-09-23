extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:terminator/t-800_layer1",
    "layer2": "mhp:terminator/t-800_layer2",
    "bike": "mhp:t800_bike",
    "eye": "mhp:eye"
});
var utils = implement("fiskheroes:external/utils");

var david;

function initEffects(renderer) {
    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set(null, "eye");

    var davidModel = renderer.createResource("MODEL", "mhp:t800_bike");
    davidModel.bindAnimation("mhp:wheelsharley").setData((entity, data) => {
    data.load(0, entity.motion().equals(0, 0, 0) ? 0 : -entity.loop(5));
    });
    davidModel.texture.set("bike");
    david = renderer.createEffect("fiskheroes:model").setModel(davidModel); 
    david.anchor.set("body");
};

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimationWithData(renderer, "t800.SIT", "mhp:sit", "fiskheroes:speeding");

   /* addAnimation(renderer, "t800.SIT", "mhp:sit")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("mhp:dyn/holoanimation");
            data.load(4 * f <= 0.95 ? 4 * f : 0.95);
        }); */

};


function render(entity, renderLayer, isFirstPersonArm) {
var hologram = entity.is("DISPLAY") && entity.as('DISPLAY').getDisplayType() != 'HOLOGRAM'
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        if (entity.getData("fiskheroes:speeding")) {
            david.setScale(1.2);
    
            if (isFirstPersonArm) {
    
                // FIRST PERSON

                david.setOffset(0, -5, -12);
                david.setRotation(-entity.rotPitch()*0.6, 180, 0);
                david.anchor.ignoreAnchor(true);
            } else {
    
                // THIRD PERSON
    
                david.setOffset(0, -7, -10);
                david.setRotation(0, 180, 0);
                david.anchor.ignoreAnchor(false);
            }  
    
            david.render();
        }  
    }  if (entity.isWearingFullSuit() && entity.getData("fiskheroes:mask_open_timer2") > 0.1) {
        overlay.render()
    }
} 
