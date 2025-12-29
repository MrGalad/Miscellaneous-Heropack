var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("misc:external/superhero_landing");
var auto_boost = implement("misc:external/auto_boost");
var max_boost_flight = 3;
function init(hero) {
    hero.setName("Grand Regent Thragg");
    hero.setVersion("Invincible");
    hero.setTier(9);

    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");

    hero.addPowers("misc:viltrumite_physiology_thragg");
    hero.addAttribute("PUNCH_DAMAGE", 10, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 4.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "Thunderclap", 1)
    hero.addKeyBind("ENERGY_PROJECTION", "Speed Punches", 2);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 3);
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 4);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 5);
    /* hero.addKeyBind("SHIELD", "Block", 5); */

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("SPRINT", sprint);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
    /*  var speedPunch = speedster_base.createSpeedPunch(hero);
     hero.setDamageProfile(entity => speedPunch.get(entity, null)); */
    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        auto_boost.boostdata(entity, manager, 200, 150, 20, 20);

        if (entity.getData("misc:dyn/flight_boost4") && landing.tick(entity, manager)) {
            landingDMG(hero, entity)
        }

        var getRandomInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "misc:dyn/random_digit", getRandomInt(1, 2));
        }

        if (entity.getData("fiskheroes:beam_charge") === 0) {
            manager.setData(entity, "misc:dyn/clap_animation_cooldown", false);
        }
        if (entity.getData("fiskheroes:beam_shooting")) {
            manager.setData(entity, "misc:dyn/clap", true);
        } else {
            manager.setData(entity, "misc:dyn/clap", false);
        }
        if (entity.getData("fiskheroes:beam_shooting")) {
            manager.setData(entity, "misc:dyn/clap_animation_cooldown", true);
        }

        manager.incrementData(entity, "misc:dyn/sneaking_timer", 30, (entity.getData("fiskheroes:flying") /* && !entity.getData("fiskheroes:moving") */));
    });

    hero.addDamageProfile("LAND", {
        "types": {
            "BLUNT": 1
        },
        "properties": {
            "ADD_KNOCKBACK": 3
        }
    });
}

function landingDMG(hero, entity) {
    if (entity.getData("misc:dyn/flight_boost4") && entity.world().getBlock(entity.pos().add(0, -1, 0)) != "minecraft:hay_block") {
        var range = 16;
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), range);

        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other)) {
                other.hurtByAttacker(hero, "LAND", "%s was crushed to death", 900, entity);
            }
        }
    }
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
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("misc:dyn/charge_timer") && entity.getData("misc:dyn/texture") < 0.25;
        default:
            return true;
    }
}

function sprint(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 20, 1)
}

function getAttributeProfile(entity) {

    if (entity.getData("misc:dyn/charge_timer") > 0.6 && entity.isSprinting()) {
        return "SPRINT"
    } if (entity.getData("misc:dyn/charge_timer") > 0.6 && entity.isSprinting() && entity.isPunching()) {
        return "PUNCH"
    }
    return true;
}
