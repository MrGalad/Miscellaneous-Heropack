var equipment = implement("misc:external/equipment");

extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blade_rivals/blade_rivals_layer1",
    "layer2": "misc:blade_rivals/blade_rivals_layer2",
    "blade_coat": "misc:blade_rivals/blade_rivals_coat",
    "dracula": "misc:blade_rivals/blade_rivals_dracula",
    "dracula_sheath": "misc:blade_rivals/blade_rivals_dracula_sheath",
    "ancestral_sword": "misc:blade_rivals/blade_rivals_ancestral_sword",
    
});

var utils = implement("fiskheroes:external/utils");

var blade_coat_right, blade_coat_left, dracula, dracula_sheath, ancestral_sword;

function init(renderer) {
    parent.init(renderer);
    
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    blade_coat_right = renderer.createEffect("fiskheroes:model");
    blade_coat_right.setModel(utils.createModel(renderer, "misc:blade/blade_coat_right", "blade_coat"));
    blade_coat_right.anchor.set("rightLeg");
    blade_coat_right.setOffset(0, 0, 0);
    blade_coat_right.setRotation(0, 0, 0);
    blade_coat_right.setScale(1, 1, 1);
    
    blade_coat_left = renderer.createEffect("fiskheroes:model");
    blade_coat_left.setModel(utils.createModel(renderer, "misc:blade/blade_coat_left", "blade_coat"));
    blade_coat_left.anchor.set("leftLeg");
    blade_coat_left.setOffset(0, 0, 0);
    blade_coat_left.setRotation(0, 0, 0);
    blade_coat_left.setScale(1, 1, 1);
    
    dracula = renderer.createEffect("fiskheroes:model");
    dracula.setModel(utils.createModel(renderer, "misc:blade/blade_rivals_dracula_back", "dracula"));
    dracula.anchor.set("body");
    dracula.setOffset(0, 0, 0);
    dracula.setRotation(0, 0, 0);
    dracula.setScale(1, 1, 1);
    
    dracula_sheath = renderer.createEffect("fiskheroes:model");
    dracula_sheath.setModel(utils.createModel(renderer, "misc:blade/blade_rivals_dracula_sheath", "dracula_sheath"));
    dracula_sheath.anchor.set("body");
    dracula_sheath.setOffset(0, 0, 0);
    dracula_sheath.setRotation(0, 0, 0);
    dracula_sheath.setScale(1, 1, 1);
    
    ancestral_sword = renderer.createEffect("fiskheroes:model");
    ancestral_sword.setModel(utils.createModel(renderer, "misc:blade/blade_rivals_ancestral_sword_left", "ancestral_sword"));
    ancestral_sword.anchor.set("leftArm");
    ancestral_sword.setOffset(0, 0, 0);
    ancestral_sword.setRotation(0, 0, 0);
    ancestral_sword.setScale(0.8, 0.8, 0.8);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    
    addAnimationWithData(renderer, "blade_rivals.SPRINT", "misc:blade_base_run", "misc:dyn/sprinting").priority = -1;
    
}

function render(entity, renderLayer) {
    if (renderLayer == "CHESTPLATE") {
        if (equipment.isItemEquipped(entity, "misc:dracula")) {
            dracula.render()
        }
        if (equipment.isItemEquipped(entity, "misc:ancestral_sword")) {
            ancestral_sword.render()
        }
        blade_coat_left.render();
        blade_coat_right.render();
        dracula_sheath.render();
    }
}