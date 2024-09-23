function init(hero) {
    hero.setName("Reality");
    hero.setTier(2);
    
    hero.setChestplate("Stone");

    hero.addPowers("mhp:reality_stone");

    hero.addAttribute("PUNCH_DAMAGE", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", -1, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

    hero.addKeyBindFunc("func_GIANT_MODE", giantModeKey, "\u00A74Giant Mode", 1);
    hero.addKeyBind("SPELL_MENU", "\u00A74Spell Menu", 2);
    
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(1)
}

function isKeyBindEnabled(entity, keyBind) {
    if (entity.getData("fiskheroes:dyn/giant_mode")) return keyBind == "func_GIANT_MODE";

    return true;
}

function giantModeKey(player, manager) {
    
    var flag = player.getData("fiskheroes:dyn/giant_mode");
    manager.setData(player, "fiskheroes:dyn/giant_mode", !flag);
    
    manager.setData(player, "fiskheroes:size_state", flag ? -1 : 1);
    return true;
}