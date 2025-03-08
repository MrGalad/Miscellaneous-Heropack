extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:blank",
    "layer2": "misc:blank",
});
var utils = implement("fiskheroes:external/utils");
var color = 0xFFAA00;

function initEffects(renderer) {
    renderer.bindProperty("fiskheroes:gravity_manipulation").color.set(0x000000);
}