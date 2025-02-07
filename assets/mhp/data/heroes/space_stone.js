function init(hero) {
    hero.setName("Space Stone");
    hero.setTier(2);
    
    hero.setChestplate(" ");

    hero.addPowers("mhp:space_stone");
    hero.addAttribute("PUNCH_DAMAGE", 0.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", -2.5, 0);

    hero.addKeyBind("TELEKINESIS", "\u00A71Telekinesis", 2)
    hero.addKeyBind("AIM", "\u00A71Telekinesis", 2)
    hero.addKeyBind("TELEPORT","\u00A71Teleport", 3);
    hero.addKeyBind("SHIELD", "\u00A71Forcefield", 4);

    hero.supplyFunction("canAim", canAim)
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}



