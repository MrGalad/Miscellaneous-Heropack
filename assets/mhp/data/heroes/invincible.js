var super_boost = implement("fiskheroes:external/super_boost");
var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("mhp:external/superhero_landing");
var max_boost_flight = 3;
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
    super_boost.addKeyBind(hero, "key.boost", 1);
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
        super_boost.tick(entity, manager);
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager)

        var time = 20;
        if (entity.getData("mhp:dyn/worn_suit") < 10) {
            manager.setData(entity, "mhp:dyn/worn_suit", entity.getData("mhp:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("mhp:dyn/worn_suit") > time / 5 && !entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("mhp:dyn/power")) {
            manager.setData(entity, "mhp:dyn/power", false);
        }

        
        var getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "mhp:dyn/random_digit", getRandomInt(0, max_boost_flight));
        }
    });
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    case "fiskheroes:super_speed":
        return !entity.getData("fiskheroes:flying");
    default:
        return super_boost.isModifierEnabled(entity, modifier);
    }
}

function isKeyBindEnabled(entity, keyBind) {
	switch (keyBind) {
        case "GROUND_SMASH":
			return !entity.getData("fiskheroes:dyn/flight_super_boost") > 0;
        case "SHIELD":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying"))
		case "SUPER_SPEED":
			return !entity.getData("fiskheroes:flying");
		default:
			return super_boost.isKeyBindEnabled(entity, keyBind);
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
    /* profile.addAttribute("MAX_HEALTH", 20, 0); */
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
    profile.addAttribute("BASE_SPEED", -10000000, 1)
}



function getAttributeProfile(entity) {
    var powerCharge = entity.getData("mhp:dyn/power_charge");
    /* PackLoader.printChat("Power Charge: " + powerCharge); */

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