function init(hero) {
    hero.setName("Mind");
    hero.setTier(2);
    
    hero.setChestplate("Stone");

    hero.addPowers("mhp:mind_stone");
    hero.addAttribute("PUNCH_DAMAGE", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", -1, 0);

    hero.addKeyBind("CHARGED_BEAM", "\u00A7eMind Stone Blast", 1);
}
