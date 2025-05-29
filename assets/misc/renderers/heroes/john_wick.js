extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:john/john_wick_layer1",
    "layer2": "misc:john/john_wick_layer2",
    "hk_p30l": "misc:john/hk_p30l",
});

var utils = implement("fiskheroes:external/utils");

var hk_p30l;

function initEffects(renderer) {
    hk_p30l = renderer.createEffect("fiskheroes:model");
    hk_p30l.setModel(utils.createModel(renderer, "misc:hk_p30l_hip", "hk_p30l"));
    hk_p30l.anchor.set("rightLeg");
    hk_p30l.setOffset(0, 0, 0);
    hk_p30l.setRotation(0, 0, 0);
    hk_p30l.setScale(0.9, 0.9, 0.9);

}

function render(entity, renderLayer) {
    if (renderLayer == "LEGGINGS") {
        if (entity.getWornChestplate().nbt().getTagList('Equipment').getCompoundTag(0).getCompoundTag('Item').getCompoundTag('tag').getString("WeaponType") == "misc:hk_p30l") {
            hk_p30l.render();
        }
    }
}