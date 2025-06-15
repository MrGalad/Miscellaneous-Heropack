function init(hero) {
    hero.setName("Necklace");
    hero.setTier(5);

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:necklace");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.6, 1);
    hero.addAttribute("WEAPON_DAMAGE", 2, 0)

    hero.addKeyBind("TELEKINESIS", "Telekinesis", 1)
    hero.addKeyBind("INVIS", "Invisibility", 2)
    hero.addKeyBind("NIGHT_VISION", "Test", 3)
    hero.addKeyBind("ENERGY_PROJECTION", "Energy Beam", 4);
    /* hero.addKeyBind("INVISIBILITY", "Invisibility", 2)
    hero.addKeyBind("CHARGED_BEAM", "Psionic Blast", 3) */

    hero.setKeyBindEnabled(isKeyBindEnabled)
    hero.addAttributeProfile("FIRST", first);
    hero.addAttributeProfile("SECOND", second);
    hero.addAttributeProfile("THIRD", third);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);

    hero.setTickHandler((entity, manager) => {
        scanNumber(entity)
    })
}

function scanNumber(entity) {
    if (entity.isAlive()) {
        var range = 25;
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), range);
        var new_list = [];
        list.forEach(other => {
            if (other.isLivingEntity() && !entity.equals(other)) {
                new_list.push("yeh");
            }
        });
    }
    return new_list.length
}


function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "TELEKINESIS":
            return scanNumber(entity) >= 2
        case "INVIS":
            return scanNumber(entity) >= 4
    }
    return true;
}

function first(profile) {
    /* profile.revokeAugments() */;
    profile.addAttribute("SPRINT_SPEED", 0.8, 1);
    profile.addAttribute("PUNCH_DAMAGE", 5, 0);
    profile.addAttribute("MAX_HEALTH", 2, 0);
    profile.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
}

function second(profile) {
    /* profile.revokeAugments() */;
    profile.addAttribute("SPRINT_SPEED", 1, 1);
    profile.addAttribute("PUNCH_DAMAGE", 6, 0);
    profile.addAttribute("MAX_HEALTH", 4, 0);
    profile.addAttribute("WEAPON_DAMAGE", 6, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
}

function third(profile) {
    /* profile.revokeAugments() */;
    profile.addAttribute("SPRINT_SPEED", 1.2, 1);
    profile.addAttribute("PUNCH_DAMAGE", 10, 0);
    profile.addAttribute("MAX_HEALTH", 6, 0);
    profile.addAttribute("WEAPON_DAMAGE", 9, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
}

function getAttributeProfile(entity) {
    if (scanNumber(entity) >= 7) {
        return "THIRD";
    } else if (scanNumber(entity) >= 5) {
        return "SECOND";
    } else if (scanNumber(entity) >= 3) {
        return "FIRST";
    }
    return true;
}