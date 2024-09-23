extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
    "stone": "mhp:gauntlet/space",
});

var stone
function initEffects(renderer) {
    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0x55FFFF);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15;
        return true;
    });

    stone = renderer.createResource("MODEL", "mhp:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}