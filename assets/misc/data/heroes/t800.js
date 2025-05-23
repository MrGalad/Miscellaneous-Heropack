function init(hero) {
    hero.setName("Terminator (T-800)");
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:1887}", true);
    hero.addPrimaryEquipment("fiskheroes:beretta_93r", true);


    hero.addPowers("misc:robot_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.5, 1);
    hero.addAttribute("JUMP_HEIGHT", 0.3, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    hero.addKeyBind("SUPER_SPEED", "Toggle Bike", 2)

    hero.addSoundEvent("MASK_OPEN", "misc:termy_voice");
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(1.1);
    hero.setHasPermission((entity, permission) => permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_WINNY");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun() || entity.getHeldItem().nbt().getString("WeaponType") == "misc:1887");
    /* hero.setHasProperty((entity, property) => property == "MASK_TOGGLE"); */

    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "misc:dyn/holoanimation", 20, 20, entity.is("DISPLAY") && !entity.as("DISPLAY").isStatic() && entity.as("DISPLAY").getDisplayType() === "HOLOGRAM");
    })

    function isKeyBindEnabled(entity, keyBind) {
        switch (keyBind) {
            case "GUN_RELOAD":
                return entity.getHeldItem().nbt().getString("WeaponType") == "misc:1887" && !entity.getData("fiskheroes:aiming");
            default:
                return true;
        }
    }
}