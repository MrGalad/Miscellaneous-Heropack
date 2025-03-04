var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("mhp:external/superhero_landing");
var auto_boost = implement("mhp:external/auto_boost");
var max_boost_flight = 3;
function init(hero) {
    hero.setName("Invincible Variants");
    hero.setTier(9);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");

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
    hero.addAttributeProfile("FIRST", first);
    hero.addAttributeProfile("SECOND", second);
    hero.addAttributeProfile("THIRD", third);
    hero.addAttributeProfile("FOURTH", fourth);
    hero.addAttributeProfile("FIFTH", fifth);
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
    var bootsNBT = entity.getWornBoots().nbt();
    var helmetNBT = entity.getWornHelmet().nbt();
    var leggingsNBT = entity.getWornLeggings().nbt();

    var chestplateDisplay = chestplateNBT.getCompoundTag("display");
    var bootsDisplay = bootsNBT.getCompoundTag("display");
    var helmetDisplay = helmetNBT.getCompoundTag("display");
    var leggingsDisplay = leggingsNBT.getCompoundTag("display");

    var slot = entity.getData("mhp:dyn/slot");

    if (slot == 0) {
        manager.removeTag(chestplateDisplay, "Name");
        manager.removeTag(bootsDisplay, "Name");
        manager.removeTag(helmetDisplay, "Name");
        manager.removeTag(leggingsDisplay, "Name");
    } else if (slot == 1) {
        manager.setString(chestplateDisplay, "Name", "Capevincible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Capevincible's Boots");
        manager.setString(helmetDisplay, "Name", "Capevincible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Capevincible's Leggings");
    } else if (slot == 2) {
        manager.setString(chestplateDisplay, "Name", "Movincihawk's Chestplate");
        manager.setString(bootsDisplay, "Name", "Movincihawk's Boots");
        manager.setString(helmetDisplay, "Name", "Movincihawk's Helmet");
        manager.setString(leggingsDisplay, "Name", "Movincihawk's Leggings");
    } else if (slot == 3) {
        manager.setString(chestplateDisplay, "Name", "Mustachible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Mustachible's Boots");
        manager.setString(helmetDisplay, "Name", "Mustachible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Mustachible's Leggings");
    } else if (slot == 4) {
        manager.setString(chestplateDisplay, "Name", "Maskvincible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Maskvincible's Boots");
        manager.setString(helmetDisplay, "Name", "Maskvincible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Maskvincible's Leggings");
    } else if (slot == 5) {
        manager.setString(chestplateDisplay, "Name", "Stripevincible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Stripevincible's Boots");
        manager.setString(helmetDisplay, "Name", "Stripevincible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Stripevincible's Leggings");
    } else if (slot == 6) {
        manager.setString(chestplateDisplay, "Name", "Hoodvincible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Hoodvincible's Boots");
        manager.setString(helmetDisplay, "Name", "Hoodvincible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Hoodvincible's Leggings");
    } else if (slot == 7) {
        manager.setString(chestplateDisplay, "Name", "Hairvincible's Chestplate");
        manager.setString(bootsDisplay, "Name", "Hairvincible's Boots");
        manager.setString(helmetDisplay, "Name", "Hairvincible's Helmet");
        manager.setString(leggingsDisplay, "Name", "Hairvincible's Leggings");
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

function first(profile) {
    profile.revokeAugments();
    profile.addAttribute("SPRINT_SPEED", 0.8, 1);
    profile.addAttribute("PUNCH_DAMAGE", 8, 0);
    profile.addAttribute("MAX_HEALTH", -1, 0);
    profile.addAttribute("WEAPON_DAMAGE", 1.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
}

function second(profile) {
    profile.revokeAugments();
    profile.addAttribute("SPRINT_SPEED", 0.6, 1);
    profile.addAttribute("PUNCH_DAMAGE", 7, 0);
    profile.addAttribute("MAX_HEALTH", -2, 0);
    profile.addAttribute("WEAPON_DAMAGE", 0.8, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
}

function third(profile) {
    profile.revokeAugments();
    profile.addAttribute("SPRINT_SPEED", 0.2, 1);
    profile.addAttribute("PUNCH_DAMAGE", 6, 0);
    profile.addAttribute("MAX_HEALTH", -4, 0);
    profile.addAttribute("WEAPON_DAMAGE", 0.6, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
}

function fourth(profile) {
    profile.revokeAugments();
    profile.addAttribute("SPRINT_SPEED", 1, 1);
    profile.addAttribute("PUNCH_DAMAGE", 10, 0);
    profile.addAttribute("WEAPON_DAMAGE", 2, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);
}

function fifth(profile) {
    profile.revokeAugments();
    profile.addAttribute("SPRINT_SPEED", 1.5, 1);
    profile.addAttribute("PUNCH_DAMAGE", 12, 0);
    profile.addAttribute("MAX_HEALTH", 4, 0);
    profile.addAttribute("WEAPON_DAMAGE", 2.5, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);
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
    var powerCharge = entity.getData("mhp:dyn/power_charge");

    if (powerCharge > 0.9) {
        return "FIFTH";
    } else if (powerCharge > 0.75) {
        return "FOURTH";
    } else if (powerCharge > 0.5) {
        return "THIRD";
    } else if (powerCharge > 0.4) {
        return "SECOND";
    } else if (powerCharge > 0.25) {
        return "FIRST";
    } if (entity.getData("fiskheroes:shield_blocking_timer") > 0) {
        return "BLOCK";
    } if (!entity.getData("mhp:dyn/nv")) {
        return "CHANGEPROFILE"
    }
    return true;
}
function getTierOverride(entity) {
    return entity.getData("mhp:dyn/nv") ? 9 : 0;
}
