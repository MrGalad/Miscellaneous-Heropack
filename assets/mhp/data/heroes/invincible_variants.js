var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("mhp:external/superhero_landing");
var auto_boost = implement("mhp:external/auto_boost");
var max_boost_flight = 3;
function init(hero) {
    hero.setName("Invincible Variants");
    hero.setTier(9);

    hero.setChestplate("Chestpiece");

    hero.addPowers("mhp:viltrumite_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 9, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);


    hero.addKeyBindFunc("func_INC_DESIGN", increaseSlot, "Next Variant Design", 1);
    hero.addKeyBindFunc("func_DEC_DESIGN", decreaseSlot, "Previous Variant Design", 2);
    hero.addKeyBindFunc("LOCKDESIGN", lockDesign, "Lock Variant Design", 3);
    hero.addKeyBindFunc("DESIGN", change, "Change Variant Design", 4);


    hero.addKeyBind("ENERGY_PROJECTION", "Speed Punches", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 3);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 4);
    hero.addKeyBind("SHIELD", "Block", 5);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("BLOCK", block);
    hero.addAttributeProfile("CHANGEPROFILE", changeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
    hero.setTierOverride(getTierOverride);
    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));
    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE")

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        auto_boost.boostdata(entity, manager, 200, 150, 20, 20);
        names(entity, manager)
        var time = 20;
        if (entity.getData("mhp:dyn/worn_suit") < 10) {
            manager.setData(entity, "mhp:dyn/worn_suit", entity.getData("mhp:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("mhp:dyn/worn_suit") > time / 5 && !entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", false);
        }

        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "mhp:dyn/random_digit", Math.floor(Math.random() * 2) + 1);
        }
    });
}

function increaseSlot(entity, manager) {
    var totalSlots = 19;
    var slot = entity.getData("mhp:dyn/slot") || 0
    slot = (slot + 1) % totalSlots;
    manager.setData(entity, "mhp:dyn/slot", slot);
    return true;
}

function decreaseSlot(entity, manager) {
    var totalSlots = 19;
    var slot = entity.getData("mhp:dyn/slot") || 0
    slot = (slot - 1 + totalSlots) % totalSlots;
    manager.setData(entity, "mhp:dyn/slot", slot);
    return true;
}

function lockDesign(entity, manager) {
    manager.setData(entity, "mhp:dyn/nv", true)
    return true
}

function change(entity, manager) {
    manager.setData(entity, "mhp:dyn/nv", false)
    manager.setData(entity, "mhp:dyn/slot", 0)
    return true
}

function names(entity, manager) {
    var chestplateNBT = entity.getWornChestplate().nbt();
    var chestplateDisplay = entity.getWornChestplate().nbt().getCompoundTag("display");
    var slot = entity.getData("mhp:dyn/slot");

    if (slot == 0) {
        manager.removeTag(chestplateDisplay, "Name");
    } else if (slot == 1) {
        manager.setString(chestplateDisplay, "Name", "Capevincible's Chestplate");
    } else if (slot == 2) {
        manager.setString(chestplateDisplay, "Name", "Movincihawk's Chestplate");
    } else if (slot == 3) {
        manager.setString(chestplateDisplay, "Name", "Mustachible's Chestplate");
    } else if (slot == 4) {
        manager.setString(chestplateDisplay, "Name", "Maskvincible's Chestplate");
    } else if (slot == 5) {
        manager.setString(chestplateDisplay, "Name", "Stripevincible's Chestplate");
    } else if (slot == 6) {
        manager.setString(chestplateDisplay, "Name", "Hoodvincible's Chestplate");
    } else if (slot == 7) {
        manager.setString(chestplateDisplay, "Name", "Hairvincible's Chestplate");
    } else if (slot == 8) {
        manager.setString(chestplateDisplay, "Name", "Capvincible's Chestplate");
    } else if (slot == 9) {
        manager.setString(chestplateDisplay, "Name", "Sportvincible's Chestplate");
    } else if (slot == 10) {
        manager.setString(chestplateDisplay, "Name", "Lightbluevincible's Chestplate");
    } else if (slot == 11) {
        manager.setString(chestplateDisplay, "Name", "Omnivincible's Chestplate");
    } else if (slot == 12) {
        manager.setString(chestplateDisplay, "Name", "Viltrumincible's Chestplate");
    } else if (slot == 13) {
        manager.setString(chestplateDisplay, "Name", "Bulletproofible's Chestplate");
    } else if (slot == 14) {
        manager.setString(chestplateDisplay, "Name", "Prisonincible's Chestplate");
    } else if (slot == 15) {
        manager.setString(chestplateDisplay, "Name", "Flaxancible's Chestplate");
    } else if (slot == 16) {
        manager.setString(chestplateDisplay, "Name", "Gogglesvincible's Chestplate");
    } else if (slot == 17) {
        manager.setString(chestplateDisplay, "Name", "Nogogglesible's Chestplate");
    } else if (slot == 18) {
        manager.setString(chestplateDisplay, "Name", "Nomaskible's Chestplate");
    }
}


function isModifierEnabled(entity, modifier) {
    if (!entity.getData("mhp:dyn/nv")) {
        return false;
    }
    switch (modifier.name()) {
        case "fiskheroes:super_speed":
            return !entity.getData("fiskheroes:flying");
        case "fiskheroes:controlled_flight":
            switch (modifier.id()) {
                case "4":
                    return entity.getData("mhp:dyn/flight_boost4") && !entity.getData("mhp:dyn/flight_boost0") && entity.isSprinting();
                case "3":
                    return entity.getData("mhp:dyn/flight_boost3") && !entity.getData("mhp:dyn/flight_boost0") && entity.isSprinting();
                case "2":
                    return entity.getData("mhp:dyn/flight_boost2") && !entity.getData("mhp:dyn/flight_boost0") && entity.isSprinting();
                case "1":
                    return entity.getData("mhp:dyn/flight_boost1") && !entity.getData("mhp:dyn/flight_boost0") && entity.isSprinting();
                case "base":
                    return entity.getData("mhp:dyn/flight_boost0") && entity.isSprinting();
                default:
                    break;
            }
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    var boolean = entity.getData("mhp:dyn/boolean")
    var lock = entity.getData("mhp:dyn/nv")
    switch (keyBind) {
        case "GROUND_SMASH":
            return !entity.getData("fiskheroes:dyn/flight_super_boost") > 0 && lock;
        case "SHIELD":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("mhp:dyn/charge_timer") && lock;
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying") && lock;
        case "ENERGY_PROJECTION":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("mhp:dyn/charge_timer") && lock;
        case "SLOW_MOTION":
            return lock && !entity.getData("fiskheroes:mask_open_timer2") > 0
        case "DESIGN":
            return entity.getData("fiskheroes:mask_open_timer2") > 0
        case "LOCKDESIGN":
            return !entity.getData("mhp:dyn/slot") == 0 && !lock
        case "func_INC_DESIGN":
        case "func_DEC_DESIGN":
            return !lock
        default:
            return true;
    }
}
function block(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -100000000, 1);
    profile.addAttribute("BASE_SPEED", -10000000, 1);
}

function changeProfile(profile) {
    profile.revokeAugments()
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:shield_blocking_timer") > 0) {
        return "BLOCK";
    } if (!entity.getData("mhp:dyn/nv")) {
        return "CHANGEPROFILE"
    }
    return true;
}
function getTierOverride(entity) {
    return entity.getData("mhp:dyn/nv") ? 9 : 0;
}
