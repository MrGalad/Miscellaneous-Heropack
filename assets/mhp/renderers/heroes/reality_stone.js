extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "stone": "mhp:gauntlet/reality",
});
var stone
var utils = implement("fiskheroes:external/utils");
function initEffects(renderer) {
    utils.bindTrail(renderer, "mhp:reality_flicker").setCondition(entity => entity.getData("fiskheroes:size_state") > 0)
    stone = renderer.createResource("MODEL", "mhp:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}
