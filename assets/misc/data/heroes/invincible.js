var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("misc:external/superhero_landing");
var auto_boost = implement("misc:external/auto_boost");
var max_boost_flight = 3;
function init(hero) {
    hero.setName("Invincible");
    hero.setVersion("Invincible");
    hero.setTier(9);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");

    hero.addPowers("misc:viltrumite_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 9, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);

    hero.addKeyBind("ENERGY_PROJECTION", "Speed Punches", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 3);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 4);
    /* hero.addKeyBind("SHIELD", "Block", 5); */

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("FIRST", first);
    hero.addAttributeProfile("SECOND", second);
    hero.addAttributeProfile("THIRD", third);
    hero.addAttributeProfile("FOURTH", fourth);
    hero.addAttributeProfile("FIFTH", fifth);
    hero.addAttributeProfile("BLOCK", block);
    hero.addAttributeProfile("SPRINT", sprint);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
   /*  var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null)); */
    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        auto_boost.boostdata(entity, manager, 200, 150, 20, 20);
        var time = 20;
        if (entity.getData("misc:dyn/worn_suit") < 10) {
            manager.setData(entity, "misc:dyn/worn_suit", entity.getData("misc:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("misc:dyn/worn_suit") > time / 5 && !entity.getData("misc:dyn/power")) {
            manager.setData(entity, "misc:dyn/power", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("misc:dyn/power")) {
            manager.setData(entity, "misc:dyn/power", false);
        }

        var getRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "misc:dyn/random_digit", getRandomInt(1, 2));
        }
    });

    hero.addDamageProfile("PUNCH", {
        "types": {
            "BLUNT": 1
        },
        "properties": {
            "ADD_KNOCKBACK": 3
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
                    return entity.getData("misc:dyn/flight_boost4") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "3":
                    return entity.getData("misc:dyn/flight_boost3") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "2":
                    return entity.getData("misc:dyn/flight_boost2") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "1":
                    return entity.getData("misc:dyn/flight_boost1") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "base":
                    return entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
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
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("misc:dyn/charge_timer");
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
        case "ENERGY_PROJECTION":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("misc:dyn/charge_timer");
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

function sprint(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 20, 1)
}

function getAttributeProfile(entity) {
    var powerCharge = entity.getData("misc:dyn/power_charge");

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
    } if (entity.getData("misc:dyn/charge_timer") > 0.6 && entity.isSprinting()) {
        return "SPRINT"
    } if (entity.getData("misc:dyn/charge_timer") > 0.6 && entity.isSprinting() && entity.isPunching()) {
        return "PUNCH"
    }
    return true;
}

function getTierOverride(entity) {
    return entity.getData("misc:dyn/power_charge") > 0.9 ? 10 : 9;
}
