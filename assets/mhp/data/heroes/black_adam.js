function init(hero) {
    hero.setName("Black Adam");
    hero.setVersion("item.superhero_armor.version.dceu");
    hero.setTier(9);

    hero.setChestplate("item.superhero_armor.piece.torso");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:divine_empowerment");
    hero.addAttribute("PUNCH_DAMAGE", 10.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.7, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Lightning Beam", 2);
    hero.addKeyBind("CHARGED_BEAM", "Lightning Discharge", 3);
    hero.addKeyBind("SHAZAM", "SHAZAM!", 5);

    hero.setHasProperty(hasProperty);
    hero.setAttributeProfile(getProfile);
    hero.setTierOverride(getTierOverride);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.addAttributeProfile("INACTIVE", inactiveProfile);
    hero.setDefaultScale(1.1);
   /*  hero.setTickHandler((entity, manager) => {
        if (entity.getData("mhp:dyn/shazam") > 0.5) {
            manager.setData(entity, "mhp:dyn/boolean", true)
        } else if (entity.getData("mhp:dyn/shazam") < 0.1) {
            manager.setData(entity, "mhp:dyn/boolean", false)
        }
    }); */
}

function inactiveProfile(profile) {
    profile.revokeAugments();
}

function getProfile(entity) {
    if (!entity.getData("mhp:dyn/shazam_timer") > 0.5) {
        return "INACTIVE";
    }
    return null;
}

function getTierOverride(entity) {
    return entity.getData("mhp:dyn/shazam_timer") > 0.5 ? 9 : 0;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:lightning_cast":
            return entity.getData("mhp:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging") && !entity.getData("fiskheroes:energy_projection")
        case "fiskheroes:energy_projection":
            return entity.getData("mhp:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging")
        case "fiskheroes:controlled_flight":
        case "fiskheroes:fire_immunity":
        case "fiskheroes:projectile_immunity":
        case "fiskheroes:arrow_catching":
            return entity.getData("mhp:dyn/shazam_timer") > 0.5;
        case "fiskheroes:super_speed":
            return entity.getData("mhp:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:flying");
    }
    return true;;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SUPER_SPEED":
            return (entity.getData("mhp:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:flying"));
        case "ENERGY_PROJECTION":
            return (entity.getData("mhp:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging"));
        case "CHARGED_BEAM":
            return (entity.getData("mhp:dyn/shazam_timer") > 0.5);
        default:
            return true;;
    }
}

function hasProperty(entity, property) {
    switch (property) {
        case "BREATHE_SPACE":
            return entity.getData("mhp:dyn/shazam_timer") > 0.5;
        default:
            return true;
    }
}