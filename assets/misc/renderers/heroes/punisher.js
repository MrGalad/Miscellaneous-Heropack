var equipment = implement("misc:external/equipment");

extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:punisher/punisher_layer1",
    "layer2": "misc:punisher/punisher_layer2",
    "benelli_m4": "misc:punisher/benelli_m4",
    "glock_19": "misc:punisher/glock_19",
    "smith_wesson_27": "misc:punisher/smith_wesson_27",
    "barrett_m82": "misc:punisher/barrett_m82",
    
    
});

var utils = implement("fiskheroes:external/utils");

var benelli_m4, glock_19, smith_wesson_27, barrett_m82;


function init(renderer) {
    parent.init(renderer);
    
    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    benelli_m4 = renderer.createEffect("fiskheroes:model");
    benelli_m4.setModel(utils.createModel(renderer, "misc:benelli_m4_back", "benelli_m4"));
    benelli_m4.anchor.set("body");
    benelli_m4.setOffset(0, 0, 0);
    benelli_m4.setRotation(0, 0, 0);
    benelli_m4.setScale(0.8, 0.8, 0.8);
    
    barrett_m82 = renderer.createEffect("fiskheroes:model");
    barrett_m82.setModel(utils.createModel(renderer, "misc:barrett_m82_back", "barrett_m82"));
    barrett_m82.anchor.set("body");
    barrett_m82.setOffset(0, 0, 0);
    barrett_m82.setRotation(0, 0, 0);
    barrett_m82.setScale(0.8, 0.8, 0.8);
    
    glock_19 = renderer.createEffect("fiskheroes:model");
    glock_19.setModel(utils.createModel(renderer, "misc:glock_19_hip", "glock_19"));
    glock_19.anchor.set("rightLeg");
    glock_19.setOffset(0, 0, 0);
    glock_19.setRotation(0, 0, 0);
    glock_19.setScale(0.8, 0.8, 0.8);
    
    smith_wesson_27 = renderer.createEffect("fiskheroes:model");
    smith_wesson_27.setModel(utils.createModel(renderer, "misc:smith_wesson_27_hip", "smith_wesson_27"));
    smith_wesson_27.anchor.set("leftLeg");
    smith_wesson_27.setOffset(0, 0, 0);
    smith_wesson_27.setRotation(0, 0, 0);
    smith_wesson_27.setScale(0.8, 0.8, 0.8);
    
}

function render(entity, renderLayer) {
    if (renderLayer == "CHESTPLATE") {
        if (equipment.isItemEquipped(entity, "misc:benelli_m4")) {
            benelli_m4.render();
        }
        if (equipment.isItemEquipped(entity, "misc:barrett_m82")) {
            barrett_m82.render();
        }
    }
    if (renderLayer == "LEGGINGS") {
        if (equipment.isItemEquipped(entity, "misc:glock_19")) {
            glock_19.render();
        }
        if (equipment.isItemEquipped(entity, "misc:smith_wesson_27")) {
            smith_wesson_27.render();
        }
    }
    
}