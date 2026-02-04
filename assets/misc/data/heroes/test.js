function init(hero) {
    hero.setName("test");
    hero.setTier(10);

    hero.setHelmet("item.superhero_armor.piece.cowl");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:test");
    hero.addAttribute("PUNCH_DAMAGE", 60.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 5.0, 0);

/*     hero.addKeyBindFunc("TP", teleportBehindTarget, "TP", 1); */
     hero.setTickHandler((entity, manager) => {
        if (entity.getData("misc:dyn/slide_timer") == 1) {
            manager.setData(entity, "misc:dyn/slide", false)
            manager.setData(entity, "misc:dyn/slide_timer", 0)
        } 
    })
}