function init(hero) {
    hero.setName("Shadow Gem");
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

    hero.addKeyBind("NANITE_TRANSFORM", "Shadow Transform", 1)

}