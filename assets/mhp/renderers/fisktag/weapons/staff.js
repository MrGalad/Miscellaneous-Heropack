loadTextures({
    "base": "mhp:midnight_staff"
});

var utils = implement("fisktag:external/utils");
cancelAnimations = false
function init(renderer) {
    var model = utils.createModel(renderer, "mhp:midnightstaff", "base");
    model.bindAnimation("mhp:midnight_pose").setData((entity, data) => {
        if (cancelAnimations) {
            data.load(0);
            return;
        }
        data.load(entity.getInterpolatedData("mhp:dyn/float_interp"))
    });

    renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    if (renderType === "EQUIPPED_FIRST_PERSON") {
        glProxy.translate(0, -0.5, 0);
        glProxy.rotate(150, 1, 0, 0);
        cancelAnimations = true;
    }
    else if (renderType === "INVENTORY") {
        // FiskTag
        var scale = 1 / 0.9;
        glProxy.scale(-scale, scale, scale);
        glProxy.rotate(90, 0, 1, 0);
        glProxy.translate(0.15, 0.35, 0.1);

        // MC
        glProxy.rotate(90, 0, 1, 0);
        glProxy.rotate(-45, 0, 1, 0);
        glProxy.rotate(-210, 1, 0, 0);
        glProxy.scale(-1, -1, 1);
        glProxy.translate(-1, -0.5, -1);
        glProxy.scale(1 / 10);
        glProxy.translate(2, -3, 0);


        glProxy.scale(7);
        glProxy.translate(1.05, 0.45, 0.0);
        glProxy.rotate(45, 0, 0, 1);
        cancelAnimations = true;
    }
    else if (renderType === "ENTITY") {
        glProxy.translate(0.0, -0.5, -0.45);
        glProxy.rotate(90, 1, 0, 0);
        cancelAnimations = true;
    }
    else if (renderType === "EQUIPPED") {
        glProxy.translate(0, 0, 0.15 * entity.getInterpolatedData("fiskheroes:aiming_timer"));
        glProxy.rotate(150, 1, 0, 0);
    }

    glProxy.translate(0, -0.55, -0.05);
    glProxy.scale(1.5);
}