function init(hero) {
    hero.setName("Robocop");
    hero.setTier(7);

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fiskheroes:beretta_93r", true);
    hero.addPrimaryEquipment("fiskheroes:desert_eagle", true);

    hero.addPowers("misc:human_robot_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", -0.10, 1);
    hero.addAttribute("JUMP_HEIGHT", 0.3, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2, 0)

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);

    hero.addSoundEvent("STEP", "fiskheroes:iron_man_walk");
    hero.addSoundEvent("MASK_OPEN", "misc:robocop_voice");
    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");
	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setHasPermission((entity, permission) => permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_WINNY");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun() || entity.getHeldItem().name() == "fisktag:weapon");

    hero.setTickHandler((entity, manager) => {
        var flying = entity.getData("fiskheroes:flying");
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);
    })
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
	case "GUN_RELOAD":
		return entity.getHeldItem().isGun() && !entity.getData("fiskheroes:aiming");
        default:
		return true;
    }
}