loadTextures({
    "base":       "mhp:winchester",
    "crosshair":  "fisktag:crosshairs/shotgun"
});

var utils = implement("fisktag:external/utils");
var teams = implement("fisktag:external/teams");

var model;

var no = false;

function init(renderer) {
    model = utils.createModel(renderer, "mhp:winchester", "base");
    model.bindAnimation("mhp:winchester_slide").setData((entity, data) => {
        if (no) {
            data.load(0);
            return;
        }
        data.load(entity.getInterpolatedData("fiskheroes:weapon_animation_timer"));
    });
    renderer.setModel(model);

    utils.makeDilatingCrosshair(renderer, "crosshair", 16, 16, [
        { "pos": [6, 6], "size": [5, 5] }, // Center
        { "pos": [1, 1], "size": [5, 5], "axis": [-1, -1] }, // Top Left
        { "pos": [11, 1], "size": [5, 5], "axis": [1, -1] }, // Top Right
        { "pos": [1, 11], "size": [5, 5], "axis": [-1, 1] }, // Bottom Left
        { "pos": [11, 11], "size": [5, 5], "axis": [1, 1] } // Bottom Right
    ], 3, 4, 3.33);

    utils.bindScopedBeam(renderer, "fiskheroes:repulsor_blast", (0x8f5017), [
        { "firstPerson": [-5.0, 4.0, -18.0], "offset": [0, 18, -2.3], "size": [1.0, 1.0] }
    ], [4.0, -1.0, -2.0]);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        var f = easeInOutSine(entity.getInterpolatedData("fiskheroes:scope_timer"));
        glProxy.rotate(-7 * f, 1, 0, 0);
        glProxy.translate(-0.1 * f, -0.1 * f, -0.2 * f + recoil * (0.7 - 0.2 * scopeTimer));
    }
    else if (renderType === "EQUIPPED") {
        //left n right, forward n backward,  up n down
        glProxy.translate(0, 0.2, 0.5);
        glProxy.scale(1)
    }
    else if (renderType === "ENTITY" || renderType === "INVENTORY") {
        glProxy.translate(-1.2, 1.2, -0.2);
        glProxy.scale(1.4)
    }

    glProxy.translate(0, 0, -0.4);
    glProxy.scale(1.5);
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}
