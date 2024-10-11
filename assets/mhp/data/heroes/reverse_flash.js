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
    hero.addPrimaryEquipment("fiskheroes:flash_ring", true)

    hero.addPowers("mhp:negative_speed_force");
    hero.addAttribute("PUNCH_DAMAGE", 5.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 5.0, 0);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("CHEST", "Chestburster", 3)
    hero.addKeyBind("ENERGY_PROJECTION", "Chestburster", -1)
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


        manager.incrementData(entity, "mhp:dyn/float_interp", 10, 15, entity.getData("fiskheroes:intangible"))
        manager.incrementData(entity, "mhp:dyn/chestburst_cd", 30, 20, entity.getData("fiskheroes:energy_projection"));
        if (entity.getInterpolatedData("mhp:dyn/chestburst_cd") >= 0.2) {
            manager.setData(entity, "mhp:dyn/charge", false);
        }
        // if(entity.getData("fiskheroes:energy_projection_timer") > 0.3){
        //     manager.setData(entity, "mhp:dyn/charge", false)
        // } else 
        if (entity.getData("fiskheroes:speed_sprinting") != entity.getData("fiskheroes:energy_charging")) {
            manager.setData(entity, "fiskheroes:energy_charging", entity.getData("fiskheroes:speed_sprinting"));
        }
    });
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled((entity, modifier) => {
        var Ycoord = Math.round(entity.posY()) - entity.posY()
        switch (modifier.name()) {
            case "fiskheroes:propelled_flight":
                var Ycoord = Math.round(entity.posY()) - entity.posY();
                var facingX = Math.round(Math.cos(entity.rotYaw() * Math.PI / 180));
                var facingZ = Math.round(Math.sin(entity.rotYaw() * Math.PI / 160));
                return (
                    entity.world().blockAt(entity.pos().add(1, Ycoord, 0)).isSolid() ||
                    entity.world().blockAt(entity.pos().add(-1, Ycoord, 0)).isSolid() ||
                    entity.world().blockAt(entity.pos().add(0, Ycoord, 1)).isSolid() ||
                    entity.world().blockAt(entity.pos().add(0, Ycoord, -1)).isSolid()
                ) &&
                    !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() &&
                    entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible");
            case "fiskheroes:intangibility":
                return entity.getData("mhp:dyn/vibration") && !entity.isOnGround() && entity.getData("mhp:dyn/float_interp") != 1
            }
        return true
    });

    hero.setAttributeProfile(entity => /* !entity.isOnGround() || */ entity.getData("fiskheroes:speeding") && entity.motionY() > -0.25 ? "SURVIVE" : null);
    hero.addAttributeProfile("SURVIVE", profile => {
        profile.inheritDefaults();
        profile.addAttribute("FALL_RESISTANCE", 1, 1);
    });

}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "CHARGE_ENERGY":
            return entity.isSprinting() && entity.getData("fiskheroes:speeding") && entity.getData("fiskheroes:speed") >= 3;
        case "ENERGY_PROJECTION":
            return entity.getData("mhp:dyn/charge") && !entity.getData("fiskheroes:speeding")
        case "INTANGIBILITY":
            return entity.getData("mhp:dyn/vibration") && !entity.isOnGround()
        default:
            return true;
    }
}
