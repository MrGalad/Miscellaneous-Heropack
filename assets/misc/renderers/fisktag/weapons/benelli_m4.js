loadTextures({
    "base":       "misc:benelli_m4",
    "crosshair":  "fisktag:crosshairs/shotgun"
});

var utils = implement("fisktag:external/utils");

var model;

var cancelAnimations = false;

function init(renderer) {
    model = utils.createModel(renderer, "misc:benelli_m4", "base");
    model.bindAnimation("misc:john/hk_p30l_reload").setData((entity, data) => {
        if (cancelAnimations) {
            data.load(0, 0);
            data.load(1, 0);
            return;
        }
        data.load(0, entity.getInterpolatedData("fiskheroes:reload_timer"));
        data.load(1, entity.getInterpolatedData("fiskheroes:weapon_animation_timer"));
    });
    renderer.setModel(model);	

    utils.addPlayerAnimation(renderer, "misc:john/benelli_m4_reload")
    .setData((entity, data) => {
        data.load(0, entity.getInterpolatedData("fiskheroes:reload_timer"));
    });
    
    utils.makeDilatingCrosshair(renderer, "crosshair", 16, 16, [
        { "pos": [6, 6], "size": [5, 5] }, // Center
        { "pos": [1, 1], "size": [5, 5], "axis": [-1, -1] }, // Top Left
        { "pos": [11, 1], "size": [5, 5], "axis": [1, -1] }, // Top Right
        { "pos": [1, 11], "size": [5, 5], "axis": [-1, 1] }, // Bottom Left
        { "pos": [11, 11], "size": [5, 5], "axis": [1, 1] } // Bottom Right
    ], 3, 4, 3.33);
    
    utils.bindScopedBeam(renderer, "misc:bullet", 0xFFA03A, [
        { "firstPerson": [-5.0, 2.0, -18.0], "offset": [-3, 19, -16], "size": [1.0, 1.0] }
    ], [4.0, -1.0, -2.0]);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    
    if (renderType === "EQUIPPED" || renderType === "EQUIPPED_FIRST_PERSON") {
        cancelAnimations = false;
        if (renderType === "EQUIPPED_FIRST_PERSON") {
            var reload = Math.sin(Math.PI*entity.getInterpolatedData("fiskheroes:reload_timer"))
            glProxy.translate(0.05, -0.05+1*reload, 0);
            
            var f = 1 - scopeTimer * 0.4;
            recoil *= 0.3;
            glProxy.rotate(-recoil * (20 - scopeTimer * 7), 1, 0, 0);
            glProxy.translate(-0.05*scopeTimer, -0.65*scopeTimer * -0.125, scopeTimer * 0.2);
            glProxy.translate(0.02 * recoil * (1 - scopeTimer), -0.04 * recoil * f, (Math.sin(recoil * Math.PI) * 0.1) * f);
        }
    }
    else if (renderType === "EQUIPPED_IN_SUIT") {
        cancelAnimations = true;
    }
    else if (renderType === "ENTITY" || renderType === "INVENTORY") {
        cancelAnimations = true;
    }
    
    glProxy.scale(1.2);
    
    
}