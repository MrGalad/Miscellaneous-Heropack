function checkBlockInFront(entity) {
    var range = 1;

    var yawRad = (Math.PI / 180) * entity.rotYaw();

    var offsetX = Math.sin(yawRad);
    var offsetZ = -Math.cos(yawRad);

    var frontPos = [entity.posX() - offsetX * range, entity.posY(), entity.posZ() - offsetZ * range];

    var blockFront = entity.world().blockAt(Math.floor(frontPos[0]), Math.floor(frontPos[1]), Math.floor(frontPos[2])).isSolid();
    var block1 = entity.world().blockAt(Math.floor(frontPos[0]), Math.floor(frontPos[1]) + 1, Math.floor(frontPos[2])).isSolid();
    var block2 = entity.world().blockAt(Math.floor(frontPos[0]), Math.floor(frontPos[1]) + 2, Math.floor(frontPos[2])).isSolid();

    if (blockFront && block1 && block2) {
        return true;
    }
    return false;
}


var speedster_base = implement("fiskheroes:external/speedster_base");
function init(hero) {
    hero.setName("hero.fiskheroes.reverse_flash.name");
    hero.setAliases("rf");
    hero.setTier(5);

    hero.setHelmet("item.superhero_armor.piece.cowl");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:flash_ring");

    hero.addPowers("misc:negative_speed_force");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 5.0, 0);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    /* hero.addKeyBind("CHEST", "Chestburster", 3)
    hero.addKeyBind("ENERGY_PROJECTION", "Chestburster", -1) */
    hero.addKeyBind("VIBRATION", "Vibrate", 4)
    hero.addKeyBind("INTANGIBILITY", "Phase", 5);
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", -3);

    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");

    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));

    hero.addSoundEvent("MASK_OPEN", "fiskheroes:cowl_mask_open");
    hero.addSoundEvent("MASK_CLOSE", "fiskheroes:cowl_mask_close");
    hero.addSoundOverrides("NEGATIVE", speedster_base.mergeSounds("fiskheroes:speed_force", speedster_base.SOUNDS_NEGATIVE));

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);


      /*   if (checkBlockInFront(entity) && entity.isSprinting() && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
             manager.setData(entity, "fiskheroes:glide_flying", true); 
        }  */

        manager.incrementData(entity, "misc:dyn/float_interp", 10, 15, entity.getData("fiskheroes:intangible"))
        manager.incrementData(entity, "misc:dyn/chestburst_cd", 30, 20, entity.getData("fiskheroes:energy_projection"));
        if (entity.getInterpolatedData("misc:dyn/chestburst_cd") >= 0.2) {
            manager.setData(entity, "misc:dyn/charge", false);
        }
        // if(entity.getData("fiskheroes:energy_projection_timer") > 0.3){
        //     manager.setData(entity, "misc:dyn/charge", false)
        // } else 
        if (entity.getData("fiskheroes:speed_sprinting") != entity.getData("fiskheroes:energy_charging")) {
            manager.setData(entity, "fiskheroes:energy_charging", entity.getData("fiskheroes:speed_sprinting"));
        } else if (entity.getData("misc:dyn/vibration")) {
            manager.setData(entity, "misc:dyn/charge", false)
        }
    });
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.setModifierEnabled((entity, modifier) => {
        var Ycoord = Math.round(entity.posY()) - entity.posY()
        switch (modifier.name()) {
            case "fiskheroes:intangibility":
                return entity.getData("misc:dyn/vibration") && !entity.isOnGround() && entity.getData("misc:dyn/float_interp") != 1
          /*   case "fiskheroes:flight":
                checkBlockInFront(entity) &&
                    !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() &&
                    entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible"); */
            case "fiskheroes:propelled_flight":
            return checkBlockInFront(entity) && !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() && entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible");
            }
        return true
    })
    hero.addAttributeProfile("CHEST", chestProfile);
    hero.addAttributeProfile("SURVIVE", surviveProfile);

}

function surviveProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("FALL_RESISTANCE", 1, 1);
}

function chestProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -100000000000, 1);
    profile.addAttribute("JUMP_HEIGHT", -100000000000, 1);
}

function getProfile(entity) {
    if (entity.getData("fiskheroes:speeding") && entity.motionY() > -0.25) { 
        return "SURVIVE" 
    } else if (entity.getData("misc:dyn/charge")) {
        return "CHEST"
    }
    return null;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "CHEST":
            return !entity.getData("fiskheroes:speeding") && !entity.getData("misc:dyn/vibration")
        case "CHARGE_ENERGY":
            return entity.isSprinting() && entity.getData("fiskheroes:speeding") && entity.getData("fiskheroes:speed") >= 3;
        case "ENERGY_PROJECTION":
            return entity.getData("misc:dyn/charge") && !entity.getData("fiskheroes:speeding")
        case "INTANGIBILITY":
            return entity.getData("misc:dyn/vibration") && !entity.isOnGround()
        default:
            return true;
    }
}
