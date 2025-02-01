var utils = implement("fiskheroes:external/utils");

function init(hero) {
    hero.setName("Doorman");
    hero.setTier(7);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:darkforce_energy");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("INTANGIBILITY", "Intangibility", 1);
    hero.addKeyBind("TELEPORT", "Teleport", 2);
    hero.addKeyBind("NANITE_TRANSFORM", "Transform", 3);
   

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTierOverride(getTierOverride);
    hero.setAttributeProfile(getProfile);
    hero.addAttributeProfile("INACTIVE", inactiveProfile);
    hero.setTickHandler((entity, manager) => {
       /*  manager.incrementData(entity, "mhp:dyn/float_interp", 10, 15, entity.getData("mhp:dyn/transformation_timer"))
        if ((entity.getData("mhp:dyn/transformation_timer") == 1)) {
            manager.setData(entity, "mhp:dyn/float_interp", 0)
        } */

        utils.flightOnIntangibility(entity, manager);
      if (!entity.getData("mhp:dyn/transformation")) {
        manager.setData(entity, "fiskheroes:intangible", false)
    } else if (!entity.getData("mhp:dyn/transformation")) {
        manager.setData(entity, "fiskheroes:controlled_flight", false)
    }
    });
}

function getTierOverride(entity) {
    return entity.getData("mhp:dyn/transformation") ? 7 : 1;
}

function inactiveProfile(profile) {
    profile.revokeAugments();
}

function getProfile(entity) {
    if (!entity.getData("mhp:dyn/transformation") > 0) {
        return "INACTIVE";
    }
    return null;
}


function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
     case "TELEPORT":
        return entity.getData("mhp:dyn/transformation") && !entity.getData("fiskheroes:intangible") && !entity.isSneaking();
    case "INTANGIBILITY":
            return entity.getData("mhp:dyn/transformation");
}
return true;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return entity.getData("mhp:dyn/transformation");
            case "fiskheroes:intangible":
                return entity.getData("mhp:dyn/transformation")
}
return true;
}