function init(hero) {
    hero.setName("Green Goblin");
    hero.setTier(8);

    hero.setHelmet("Mask");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:goblin_serum", "misc:goblin_glider");
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 0.3, 1);
    hero.addAttribute("SPRINT_SPEED", 0.5, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)

    hero.addKeyBind("UTILITY_BELT", "Pumpkin Grenade", 1);

    hero.setTickHandler(tick);
}

function tick(entity, manager){
    if (entity.getData("misc:dyn/fire_timer") == 0) {
        manager.setData(entity, "misc:dyn/fire", false);
    } else if (entity.getData("misc:dyn/fire_timer") == 1) {
        manager.setData(entity, "misc:dyn/fire", true);
    }
manager.incrementData(entity, "misc:dyn/fire_timer", 16, !entity.getData("misc:dyn/fire"));

}