function init(hero) {
    hero.setName("Eren Yeager")
    hero.setTier(4);

    hero.setHelmet("Head");
    hero.setChestplate("Jacket");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:titan_transformation", "misc:odm_gear")
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.6, 1);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)
    hero.addAttribute("FALL_RESISTANCE", 0.4, 1)

    hero.addKeyBind("TITAN", "Titan Shift", 1);
    hero.addKeyBind("REFILL", "Refill Gas", 1);
    hero.addKeyBind("RELEASE", "Release", 3);
    hero.addKeyBind("BLADE", "Toggle Blades", 3);
    hero.addKeyBind("WEB_ZIP", "ODM Zip", 2);
    hero.addKeyBind("HARDEN", "Harden Fists", 4);
    hero.addKeyBind("BOOST", "Boost", 4);
    hero.addKeyBind("REGEN", "Regenerate", 5);
    /* hero.addKeyBind("CHARGED_BEAM", "Hardened Spikes", 5); */

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("TITAN", titanProfile);
    hero.addAttributeProfile("HARDENED", hardenProfile);
    hero.addAttributeProfile("NOMOVE", nomoveProfile);
    hero.addAttributeProfile("FALL", fallProfile);
    hero.setTierOverride(getTierOverride);
    hero.setDamageProfile(getAttributeProfile);
    hero.supplyFunction("canAim", canAim);
    hero.addDamageProfile("BLADE", { "types": { "SHARP": 1.0 } });
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);

    hero.setTickHandler((entity, manager) => {
        shiftDamage(hero, entity);
        var titanOn = !(entity.getData("misc:dyn/float_interp1") > 0.7)
        manager.incrementData(entity, "misc:dyn/float_interp1", 50, entity.getData("misc:dyn/float_interp") > 0.6);
        manager.incrementData(entity, "misc:dyn/float_interp3", 30, entity.getData("fiskheroes:blade"));
        manager.setData(entity, "fiskheroes:size_state", titanOn ? -1 : 1);
        manager.setDataWithNotify(entity, "fiskheroes:web_swinging", entity.getData("fiskheroes:blade"));
        manager.incrementData(entity, "misc:dyn/sprinting", 7, entity.isSprinting() && entity.isOnGround())
        manager.incrementData(entity, "misc:dyn/detransformation_timer", 90, entity.getData("misc:dyn/release"))

        if (entity.getHealth() <= 6) {
            manager.setData(entity, "misc:dyn/boolean", true)
            //nv for the auto transform
            manager.setData(entity, "misc:dyn/nv", true)
        }
        if (entity.getData("misc:dyn/float_interp1") > 0.8)
            manager.setData(entity, "misc:dyn/boolean1", true);

        if (!entity.getData("misc:dyn/boolean") || entity.getData("misc:dyn/titan_cooldown_timer") == 1) {
            manager.setData(entity, "misc:dyn/float_interp", 0);
            manager.setData(entity, "misc:dyn/float_interp1", 0);
            manager.setData(entity, "misc:dyn/float_interp2", 0);
            manager.setData(entity, "misc:dyn/boolean1", false);
            manager.setData(entity, "misc:dyn/boolean2", true);
            manager.setData(entity, "misc:dyn/hardened", false)
            manager.setData(entity, "misc:dyn/hardened_timer", 0)
        } if (!entity.getData("misc:dyn/eren_boost") && entity.getData("fiskheroes:flying") || entity.getData("misc:dyn/refill_timer") != 1) {
            manager.setData(entity, "fiskheroes:flying", false);
        } if (entity.getData("misc:dyn/eren_boost") && !entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "fiskheroes:flying", true);
        } if (entity.getData("misc:dyn/float_interp1") > 0) {
            manager.setData(entity, "misc:dyn/eyemarks", true)
        } else if (entity.getData("misc:dyn/charge_timer") == 1) {
            manager.setData(entity, "misc:dyn/eyemarks", false)
        } if (entity.getData("misc:dyn/eyemarks")) {
            manager.setData(entity, "misc:dyn/charge_timer", 1)
        } if (entity.getData("misc:dyn/detransformation_timer") == 1) {
            manager.setData(entity, "misc:dyn/boolean", false)
            manager.setData(entity, "misc:dyn/release", false)
            manager.setData(entity, "misc:dyn/release_timer", 0)
        } if (entity.getData("misc:dyn/refill")) {
            manager.setData(entity, "misc:dyn/refill_timer", entity.getData("misc:dyn/refill_timer") - 0.00625)
        } if (entity.getData("misc:dyn/refill_timer") == 0) {
            manager.setData(entity, "misc:dyn/refill", false)
        } if (entity.getHealth() == 20) {
            manager.setData(entity, "misc:dyn/regen_timer", 0)
            manager.setData(entity, "misc:dyn/regen", false)
        } if (entity.getData("misc:dyn/titan_cooldown_timer") > 0.9) {
            manager.setData(entity, "misc:dyn/release", true)
        }

    });
    hero.addSoundEvent("LAND", "fiskheroes:anti_land");
    hero.addSoundEvent("PUNCH", "fiskheroes:anti_punch");
    hero.addSoundEvent("STEP", "fiskheroes:anti_walk");

     hero.addDamageProfile("SHIFT", {
        "types": {
            "ENERGY": 1
        }
    });
}

function shiftDamage(hero, entity) {
    if (entity.getData("misc:dyn/float_interp1") > 0 && entity.getData("misc:dyn/float_interp1") < 1) {
        var range = 5;
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), range);

        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other)) { 
                other.hurtByAttacker(hero, "SHIFT", "%s was fried during Titan shifting", 5, entity);
            }
        }
    }
}

function getAttributeProfile(entity) {
    if (entity.getData("misc:dyn/eren_boost_timer") > 0 /* || entity.getData("misc:dyn/float_interp") > 0 */) {
        return "FALL";
    }
    if (
        entity.getData("misc:dyn/release") ||
        entity.getData("fiskheroes:beam_charging") ||
        entity.getData("fiskheroes:beam_shooting_timer") > 0 ||
        (entity.getData("misc:dyn/float_interp2") < 0.8 && entity.getData("misc:dyn/boolean"))
    ) {
        return "NOMOVE";
    }
    if (entity.getData("fiskheroes:blade")) {
        return "BLADE";
    }
    if (entity.getData("misc:dyn/hardened")) {
        return "HARDENED";
    }
    if (entity.getData("misc:dyn/boolean")) {
        return "TITAN";
    }
    return true;
}
function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
}

function titanProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 2, 1);
    profile.addAttribute("PUNCH_DAMAGE", 5, 0);
    profile.addAttribute("MAX_HEALTH", 1, 0);
    profile.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("JUMP_HEIGHT", 2, 0);
}
function nomoveProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -100000, 1);
    profile.addAttribute("BASE_SPEED", -100000, 1)
}

function fallProfile(profile) {
    /*    profile.inheritDefaults(); */
    profile.addAttribute("FALL_RESISTANCE", 100.0, 1);
}

function hardenProfile(profile) {
    /* profile.inheritDefaults(); */
    profile.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    profile.addAttribute("SPRINT_SPEED", 2, 1);
    profile.addAttribute("MAX_HEALTH", 1, 0);
    profile.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("JUMP_HEIGHT", 2, 0);
}

function getTierOverride(entity) {
    return entity.getData("misc:dyn/float_interp1") ? 8 : 2;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return (!entity.isOnGround() && entity.isSprinting() /* && !entity.getData("fiskheroes:web_swinging_timer") */ && entity.getData("misc:dyn/eren_boost_timer") > 0 && entity.getData("misc:dyn/refill_timer") != 1)
        case "fiskheroes:web_swinging":
        case "fiskheroes:web_zip":
        case "fiskheroes:blade":
            return entity.getData("misc:dyn/float_interp1") < 0.5
        case "fiskheroes:healing_factor":
            return (entity.getData("misc:dyn/regen_timer") > 0.8 && entity.getHealth() < 20) || (entity.getData("misc:dyn/boolean"))
        case "fiskheroes:hover":
            return entity.getData("misc:dyn/float_interp1") > 0 && entity.getData("misc:dyn/float_interp1") < 1

    }
    return true;
}


function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "HARDEN":
        /* case "CHARGED_BEAM": */
            return entity.getData("misc:dyn/float_interp1") > 0.5 && entity.getData("misc:dyn/float_interp2") == 1 && !entity.getData("misc:dyn/hardened")
        case "BLADE":
            return entity.getData("misc:dyn/float_interp2") < 0.2 && entity.getData("misc:dyn/float_interp2") < 1 && !entity.getData("misc:dyn/boolean")
        case "WEB_ZIP":
            return entity.getData("misc:dyn/float_interp1") < 0.2 && entity.getData("misc:dyn/float_interp2") < 1 && !entity.getData("misc:dyn/boolean") && entity.getData("fiskheroes:web_swinging")
        case "BOOST":
            return /* (!entity.isOnGround() && entity.getData("fiskheroes:web_swinging") && entity.getData("misc:dyn/float_interp1") < 0.2) || */ (entity.getData("misc:dyn/refill_timer") != 1 && !entity.isOnGround() && entity.getData("fiskheroes:web_swinging") && entity.getData("misc:dyn/float_interp1") < 0.2)
        /* case "AIM":
            return entity.getData("misc:dyn/raise") */
        /* case "RAISE":
            return !entity.getData("misc:dyn/boolean") */
        case "REGEN":
            return !entity.getData("misc:dyn/boolean") && entity.getHealth() < 10
        case "RELEASE":
            return entity.getData("misc:dyn/float_interp1") > 0.5 && entity.getData("misc:dyn/float_interp2") == 1
        case "TITAN":
            return !entity.getData("misc:dyn/boolean") && !entity.isSneaking() && entity.getData("misc:dyn/regen_timer") == 0 && entity.getData("misc:dyn/titan_cooldown_timer") < 0.5
        case "REFILL":
            return entity.isSneaking() && entity.isOnGround() && !entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/refill_timer") > 0
    }
    return true;
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:flying");
}
