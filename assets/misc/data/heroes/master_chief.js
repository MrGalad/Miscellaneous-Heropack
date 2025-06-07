var cortana = implement("misc:external/cortana_2");

function init(hero) {
    hero.setName("Master Chief");
    hero.setTier(8);

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:ma5c}", true, item => item.nbt().getString("WeaponType") == 'misc:ma5c');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:ener}", true, item => item.nbt().getString("WeaponType") == 'misc:ener');

    hero.addPowers("misc:mjolnir_armor", "misc:cortana");
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
    hero.addKeyBindFunc("RUNN", run , "Run Diagnostics", 4);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 5);
    hero.addKeyBindFunc("func_CORTANA", cortanaOn, "Toggle Cortana", 1);
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
    /* hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");  */
    hero.setDefaultScale(1.25);
    hero.setHasPermission((entity, permission) => permission == "USE_FISKTAG_GUN" || permission == "USE_GUN" || permission == "USE_MA5C" || permission == "USE_PLASMA");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun() || entity.getHeldItem().nbt().getString("WeaponType") == "misc:ma5c");

    hero.setTickHandler((entity, manager) => {
        if (entity.getData("fiskheroes:shield_cooldown") > 0 && entity.getData("misc:dyn/boolean")) {
            manager.setData(entity, "misc:dyn/boolean", false)
        }
        if (entity.getData("misc:dyn/boolean") != "fiskheroes:shield" || entity.getData("fiskheroes:shield_blocking")) {
            manager.setData(entity, "fiskheroes:shield", entity.getData("misc:dyn/boolean"))
            manager.setData(entity, "fiskheroes:shield_blocking", entity.getData("misc:dyn/boolean"))
        } if (entity.getData("misc:dyn/float_interp1") == 1) {
            manager.setData(entity, "misc:dyn/run", false)
        } 

        
    
        cortana.health(entity, manager);
        cortana.warning(entity, manager)
        cortana.EntityScan(entity, manager)
        cortana.retrieveinDome(entity)

    })
}
function run(entity) {
    var cortanaEnabled = entity.getData("misc:dyn/cortana");
    var armor = (1024 - entity.getWornChestplate().damage());
    var health = (Math.round(entity.getHealth() * 10) / 10);
    var damage = (0 + entity.getWornChestplate().damage());

    if (cortanaEnabled && !entity.getData("misc:dyn/float_interp1")) {
        PackLoader.printChat("\u00A73<Cortana>\u00A7b Health: " + health);
        PackLoader.printChat("\u00A73<Cortana>\u00A7b Overall Armor Health: " + armor + " / 1024");
        PackLoader.printChat("\u00A73<Cortana>\u00A7b Total Damage Received: " + damage);
        entity.playSound("minecraft:random.orb", 4, 1);
    }
    return true;
}

function cortanaOn(player, manager) {
    var cortanaEnabled = player.getData("misc:dyn/cortana");
    var state;
  
    if (cortanaEnabled) {
      state = "Goodbye";
    } else {
      state = "Hello";
      player.playSound("minecraft:random.orb", 4, 1);
    }
  
    manager.setData(player, "misc:dyn/cortana", !cortanaEnabled);
    PackLoader.printChat("\u00A73<Cortana>\u00A7b " + state + " Master Chief ");
    return false;
  }

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 15.5, 0);
}

function getProfile(entity) {
    if (entity.getData("misc:dyn/energy") && entity.getHeldItem().nbt().getString("WeaponType") == "misc:ener") {
        return "BLADE";
    }
    return null;
}


function slotChange(entity, manager) {
    var slot = entity.getData("misc:dyn/slot");
    manager.setData(entity, "misc:dyn/slot", (slot + 1) % 3);
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    // if (keyBind == "SHIELD") {return entity.getData("fiskheroes:shield_cooldown" == 0)}
    var slot = entity.getData("misc:dyn/slot");
    switch (keyBind) {
        case "ENERGY":
            return entity.getHeldItem().nbt().getString("WeaponType") == "misc:ener" &&  !entity.isSneaking()
        case "SLOT":
            return true
        case "WEB_ZIP":
            return slot == 0 && entity.getHeldItem().isEmpty() && !entity.isSneaking();
        case "TOGGLE_GRAPPLE":
            return slot == 0 && !entity.isSneaking();
        case "NIGHT_VISION":
            return slot == 1 && !entity.isSneaking();
        case "TOGGLE_SHIELD":
            return entity.getData("fiskheroes:shield_cooldown") == 0 && slot == 2 && !entity.isSneaking();
        case "GUN_RELOAD":
            return entity.getHeldItem().nbt().getString("WeaponType") == "misc:ma5c" && !entity.getData("fiskheroes:aiming");
        case "func_CORTANA":
            return entity.isSneaking();
            case "SHADOWDOME":
            return entity.isSneaking() && entity.getData("misc:dyn/mob_timer") == 0 && entity.getData("misc:dyn/cortana");
            case "RUNN":
            return entity.isSneaking() && !entity.getData("misc:dyn/float_interp1") && entity.getData("misc:dyn/cortana");
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        /*  case "fiskheroes:web_zip":
              return entity.getData("misc:dyn/grapple")*/
        case "fiskheroes:regeneration":
            return !entity.isSprinting();
    }
    return true;
}