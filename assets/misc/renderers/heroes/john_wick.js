var equipment = implement("misc:external/equipment");

extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:john/john_wick_layer1",
    "layer2": "misc:john/john_wick_layer2",
    "hk_p30l": "misc:john/hk_p30l",
    "benelli_m4": "misc:john/benelli_m4",
    "kimber": "misc:john/kimber",
});

var utils = implement("fiskheroes:external/utils");

var hk_p30l, benelli_m4, kimber;

function initEffects(renderer) {
    hk_p30l = renderer.createEffect("fiskheroes:model");
    hk_p30l.setModel(utils.createModel(renderer, "misc:hk_p30l_hip", "hk_p30l"));
    hk_p30l.anchor.set("rightLeg");
    hk_p30l.setOffset(0, 0, 0);
    hk_p30l.setRotation(0, 0, 0);
    hk_p30l.setScale(0.9, 0.9, 0.9);

    benelli_m4 = renderer.createEffect("fiskheroes:model");
    benelli_m4.setModel(utils.createModel(renderer, "misc:benelli_m4_back", "benelli_m4"));
    benelli_m4.anchor.set("body");
    benelli_m4.setOffset(0, 0, 0);
    benelli_m4.setRotation(0, 0, 0);
    benelli_m4.setScale(0.8, 0.8, 0.8);

    kimber = renderer.createEffect("fiskheroes:model");
    kimber.setModel(utils.createModel(renderer, "misc:kimber_hip", "kimber"));
    kimber.anchor.set("leftLeg");
    kimber.setOffset(0, 0, 0);
    kimber.setRotation(0, 0, 0);
    kimber.setScale(0.9, 0.9, 0.9);
}

function render(entity, renderLayer) {
    if (renderLayer == "CHESTPLATE") {
        if (equipment.isItemEquipped(entity, "misc:benelli_m4")) {
            benelli_m4.render();
        }
    }
    if (renderLayer == "LEGGINGS") {
        if (equipment.isItemEquipped(entity, "misc:hk_p30l")) {
            hk_p30l.render();
        }
        if (equipment.isItemEquipped(entity, "misc:kimber")) {
            kimber.render();
        }
    }
}