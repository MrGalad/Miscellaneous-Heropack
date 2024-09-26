loadTextures({
    "base":  "mhp:ener",
    "xor": "mhp:ener.tx.json",
    "handle": "mhp:handle"
});

var utils = implement("fisktag:external/utils");

var model;

function init(renderer) {
    model = utils.createModel(renderer, "mhp:ener", "handle", "xor");
    renderer.setModel(model);
  
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
// right/left, up/down, forward/backward
    if (renderType === "EQUIPPED_FIRST_PERSON") {
    glProxy.scale(2, 2, 2);
    glProxy.rotate(0, 0, 2, 0);
    glProxy.translate(0.0, -1.6, -0.3);
    }
    else if (renderType === "INVENTORY" || renderType === "ENTITY") {

		glProxy.rotate(-0.0, 0.5, 0, 0);
        glProxy.scale(1.8, 1.8, 2);
        glProxy.translate(0, -1.5, -0.4);
    } else {
        glProxy.scale(1.4, 1.4, 1.4);
        glProxy.rotate(-0.0, 0.5, 0, 0);
        glProxy.translate(-0.01, -1.4, -0.3);
       // renderer.opacity = 0.5
    }
}