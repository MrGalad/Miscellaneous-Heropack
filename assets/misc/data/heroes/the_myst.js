function init(hero) {
    hero.setName("The Myst");
    hero.setTier(6);
    
    hero.setHelmet("item.superhero_armor.piece.hood");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addAttribute("PUNCH_DAMAGE", 7, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.3, 0);
    hero.addAttribute("FALL_RESISTANCE", 0.30, 1);
    
}