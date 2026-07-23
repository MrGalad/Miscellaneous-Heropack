extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
    "stone": "misc:gauntlet/space",
});
var utils = implement("fiskheroes:external/utils");
var stone

function initEffects(renderer) {
    utils.bindCloud(renderer, "fiskheroes:telekinesis", "fiskheroes:telekinesis_monitor");
    utils.bindCloud(renderer, "fiskheroes:teleportation", "fiskheroes:breach")

    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0x2ECAF9);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15;
        return true;
    });

    stone = renderer.createResource("MODEL", "misc:stone");
    stone.texture.set(null, "stone");
    stone = renderer.createEffect("fiskheroes:model").setModel(stone);
    stone.anchor.set("rightArm");
}

function render(entity, renderLayer, isFirstPersonArm) {
    stone.render()
    stone.setOffset(1, -15, -3)
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimationWithData(renderer, "stone.AIMING", "fiskheroes:aiming", "fiskheroes:aiming_timer")

}