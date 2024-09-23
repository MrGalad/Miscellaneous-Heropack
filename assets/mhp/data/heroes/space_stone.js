function init(hero) {
    hero.setName("Space");
    hero.setTier(2);
    
    hero.setChestplate("Stone");

    hero.addPowers("mhp:space_stone");
    hero.addAttribute("PUNCH_DAMAGE", 0.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", -2.5, 0);

    hero.addKeyBind("TELEKINESIS", "\u00A71Telekinesis", 2)
    hero.addKeyBindFunc("TELEPORT", teleport, "\u00A71Teleport", 3);
    hero.addKeyBind("SHIELD", "\u00A71Forcefield", 4);
}

function teleport(entity, manager) {
    manager.setData(entity, "fiskheroes:teleport_delay", 35)
    return true
}



