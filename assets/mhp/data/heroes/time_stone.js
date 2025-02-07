function init(hero) {
    hero.setName("Time Stone");
    hero.setTier(2);
    
    hero.setChestplate(" ");

    hero.addPowers("mhp:time_stone");
    hero.addAttribute("PUNCH_DAMAGE", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", -1.0, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);

    hero.addKeyBind("SLOW_MOTION", "\u00A72Decelerate Time", 2);
    hero.addKeyBind("SUPER_SPEED", "\u00A72Accelerate Own Time", 3);
}