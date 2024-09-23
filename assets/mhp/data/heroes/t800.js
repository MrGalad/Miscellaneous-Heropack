function init(hero) {
    hero.setName("Terminator (T-800)");
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:fisktag:1887}", true);
    hero.addPrimaryEquipment("fiskheroes:beretta_93r", true);


    hero.addPowers("mhp:robot_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.5, 1);
    hero.addAttribute("JUMP_HEIGHT", 0.3, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    hero.addKeyBind("SUPER_SPEED", "Toggle Bike", 2);
   // hero.addKeyBind("REPAIR", "Repair Suit", 3)

  /*  hero.addAttributeProfile("FIX", fixProfile);
    hero.addAttributeProfile("POINTSEVEN", pointsevenProfile);
    hero.addAttributeProfile("POINTSIX", pointsixProfile);
    hero.addAttributeProfile("HALF", halfProfile);
    hero.addAttributeProfile("POINTFOUR", pointfourProfile);
    hero.addAttributeProfile("END", pointendProfile);
    hero.setAttributeProfile(getAttributeProfile);*/
    hero.addSoundEvent("MASK_OPEN", "mhp:termy_voice");
    hero.setKeyBindEnabled(isKeyBindEnabled);
   // hero.setModifierEnabled(isModifierEnabled);
    hero.setDefaultScale(1.1);
    hero.setHasPermission((entity, permission) => permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_WINNY");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun() || entity.getHeldItem().name() == "fisktag:weapon");
    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");

    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "mhp:dyn/holoanimation", 20, 20, entity.is("DISPLAY") && !entity.as("DISPLAY").isStatic() && entity.as("DISPLAY").getDisplayType() === "HOLOGRAM");
     /*   var time = 20;
        if (entity.getData("mhp:dyn/worn_suit") < 10) {
            manager.setData(entity, "mhp:dyn/worn_suit", entity.getData("mhp:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("mhp:dyn/worn_suit") > time / 5 && !entity.getData("mhp:dyn/repair")) {
            manager.setData(entity, "mhp:dyn/repair", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("mhp:dyn/repair")) {
            manager.setData(entity, "mhp:dyn/repair", false);
        }
  */  })


/*function fixProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -1000000, 1);
    profile.addAttribute("JUMP_HEIGHT", -100000, 1);
    profile.addAttribute("BASE_SPEED", -100000, 1);
}
function pointsevenProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -0.12, 1);
    profile.addAttribute("JUMP_HEIGHT", -0.1, 1);
    profile.addAttribute("BASE_SPEED", -0.1, 1);
}
function pointsixProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -0.13, 1);
    profile.addAttribute("JUMP_HEIGHT", -0.1, 1);
    profile.addAttribute("BASE_SPEED", -0.02, 1);
}
function halfProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -0.2, 1);
    profile.addAttribute("JUMP_HEIGHT", -0.5, 1);
    profile.addAttribute("BASE_SPEED", -0.03, 1);
}
function pointfourProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -0.3, 1);
    profile.addAttribute("JUMP_HEIGHT", -0.1, 1);
    profile.addAttribute("BASE_SPEED", -0.02, 1);
}
function pointendProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -0.7, 1);
    profile.addAttribute("JUMP_HEIGHT", -1, 1);
    profile.addAttribute("BASE_SPEED", -0.7, 1);
}

function getAttributeProfile(entity) {
    if (entity.getData("mhp:dyn/transformation_timer") > 0.5) {
        return "FIX";
    } else if (entity.getData("mhp:dyn/repair_charge") >= 0.9) {
        return "END";
    } else if (entity.getData("mhp:dyn/repair_charge") >= 0.7) {
        return "POINTFOUR";
    } else if (entity.getData("mhp:dyn/repair_charge") >= 0.5) {
        return "HALF";
    } else if (entity.getData("mhp:dyn/repair_charge") >= 0.4) {
        return "POINTSIX";
    } else if (entity.getData("mhp:dyn/repair_charge") >= 0.3) {
        return "POINTSEVEN";
    }
    return null;
}*/



function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "GUN_RELOAD":
            return entity.getHeldItem().isGun() && !entity.getData("fiskheroes:aiming");
        default:
            return true;
    }
}

/*function isModifierEnabled(entity, modifier) {
    var condition = entity.getData("mhp:dyn/transformation")
    return modifier.name() == "fiskheroes:cooldown" ? modifier.id() == "one" && !condition || modifier.id() == "two" && condition : true
}*/
}