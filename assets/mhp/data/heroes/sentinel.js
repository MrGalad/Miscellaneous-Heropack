function init(hero) {
    hero.setName("Sentinel");
    hero.setVersion("Days Of Future Past")
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:robot_physiology_dofp");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("CHARGED_BEAM", "Energy Blast", 1);
    //hero.addKeyBind("ENERGY_PROJECTION", "Energy Blast", 1);

   // hero.addSoundEvent("MASK_OPEN", "fiskheroes:iron_man_mask_open");
   // hero.addSoundEvent("MASK_CLOSE", "fiskheroes:iron_man_mask_close");
    hero.setDefaultScale(2.5);
   // hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");
    hero.setKeyBindEnabled((entity, keyBind) => {
        switch (keyBind) {
           // case "ENERGY_PROJECTION":
              //  return !entity.getData("fiskheroes:beam_charging") && entity.getData("fiskheroes:mask_open");
                case "CHARGED_BEAM":
                    return !entity.getData("fiskheroes:energy_projection") && !entity.getData("fiskheroes:mask_open");
        }
        return true
    })
}