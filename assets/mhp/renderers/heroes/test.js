extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:blank",
    "layer2": "mhp:blank",
});
var utils = implement("fiskheroes:external/utils");
var color = 0xFFAA00;

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:gravity_manipulation").color.set(0x000000);
}