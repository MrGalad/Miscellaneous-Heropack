function init(hero) {
    hero.setName("Metallo");
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:cyborg_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("HEAT_VISION", "Optic Blast", 1);
    hero.addKeyBind("CHARGED_BEAM", "Kryptonite Energy Blast", 2);

    hero.setKeyBindEnabled((entity, keyBind) => {
        switch (keyBind) {
            case "HEAT_VISION":
                return !entity.getData("fiskheroes:beam_charging");
                case "CHARGED_BEAM":
                    return !entity.getData("fiskheroes:heat_vision")
        }
        return true
    })
}