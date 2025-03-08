function init(hero) {
    hero.setName("Mind Stone");
    hero.setTier(2);
    
    hero.setChestplate(" ");

    hero.addPowers("misc:mind_stone");
    hero.addAttribute("PUNCH_DAMAGE", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", -1, 0);

    hero.addKeyBind("CHARGED_BEAM", "\u00A7eMind Stone Blast", 1);
}
