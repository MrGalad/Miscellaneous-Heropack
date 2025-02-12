var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("mhp:external/superhero_landing");
var max_boost_flight = 3;
var boostTime = 200;
var recoveryTime = 150;
var recoveryDelay = 20;
var deactivationDelay = 20;

function init(hero) {
    hero.setName("Invincible");
    hero.setTier(8);
    
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

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 2);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 3);
    hero.addKeyBind("SHIELD", "Block", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("FIRST", first);
    hero.addAttributeProfile("SECOND", second);
    hero.addAttributeProfile("THIRD", third);
    hero.addAttributeProfile("FOURTH", fourth);
    hero.addAttributeProfile("FIFTH", fifth);
    hero.addAttributeProfile("BLOCK", block);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        var boost = entity.getData("fiskheroes:dyn/flight_super_boost");
        var condss = entity.isSprinting() && entity.getData("fiskheroes:flying")
       // PackLoader.printChat("Boost2: " + entity.getData("mhp:dyn/boost1"));

        if (boost == 1) {
            manager.setData(entity, "fiskheroes:dyn/flight_super_boost", boost = 2);
            manager.setData(entity, "fiskheroes:flying", true);
            manager.setData(entity, "fiskheroes:flight_timer", entity.getData("fiskheroes:prev_flight_timer"));
            manager.setData(entity, "fiskheroes:flight_boost_timer", entity.getData("fiskheroes:prev_flight_boost_timer"));
        } else if (!(entity.isSprinting() && entity.getData("fiskheroes:flying")) && boost > 0) {
            manager.setData(entity, "fiskheroes:dyn/flight_super_boost", boost = 0)
            manager.setData(entity, "mhp:dyn/reactivation_count", 0);
        }

        if (boost > 0) {
            manager.setData(entity, "fiskheroes:dyn/super_boost_timeout", recoveryDelay);
        } else {
            var t = entity.getData("fiskheroes:dyn/super_boost_timeout");
            if (t > 0) {
                manager.setData(entity, "fiskheroes:dyn/super_boost_timeout", t - 1);
            }
        }

        manager.incrementData(entity, "fiskheroes:dyn/super_boost_cooldown", boostTime, recoveryTime, boost > 0, boost == 0 && entity.getData("fiskheroes:dyn/super_boost_timeout") == 0);

        if (boost > 0 && entity.getData("fiskheroes:dyn/super_boost_cooldown") >= 1) {
            manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 0);
        }
        if (boost == 0 && entity.getData("fiskheroes:dyn/super_boost_cooldown") >= 1) {
            manager.setData(entity, "fiskheroes:dyn/super_boost_cooldown", 0);
            var reactivationCount = entity.getData("mhp:dyn/reactivation_count") || 0;
            if (reactivationCount < 4) {
                manager.setData(entity, "mhp:dyn/reactivation_count", reactivationCount + 1);
                if (reactivationCount + 1 == 1) {
                    manager.setData(entity, "mhp:dyn/boost1", true);
                    manager.setData(entity, "mhp:dyn/flight_boost1", true);
                    manager.setData(entity, "mhp:dyn/boost1_deactivation_timer", deactivationDelay);
                } else if (reactivationCount + 1 == 2) {
                    manager.setData(entity, "mhp:dyn/boost2", true);
                    manager.setData(entity, "mhp:dyn/flight_boost1", false);
                    manager.setData(entity, "mhp:dyn/flight_boost2", true);
                    manager.setData(entity, "mhp:dyn/boost2_deactivation_timer", deactivationDelay);
                } else if (reactivationCount + 1 == 3) {
                    manager.setData(entity, "mhp:dyn/boost3", true);
                    manager.setData(entity, "mhp:dyn/flight_boost2", false);
                    manager.setData(entity, "mhp:dyn/flight_boost3", true);
                    manager.setData(entity, "mhp:dyn/boost3_deactivation_timer", deactivationDelay);
                } else if (reactivationCount + 1 == 4) {
                    manager.setData(entity, "mhp:dyn/boost4", true);
                    manager.setData(entity, "mhp:dyn/flight_boost3", false);
                    manager.setData(entity, "mhp:dyn/flight_boost4", true);
                    manager.setData(entity, "mhp:dyn/boost4_deactivation_timer", deactivationDelay);
                } else if (reactivationCount = 0) {
                    manager.setData(entity, "mhp:dyn/flight_boost4", false);
                    manager.setData(entity, "mhp:dyn/flight_boost0", true);
                }
            }
        }
        if (!entity.isSprinting() || !entity.getData("fiskheroes:dyn/flight_super_boost")) {
            manager.setData(entity, "mhp:dyn/flight_boost0", false);
            manager.setData(entity, "mhp:dyn/flight_boost1", false);
            manager.setData(entity, "mhp:dyn/flight_boost2", false);
            manager.setData(entity, "mhp:dyn/flight_boost3", false);
            manager.setData(entity, "mhp:dyn/flight_boost4", false);
        }

        if (entity.getData("mhp:dyn/charge_timer") > 0.45) {
            manager.setData(entity, "fiskheroes:flying", true);
            manager.setData(entity, "mhp:dyn/flight_boost4", true);
        }

        if (entity.getData("mhp:dyn/boost1")) {
            var timer1 = entity.getData("mhp:dyn/boost1_deactivation_timer");
            if (timer1 > 0) {
                manager.setData(entity, "mhp:dyn/boost1_deactivation_timer", timer1 - 1);
            } else {
                manager.setData(entity, "mhp:dyn/boost1", false);
            }
        }
        if (entity.getData("mhp:dyn/boost2")) {
            var timer2 = entity.getData("mhp:dyn/boost2_deactivation_timer");
            if (timer2 > 0) {
                manager.setData(entity, "mhp:dyn/boost2_deactivation_timer", timer2 - 1);
            } else {
                manager.setData(entity, "mhp:dyn/boost2", false);
            }
        }
        if (entity.getData("mhp:dyn/boost3")) {
            var timer3 = entity.getData("mhp:dyn/boost3_deactivation_timer");
            if (timer3 > 0) {
                manager.setData(entity, "mhp:dyn/boost3_deactivation_timer", timer3 - 1);
            } else {
                manager.setData(entity, "mhp:dyn/boost3", false);
            }
        }
        if (entity.getData("mhp:dyn/boost4")) {
            var timer4 = entity.getData("mhp:dyn/boost4_deactivation_timer");
            if (timer4 > 0) {
                manager.setData(entity, "mhp:dyn/boost4_deactivation_timer", timer4 - 1);
            } else {
                manager.setData(entity, "mhp:dyn/boost4", false);
            }
        }

        if (entity.isSprinting() && entity.getData("fiskheroes:flying") && boost == 0) {
            manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 1);
        }

        var time = 20;
        if (entity.getData("mhp:dyn/worn_suit") < 10) {
            manager.setData(entity, "mhp:dyn/worn_suit", entity.getData("mhp:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("mhp:dyn/worn_suit") > time / 5 && !entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", false);
        }

        var getRandomInt = function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        
        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "mhp:dyn/random_digit", getRandomInt(1, 2));
        }
    });
}

function isModifierEnabled(entity, modifier) {
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
    switch (keyBind) {
        case "GROUND_SMASH":
            return !entity.getData("fiskheroes:dyn/flight_super_boost") > 0;
        case "SHIELD":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying"));
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
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
    }
    return true;
}