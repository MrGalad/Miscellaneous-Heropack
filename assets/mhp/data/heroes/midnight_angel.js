function init(hero) {
    hero.setName("Okoye");
    hero.setVersion("Midnight Angel")
    hero.setTier(7);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:mhp:staff}", true);

    hero.addPowers("mhp:midnight_angel");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.5, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 6, 0)

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.addDamageProfile("BLADE", {
        "types": {
            "VIBRANIUM": 5
        }
    });

    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "mhp:dyn/float_interp", 20, 6, entity.getHeldItem().nbt().getString("WeaponType") == "mhp:staff" && (!entity.getData("fiskheroes:moving") && !entity.isPunching() || !entity.getData("fiskheroes:flying") && entity.motionX() == 0 && entity.motionZ() == 0 && !entity.isPunching()));
   
        var flying = entity.getData("fiskheroes:flying");
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);

        var item = entity.getHeldItem();
        flying &= !entity.as("PLAYER").isUsingItem();
        manager.incrementData(entity, "fiskheroes:dyn/booster_r_timer", 2, flying && item.isEmpty() && !entity.isPunching() && entity.getData("fiskheroes:aiming_timer") == 0 && entity.getData("fiskheroes:blade_timer") == 0);
        manager.incrementData(entity, "fiskheroes:dyn/booster_l_timer", 2, flying && !item.doesNeedTwoHands());

    });
}
function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 15.5, 0);
}

function getProfile(entity) {
    if (entity.getHeldItem().nbt().getString("WeaponType") == "mhp:staff") {
        return "BLADE";
    }
    return null;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
     case "fiskheroes:water_breathing":
        return entity.getData("fiskheroes:mask_open_timer2") == 0
}
return true;
}