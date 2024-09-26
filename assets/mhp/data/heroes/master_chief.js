var cortana = implement("mhp:external/cortana_2");

function init(hero) {
    hero.setName("Master Chief");
    hero.setTier(8);

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:mhp:ma5c}", true);
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:mhp:ener}", true);

    hero.addPowers("mhp:mjolnir_armor", "mhp:cortana");
    hero.addAttribute("PUNCH_DAMAGE", 9.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 0.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 5, 0)

    hero.addKeyBind("AIM", "key.aim", -1);
   /*  hero.addKeyBind("GUN_RELOAD", "key.reload", 1); */
    hero.addKeyBind("ENERGY", "Activate Blade", 2);
    hero.addKeyBind("SHADOWDOME", "Mob Scan", 2);
    hero.addKeyBindFunc("SLOT", slotChange, "Change Gadget", 3)
    hero.addKeyBind("WEB_ZIP", "Grappleshot", 4);
    hero.addKeyBind("NIGHT_VISION", "Toggle Night Vision", 4);
    hero.addKeyBind("TOGGLE_SHIELD", "Toggle Overshield", 4);
    hero.addKeyBindFunc("func_CORTANA", cortanaOn, "Toggle Cortana", 5);
    //hero.addKeyBind("TOGGLE_GRAPPLE", "Toggle Grapplehook", 5)

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
            "ENERGY": 5
        }
    });
    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE"); 
    hero.setDefaultScale(1.25);
    hero.setHasPermission((entity, permission) => permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_MA5C" || permission == "USE_PLASMA");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun() || entity.getHeldItem().nbt().getString("WeaponType") == "mhp:ma5c");

    hero.setTickHandler((entity, manager) => {
        if (entity.getData("fiskheroes:shield_cooldown") > 0 && entity.getData("mhp:dyn/boolean")) {
            manager.setData(entity, "mhp:dyn/boolean", false)
        }
        if (entity.getData("mhp:dyn/boolean") != "fiskheroes:shield" || entity.getData("fiskheroes:shield_blocking")) {
            manager.setData(entity, "fiskheroes:shield", entity.getData("mhp:dyn/boolean"))
            manager.setData(entity, "fiskheroes:shield_blocking", entity.getData("mhp:dyn/boolean"))
        }
    
        cortana.health(entity, manager);
        cortana.warning(entity, manager)
        cortana.EntityScan(entity, manager)
        cortana.retrieveinDome(entity)

    })
}

function cortanaOn(player, manager) {
    var cortanaEnabled = player.getData("mhp:dyn/cortana");
    var state;
  
    if (cortanaEnabled) {
      state = "Goodbye";
    } else {
      state = "Hello";
    }
  
    manager.setData(player, "mhp:dyn/cortana", !cortanaEnabled);
    PackLoader.printChat("\u00A73<Cortana>\u00A7b " + state + " Master Chief ");
    return false;
  }

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 15.5, 0);
    profile.addAttribute("JUMP_HEIGHT", 2, 0);
}

function getProfile(entity) {
    if (entity.getData("mhp:dyn/energy") && entity.getHeldItem().nbt().getString("WeaponType") == "mhp:ener") {
        return "BLADE";
    }
    return null;
}


function slotChange(entity, manager) {
    var slot = entity.getData("mhp:dyn/slot");
    manager.setData(entity, "mhp:dyn/slot", (slot + 1) % 3);
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    // if (keyBind == "SHIELD") {return entity.getData("fiskheroes:shield_cooldown" == 0)}
    var slot = entity.getData("mhp:dyn/slot");
    switch (keyBind) {
        case "ENERGY":
            return entity.getHeldItem().nbt().getString("WeaponType") == "mhp:ener" &&  !entity.isSneaking()
        case "SLOT":
            return true
        case "WEB_ZIP":
            return slot == 0;
        case "TOGGLE_GRAPPLE":
            return slot == 0;
        case "NIGHT_VISION":
            return slot == 1;
        case "TOGGLE_SHIELD":
            return entity.getData("fiskheroes:shield_cooldown") == 0 && slot == 2;
        case "GUN_RELOAD":
            return entity.getHeldItem().isGun() && !entity.getData("fiskheroes:aiming");
        case "func_CORTANA":
            return entity.isSneaking();
            case "SHADOWDOME":
                return entity.isSneaking() && entity.getData("mhp:dyn/mob_timer") == 0 && entity.getData("mhp:dyn/cortana");
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        /*  case "fiskheroes:web_zip":
              return entity.getData("mhp:dyn/grapple")*/
        case "fiskheroes:regeneration":
            return !entity.isSprinting();
    }
    return true;
}