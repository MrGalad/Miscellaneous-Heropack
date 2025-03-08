extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "stone": "misc:gauntlet/reality",
});
var stone
var utils = implement("fiskheroes:external/utils");
function initEffects(renderer) {
    utils.bindTrail(renderer, "misc:reality_flicker").setCondition(entity => entity.getData("fiskheroes:size_state") > 0)
    stone = renderer.createResource("MODEL", "misc:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}
