function init(hero) {
    hero.setName("Soul Stone");
    hero.setTier(2);
    
    hero.setChestplate(" ");

    hero.addPowers("mhp:soul_stone");
    hero.addAttribute("PUNCH_DAMAGE", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", -1.0, 0);

    hero.addKeyBind("REGEN_TRANSFORM", "\u00A76Regeneration", 2);
    hero.addKeyBind("REGEN", "\u00A76\u00A7mRegeneration", 2);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:healing_factor":
            return entity.getData("fiskheroes:dyn/steeled");
        default:
            break;
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "REGEN_TRANSFORM":
            return entity.getData("fiskheroes:time_since_damaged") > 20.0;

        case "REGEN":
            return entity.getData("fiskheroes:time_since_damaged") <= 20.0;
    }
    return true
}