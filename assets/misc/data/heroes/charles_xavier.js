function init(hero) {
    hero.setName("Charles Xavier");
    hero.setTier(5);

    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:telepathy");
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 0, 1);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    hero.addAttribute("BASE_SPEED", -0.3, 1)
    hero.addAttribute("JUMP_HEIGHT", -2, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1, 0)

    hero.addKeyBind("TELEKINESIS", "Telekinesis", 1)
    hero.addKeyBind("TELE", "Telekinesis", 1)
    /* hero.addKeyBind("AIM", "Telekinesis", 1) */
    hero.addKeyBind("INVIS", "Invisibility", 2)
    hero.addKeyBind("INVISIBILITY", "Invisibility", 2)
    hero.addKeyBind("CHARGED_BEAM", "Psionic Blast", 3)

    hero.supplyFunction("canAim", canAim);
    hero.setKeyBindEnabled(isKeyBindEnabled)
   // hero.addSoundEvent("STEP", "misc:wheel")

    hero.setTickHandler((entity, manager) => {
        if (entity.getData("misc:dyn/float_interp") > 0.9) {
            manager.setData(entity, "fiskheroes:invisible", true)
        } else if (entity.getData("misc:dyn/float_interp") < 0.9) {
            manager.setData(entity, "fiskheroes:invisible", false)
        } if (entity.getData("misc:dyn/tele_timer") > 0.8) {
            manager.setData(entity, "fiskheroes:telekinesis", true)
        } else if (entity.getData("misc:dyn/tele_timer") < 0.8) {
            manager.setData(entity, "fiskheroes:telekinesis", false)
        }
        var angle = entity.rotYaw() * Math.PI / 180;
        var offset = entity.motionZ() * Math.cos(angle) - entity.motionX() * Math.sin(angle);
        manager.setData(entity, "misc:dyn/wheel_timer", entity.getData("misc:dyn/wheel_timer") + offset);
    })
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "TELEKINESIS":
            return !entity.getData("fiskheroes:beam_charging") && !entity.getData("misc:dyn/boolean") && entity.getHeldItem().isEmpty() /* && !entity.getData("fiskheroes:invisible") */;
        case "TELE":
            return !entity.getData("fiskheroes:beam_charging") && !entity.getData("misc:dyn/boolean") && entity.getHeldItem().isEmpty()/*  && !entity.getData("fiskheroes:invisible") */;
        case "INVIS":
            return !entity.getData("fiskheroes:beam_charging") && !entity.getData("misc:dyn/tele") && entity.getHeldItem().isEmpty();
        case "INVISIBILITY":
            return !entity.getData("fiskheroes:beam_charging") && !entity.getData("misc:dyn/tele") && entity.getHeldItem().isEmpty();
        case "CHARGED_BEAM":
            return !entity.getData("fiskheroes:aiming") && !entity.getData("misc:dyn/boolean") && !entity.getData("fiskheroes:telekinesis") && entity.getHeldItem().isEmpty();
    }
    return true;
}