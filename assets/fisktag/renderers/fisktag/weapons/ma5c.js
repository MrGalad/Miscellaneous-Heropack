loadTextures({
    "base":       "fisktag:mac",
    "red":         "fisktag:shotgun_red",
    "blue":        "fisktag:shotgun_blue",
    "base_lights": "fisktag:shotgun_lights",
    "red_lights":  "fisktag:shotgun_red_lights",
    "blue_lights": "fisktag:shotgun_blue_lights",
    "crosshair":  "fisktag:crosshairs/rifle"
});

var utils = implement("fisktag:external/utils");

var teams = implement("fisktag:external/teams");

var model;

function init(renderer) {
    model = utils.createModel(renderer, "fisktag:MA5C", "base");
    renderer.setModel(model);

    utils.makeDilatingCrosshair(renderer, "crosshair", 16, 16, [
        { "pos": [6, 6], "size": [5, 5] }, // Center
        { "pos": [1, 1], "size": [5, 5], "axis": [-1, -1] }, // Top Left
        { "pos": [11, 1], "size": [5, 5], "axis": [1, -1] }, // Top Right
        { "pos": [1, 11], "size": [5, 5], "axis": [-1, 1] }, // Bottom Left
        { "pos": [11, 11], "size": [5, 5], "axis": [1, 1] } // Bottom Right
    ], 3, 4, 3.33);

    utils.bindScopedBeam(renderer, "fiskheroes:repulsor_blast", (0x8f5017), [
        { "firstPerson": [-5.5, 4.0, -20.0], "offset": [-2, 15.0, -14.0], "size": [0.5, 0.5] }
    ], [-5.5, 4.0, -19.0]);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    if (renderType === "EQUIPPED_FIRST_PERSON") {
    var f = /* easeInOutSine */(entity.getInterpolatedData("fiskheroes:scope_timer"));
    glProxy.rotate(-7 * f, 1, 0, 0);
    // for tomorrorw, inc middle = left down, so u should dec middle and mess with first ig
    glProxy.translate(-0.6 * f,0,0/*  0.5 * f, -1 * f + recoil * (0.7 - 0.2 * scopeTimer) */);
}
else if (renderType === "EQUIPPED") {
    glProxy.translate(-0.15, 0, 0);
}
else if (renderType === "ENTITY" || renderType === "INVENTORY") {
    glProxy.translate(0, 0.2, 0.8);
}

glProxy.translate(0.13, -1.8, -0.2);
glProxy.scale(1.25);
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}