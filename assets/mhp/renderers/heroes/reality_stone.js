extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "stone": "mhp:gauntlet/reality",
});
var stone
function initEffects(renderer) {
    stone = renderer.createResource("MODEL", "mhp:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}
