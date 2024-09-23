extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "mhp:gauntlet/gauntlet_2",
    "mind": "mhp:gauntlet/stones/mind",
    "reality": "mhp:gauntlet/stones/reality",
    "power": "mhp:gauntlet/stones/power",
    "space": "mhp:gauntlet/stones/space",
    "soul": "mhp:gauntlet/stones/soul",
    "time": "mhp:gauntlet/stones/time",
});

var utils = implement("fiskheroes:external/utils");
var overlay;

var space;
var spaceq
var mind;
var mindq
var reality;
var realityq
var power;
var powerq
var time;
var timeq
var soul;
var soulq

var spell
var spellq;

function initEffects(renderer) {
    /* var stones = ["space", "mind", "reality", "power", "time", "soul"]
    var data = entity.getData("mhp:dyn/stone_select"); */
  /*   utils.bindTrail(renderer, "mhp:power_flicker").setCondition(entity => 0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0)
    utils.bindTrail(renderer, "mhp:time_flicker").setCondition(entity => 0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0)
    utils.bindTrail(renderer, "mhp:soul_flicker").setCondition(entity => 0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0)
    utils.bindTrail(renderer, "mhp:space_flicker").setCondition(entity => 0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0)
    utils.bindTrail(renderer, "mhp:mind_flicker").setCondition(entity => 0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0)
   */ utils.bindTrail(renderer, "mhp:reality_flicker").setCondition(entity => entity.getData("fiskheroes:size_state") > 0 /* && stones[data] == "reality" && nbt.getBoolean("reality") */)/*  0.7 < entity.getData("mhp:dyn/all_active_timer") < 0.2 && entity.getData("mhp:dyn/all_active_timer") != 0 */

   var color = 0x55AA55;
   var tao_mandala = renderer.createResource("SHAPE", "fiskheroes:tao_mandala");
   var beam = renderer.createResource("BEAM_RENDERER", "fiskheroes:line");
   spell = renderer.createEffect("fiskheroes:lines").setShape(tao_mandala).setRenderer(beam);
   spell.color.set(color);
   spell.setOffset(-0.5, 7.0, 0.0).setScale(3.2);
   spell.anchor.set("leftArm");
   spell.mirror = false;

   spellq = renderer.createEffect("fiskheroes:lines").setShape(tao_mandala).setRenderer(beam);
   spellq.color.set(color);
   spellq.setOffset(-0.5, 11.0, 0.0).setScale(3.2);
   spellq.anchor.set("leftArm");
   spellq.mirror = false;


    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0x55FFFF);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.25);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15 || entity.getInterpolatedData("fiskheroes:teleport_timer") * 0.15;
        return true;
    });

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "fiskheroes:charged_beam", "head", getBeamColor(), [
        { "firstPerson": [4.5, 3.75, -8.0], "offset": [7, 3.0, -7], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    utils.bindTrail(renderer, "mhp:blur_green");


    var powers = 0xAA00AA
    glow = utils.createLines(renderer, "mhp:power", powers, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -0.5, 0.0], "size": [4.8, 4.8] },
    ]);
    glow.anchor.set("rightArm");
    glow.setOffset(1.0, 10.10, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);

    utils.bindCloud(renderer, "fiskheroes:telekinesis", "fiskheroes:telekinesis_monitor")

    space = renderer.createEffect("fiskheroes:overlay");
    space.texture.set(null, "space");
    space.opacity = 0.6;

    spaceq = renderer.createEffect("fiskheroes:overlay");
    spaceq.texture.set(null, "space");
    //spaceq.opacity = 0.6;

    mind = renderer.createEffect("fiskheroes:overlay");
    mind.texture.set(null, "mind");
    mind.opacity = 0.6;
    //-------------
    mindq = renderer.createEffect("fiskheroes:overlay");
    mindq.texture.set(null, "mind");

    reality = renderer.createEffect("fiskheroes:overlay");
    reality.texture.set(null, "reality");
    reality.opacity = 0.6;

    realityq = renderer.createEffect("fiskheroes:overlay");
    realityq.texture.set(null, "reality");

    power = renderer.createEffect("fiskheroes:overlay");
    power.texture.set(null, "power");
    power.opacity = 0.6;

    powerq = renderer.createEffect("fiskheroes:overlay");
    powerq.texture.set(null, "power");

    time = renderer.createEffect("fiskheroes:overlay");
    time.texture.set(null, "time");
    time.opacity = 0.6;

    timeq = renderer.createEffect("fiskheroes:overlay");
    timeq.texture.set(null, "time");

    soul = renderer.createEffect("fiskheroes:overlay");
    soul.texture.set(null, "soul");
    soul.opacity = 0.6;

    soulq = renderer.createEffect("fiskheroes:overlay");
    soulq.texture.set(null, "soul");
}

var portalT = 0;
var current = 0;
function render(entity, renderLayer, isFirstPersonArm) {
    var nbt = entity.getWornChestplate().nbt();
    var equipment = nbt.getTagList("Equipment");
    var stones = ["space", "mind", "reality", "power", "time", "soul"]
    var data = entity.getData("mhp:dyn/stone_select");
    if (renderLayer == "CHESTPLATE") {
        var timer = entity.getData("mhp:dyn/teleport_timer");
        if (renderLayer == "CHESTPLATE") {
            glow.opacity = entity.getInterpolatedData("fiskheroes:punchmode_timer");
            glow.render();

            if (hasStone(entity, "power")) {
                power.render()
            } if (hasStone(entity, "space")) {
                space.render()
            } if (hasStone(entity, "mind")) {
                mind.render()
            } if (hasStone(entity, "time")) {
                time.render()
            } if (hasStone(entity, "soul")) {
                soul.render()
            } if (hasStone(entity, "reality")) {
                reality.render()
            } if (stones[data] == "space" && nbt.getBoolean("space")) {
                spaceq.render()
            } if (stones[data] == "power" && nbt.getBoolean("power")) {
                powerq.render()
            } if (stones[data] == "time" && nbt.getBoolean("time")) {
                timeq.render()
            } if (stones[data] == "soul" && nbt.getBoolean("soul")) {
                soulq.render()
            } if (stones[data] == "mind" && nbt.getBoolean("mind")) {
                mindq.render()
            } if (stones[data] == "reality" && nbt.getBoolean("reality")) {
                realityq.render()
            } else if (entity.getInterpolatedData("fiskheroes:speeding") || entity.getInterpolatedData("fiskheroes:slow_motion")) {
                spell.render()
                spellq.render()
            }
        }
    }
}
function hasStone(entity, stone) {
     var nbt = entity.getWornChestplate().nbt();
    var equipment = nbt.getTagList("Equipment");
    var has = false;
    for (var i = 0; i < 6; i++) {
        has = has || equipment.getCompoundTag(i).getCompoundTag("Item").getCompoundTag("tag").getString("HeroType") == "mhp:" + stone + "_stone";
    }
    return has;
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimationWithData(renderer, "gaunlet.TELEPORT", "mhp:blocking_left", "fiskheroes:teleport_timer");
    addAnimationWithData(renderer, "gaunlet.BLOCKING", "mhp:blocking_left", "fiskheroes:shield_blocking_timer");
    addAnimationWithData(renderer, "gaunlet.CHARGED_BEAM", "mhp:aiming_left", "fiskheroes:beam_charge");
    addAnimationWithData(renderer, "gaunlet.AIMING", "mhp:aiming_left", "fiskheroes:aiming_timer")
    /* addAnimationWithData(renderer, "gaunlet.ANIM", "mhp:aiming_left", "mhp:dyn/time_timer") */;
    /*  addAnimationWithData(renderer, "gaunlet.ALL", "mhp:thanos", "mhp:dyn/all_active") */
   /*  addAnimation(renderer, "gauntlet.ALL", "mhp:thanos")
        .setData((entity, data) => {
            data.load(entity.getData("mhp:dyn/all_active_timer") == 0 ? 0 : entity.getInterpolatedData("mhp:dyn/all_active_timer") * 2);
        }); */

          addAnimation(renderer, "gauntlet.ANIM", "mhp:aiming_left")
        .setData((entity, data) => {
            data.load(entity.getData("mhp:dyn/time_timer") == 0 ? 0 : entity.getInterpolatedData("mhp:dyn/time_timer") * 2);
        });
}

function getBeamColor() {
    return 0xFFFF6D;
}

