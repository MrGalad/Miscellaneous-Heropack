extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "misc:choso/choso",
    "layer2": "misc:choso/choso",
    "hair": "misc:choso/choso_hair",
    "argall": "misc:mecha_man/mecha_man"
});

var utils = implement("fiskheroes:external/utils");
var speedster = implement("fiskheroes:external/speedster_utils");
var layer2


function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    //utils.bindParticles(renderer, "misc:super_boost").setCondition(entity => entity.getData("fiskheroes:beam_shooting_timer") < 0.3 && entity.getData("fiskheroes:beam_shooting_timer") > 0 && entity.getData("fiskheroes:beam_charging"))
    utils.bindParticles(renderer, "misc:piercing_blood_particles").setCondition((entity => entity.getData("fiskheroes:beam_charge") > 0.4 /* && entity.getData("fiskheroes:beam_charge") < 1 */));
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "misc:piercing_blood", "body", 0xFF0000, [{
        "firstPerson": [0, 1, -10],
        "offset": [0, 4, -8],
        "size": [0.4, 0.4]
    }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "misc:piercing_blood_impact"));;
    //utils.addCameraShake(renderer, 0.2, 0, "fiskheroes:beam_shooting_timer");
    var shake = renderer.bindProperty("fiskheroes:camera_shake").setCondition(entity => {
        shake.factor = entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0 && entity.getInterpolatedData("fiskheroes:beam_shooting_timer") < 0.7 ? 3 : 0.5;

        return (entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0 && entity.getInterpolatedData("fiskheroes:beam_shooting_timer") < 0.7) || entity.getInterpolatedData("fiskheroes:beam_shooting_timer") > 0.7;
    });



    var hairModel = renderer.createResource("MODEL", "misc:choso_hair");
    hairModel.texture.set("hair");
    hair = renderer.createEffect("fiskheroes:model").setModel(hairModel);
    hair.anchor.set("head");

    var argallrModel = renderer.createResource("MODEL", "misc:gojo_hollow_purple");
    argallrModel.texture.set("argall");
    argallr = renderer.createEffect("fiskheroes:model").setModel(argallrModel);
    argallr.anchor.set("head");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);

    addAnimation(renderer, "choso.PIERCE", "misc:choso")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:beam_charge"));
            data.load(1, entity.getInterpolatedData("fiskheroes:beam_shooting_timer"));
        })
}


function render(entity, renderLayer, isFirstPersonArm) {
    var target = entity.world().getEntityById(entity.getData("misc:dyn/grab_id"))
    var targetX = Math.floor(target.posX());
    var targetY = Math.floor(target.posY());
    var targetZ = Math.floor(target.posZ());

    if (entity.getData("misc:dyn/grab_id") > 0) {
        argallr.setOffset((entity.posX() - targetX), (entity.posY() - targetY), (entity.posZ() - targetZ))
        argallr.render()
    }
    hair.render()

}