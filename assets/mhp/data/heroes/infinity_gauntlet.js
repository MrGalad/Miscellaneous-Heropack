var infinity_stones = [
    "Space",
    "Mind",
    "Reality",
    "Power",
    "Time",
    "Soul"
]
var stone = ["Space", "Mind", "Reality", "Power", "Time", "Soul"];
var stones = ["space", "mind", "reality", "power", "time", "soul"];
var check = {
    space: "space",
    mind: "mind",
    reality: "reality",
    power: "power",
    time: "time",
    soul: "soul"
};
var colors = ['\u00A71', '\u00A7e', '\u00A74', '\u00A75', '\u00A72', '\u00A76']
var debounce = false;

function init(hero) {
    hero.setName("Thanos");
    hero.setTier(1);

    hero.setChestplate("Infinity Gauntlet");

    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.2, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);


    hero.addPowers("mhp:space_stone_g", "mhp:mind_stone", "mhp:reality_stone", "mhp:power_stone_g", "mhp:time_stone", "mhp:soul_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:space_stone}", false, item => item.nbt().getString("HeroType") == "mhp:space_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:mind_stone}", false, item => item.nbt().getString("HeroType") == "mhp:mind_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:reality_stone}", false, item => item.nbt().getString("HeroType") == "mhp:reality_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:power_stone}", false, item => item.nbt().getString("HeroType") == "mhp:power_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:time_stone}", false, item => item.nbt().getString("HeroType") == "mhp:time_stone");
    hero.addPrimaryEquipment("fiskheroes:superhero_chestplate{HeroType:mhp:soul_stone}", false, item => item.nbt().getString("HeroType") == "mhp:soul_stone");


    for (var i = 0; i < stones.length; i++) {
        var color = colors[i % colors.length];
        var stoneName = stones[i % stones.length].charAt(0).toUpperCase() + stones[i % stones.length].slice(1);
        var prevStoneName = stones[(i - 1 + stones.length) % stones.length].charAt(0).toUpperCase() + stones[(i - 1 + stones.length) % stones.length].slice(1);
        var nextStoneName = stones[(i + 1) % stones.length].charAt(0).toUpperCase() + stones[(i + 1) % stones.length].slice(1);
        var prevColor = colors[(i - 1 + colors.length) % colors.length];
        var nextColor = colors[(i + 1) % colors.length];
        var keyBindName = "STONE_FORWARDS_" + stones[i % stones.length];
        var sneakingKeyBindName = "STONE_BACKWARDS_" + stones[i % stones.length];
        hero.addKeyBindFunc(keyBindName, cycleStones, prevColor + prevStoneName + "\u00A7f > " + color + "\u00A7l" + stoneName + "\u00A7r" + " > " + nextColor + nextStoneName, 1);
        hero.addKeyBindFunc(sneakingKeyBindName, cycleStones, prevColor + prevStoneName + "\u00A7f < " + color + "\u00A7l" + stoneName + "\u00A7r" + " < " + nextColor + nextStoneName, 1);
    } 

    hero.setTickHandler(function (entity, manager) {
        var data = entity.getData("mhp:dyn/stone_select_slot");
        var nbt = entity.getWornChestplate().nbt();
        var equipment = nbt.getTagList("Equipment");
        var stones = ["space", "mind", "reality", "power", "time", "soul"]

        var hasStone = function (stoneType) {
            for (var i = 0; i < stones.length; i++) {
                var tag = equipment.getCompoundTag(i);
                if (tag.getCompoundTag("Item").getCompoundTag("tag").getString("HeroType") == "mhp:" + stoneType + "_stone") {
                    return true;
                }
            }
            return false;
        };

        for (var i = 0; i < stones.length; i++) {
            var stoneName = stones[i];
            var stonePresent = hasStone(stoneName);
            if (nbt.getBoolean(stoneName) != stonePresent) {
                manager.setBoolean(nbt, stoneName, stonePresent);
            }
        }

        if (entity.getData("mhp:dyn/stone_selecting")) {
            var newData = entity.isSneaking() ? data - 1 : data + 1;
            manager.setData(entity, "mhp:dyn/stone_select_slot", newData);
            manager.setData(entity, "mhp:dyn/stone_selecting", false);
        }

        manager.setData(entity, "mhp:dyn/stone_select", equipment.getCompoundTag(data).getByte("Index"));

        data = entity.getData("mhp:dyn/stone_select_slot");
        if (data == -1) {
            manager.setData(entity, "mhp:dyn/stone_select_slot", equipment.tagCount() - 1);
        } else if (data == equipment.tagCount()) {
            manager.setData(entity, "mhp:dyn/stone_select_slot", 0);
        }
        // anim
         var stoneEquiped = (stone) => {
             for (var i=0; i<stones.length;i++) {
                 if (equipment.getCompoundTag(i).getCompoundTag("Item").getCompoundTag("tag").getString("HeroType") == "mhp:"+ stone +"_stone") {
                   return true;
                 }
               }
               return false;
             };
             manager.incrementData(entity, "mhp:dyn/all_active_timer", 60, 0, stoneEquiped("power") && stoneEquiped("space") && stoneEquiped("reality") && stoneEquiped("soul") && stoneEquiped("time") && stoneEquiped("mind"));
             manager.incrementData(entity, "mhp:dyn/time_timer", 60, 0, entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:slow_motion"));
 

        var currentStone = entity.getWornChestplate().nbt().getString("selectedStone") || "Power";
        // POWER Stuff
        /*   if (stones[data] !== "power") {
              manager.setData(entity, "fiskheroes:punchmode", false);
          }
  
          // TIME Stuff
          if (stones[data] !== "time") {
              manager.setData(entity, "fiskheroes:slow_motion", false);
              manager.setData(entity, "fiskheroes:speeding", false);
          } */
        var teleport_delay = entity.getData("fiskheroes:teleport_delay");
        if (teleport_delay > 0) {


            var set = entity.getData("mhp:dyn/teleport_timer") + 1
            set = Math.max(0, set);
            set = Math.min(32, set);
            manager.setData(entity, "mhp:dyn/teleport_timer", set);
        } else {
            var set = entity.getData("mhp:dyn/teleport_timer") - 1
            set = Math.max(0, set);
            set = Math.min(32, set);
            manager.setData(entity, "mhp:dyn/teleport_timer", set);
        }

        return true;
        
    });

    // POWER
    hero.addKeyBind("CHARGED_PUNCH", "\u00A75Empowered Punch", 2);
    /*  hero.addKeyBind("CHARGED_BEAM", "\u00A7ePower Stone Blast", 3); */


    // SPACE
    hero.addKeyBind("AIM", "\u00A71Telekinesis", 2)
    hero.addKeyBind("TELEKINESIS", "\u00A71Telekinesis", 2)
    hero.addKeyBindFunc("TELEPORT", teleport, "\u00A71Teleport", 3);
    hero.addKeyBind("SHIELD", "\u00A71Forcefield", 4);

    // REALITY
    hero.addKeyBindFunc("func_GIANT_MODE", giantModeKey, "\u00A74Giant Mode", 2);
    hero.addKeyBind("SPELL_MENU", "\u00A74Spell Menu", 3);

    // SOUL
    hero.addKeyBind("REGEN_TRANSFORM", "\u00A76Regeneration", 2);
    hero.addKeyBind("WATCHA_WANT", "\u00A76\u00A7mRegeneration", 2);

    // TIME
    hero.addKeyBind("SUPER_SPEED", "\u00A72Accelerate Own Time", 2);
    hero.addKeyBind("SLOW_MOTION", "\u00A72Decelerate Time", 3);


    // MIND
    hero.addKeyBind("CHARGED_BEAM", "\u00A7eMind Stone Blast", 3);

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);

    hero.addAttributeProfile("PUNCH", punchProfile);
    hero.addDamageProfile("PUNCH", {
        "types": {
            "FIRE": 1.0,
            "ENERGY": 1
        },
        "properties": {
            "COOK_ENTITY": true,
            "HEAT_TRANSFER": 160,
            "IGNITE": 2
        }
    })
   /*  hero.addDamageProfile("SNAP", {
        "types": {
            "ENERGY": 1
        },
        "properties": {
            "COOK_ENTITY": false,
            "HEAT_TRANSFER": 160,
            "IGNITE": 2
        }
    }) */

    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
    hero.setTierOverride(getTierOverride);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.supplyFunction("canAim", canAim)
}

var cycleStones = function(entity, manager) {
    var data = "mhp:dyn/stone_selecting";
    var value = true;

    manager.setData(entity, data, value);
    
    return true;
};


function isModifierEnabled(entity, modifier) {
    var data = entity.getData("mhp:dyn/stone_select");
    switch (modifier.name()) {
        case "fiskheroes:healing_factor":
            return entity.getData("fiskheroes:dyn/steeled");
        case "fiskheroes:punchmode":
            return stones[data] == "power";
        case "fiskheroes:slow_motion":
            return stones[data] == "time";
        case "fiskheroes:speeding":
            return stones[data] == "time";
        default:
            break;
    }
    return true;
}
function isKeyBindEnabled(entity, keyBind) {
    var selectedStone = entity.getWornChestplate().nbt().getString("selectedStone") || "Power"
    var data = entity.getData("mhp:dyn/stone_select");
    var nbt = entity.getWornChestplate().nbt();
    if (keyBind.startsWith("STONE_FORWARDS_")) {
        return !entity.isSneaking() && nbt.getBoolean(stones[data]) && keyBind == "STONE_FORWARDS_" + stones[data];
    }
    if (keyBind.startsWith("STONE_BACKWARDS_")) {
        return entity.isSneaking() && nbt.getBoolean(stones[data]) && keyBind == "STONE_BACKWARDS_" + stones[data];
    }// REALITY Stuff

    if (entity.getData("fiskheroes:dyn/giant_mode")) return keyBind == "func_GIANT_MODE";

    switch (keyBind) {
        case "REGEN_TRANSFORM":
            return stones[data] == "soul" && nbt.getBoolean("soul") && entity.getData("fiskheroes:time_since_damaged") > 20.0;

        case "WATCHA_WANT":
            return stones[data] == "soul" && nbt.getBoolean("soul") && entity.getData("fiskheroes:time_since_damaged") <= 20.0;

        case "CHARGED_PUNCH":
            return stones[data] == "power" && nbt.getBoolean("power");

        case "TELEKINESIS":
            return stones[data] == "space" && nbt.getBoolean("space")
        case "SHIELD":
            return stones[data] == "space" && nbt.getBoolean("space")
        case "TELEPORT":
            return stones[data] == "space" && nbt.getBoolean("space");
            case "AIM":
            return stones[data] == "space" && nbt.getBoolean("space");

        case "func_GIANT_MODE":
            return stones[data] == "reality" && nbt.getBoolean("reality");

        case "SPELL_MENU":
            return stones[data] == "reality" && nbt.getBoolean("reality");

        case "SLOW_MOTION":
        case "SUPER_SPEED":
            return stones[data] == "time" && nbt.getBoolean("time");

        case "CHARGED_BEAM":
            return stones[data] == "mind" && nbt.getBoolean("mind");
    } return true
}

function giantModeKey(player, manager) {

    var flag = player.getData("fiskheroes:dyn/giant_mode");
    manager.setData(player, "fiskheroes:dyn/giant_mode", !flag);

    manager.setData(player, "fiskheroes:size_state", flag ? -1 : 1);
    return true;
}

function punchProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 16.0, 0);
}

function getAttributeProfile(entity) {
    return entity.getData("fiskheroes:punchmode") ? "PUNCH" : null;
}

function teleport(entity, manager) {
    manager.setData(entity, "fiskheroes:teleport_delay", 35)


    return true
}

function getTierOverride(entity) {
    return entity.getInterpolatedData("mhp:dyn/all_active_timer") ? 10 : 1;
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}