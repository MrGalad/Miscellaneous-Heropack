function init(hero) {
    hero.setName("Ezio");
    hero.setTier(2);

    hero.setHelmet("Hood")
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4, 0);
    hero.addAttribute("SPRINT_SPEED", 0.2, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

}