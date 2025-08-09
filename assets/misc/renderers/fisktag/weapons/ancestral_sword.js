loadTextures({
    "base":       "misc:blade_rivals_ancestral_sword",
    "crosshair":  "misc:crosshairs/pistol"
});

var utils = implement("fisktag:external/utils");

var model;

var cancelAnimations = false;

function init(renderer) {
    model = utils.createModel(renderer, "misc:blade/blade_rivals_ancestral_sword", "base");
    renderer.setModel(model);	
    
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