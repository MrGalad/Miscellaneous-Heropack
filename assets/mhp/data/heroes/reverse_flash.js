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
    hero.addKeyBind("CHARGED_BEAM", "Chestburster", 3)
    hero.addKeyBind("VIBRATION", "Vibrate", 4)
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", -3);

    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");

    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));

    hero.addSoundEvent("MASK_OPEN", "fiskheroes:cowl_mask_open");
    hero.addSoundEvent("MASK_CLOSE", "fiskheroes:cowl_mask_close");
    hero.addSoundOverrides("NEGATIVE", speedster_base.mergeSounds("fiskheroes:speed_force", speedster_base.SOUNDS_NEGATIVE));

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        });
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled((entity, modifier) => {
        var Ycoord = Math.round(entity.posY()) - entity.posY()
        switch (modifier.name()) {
       /*  case "fiskheroes:propelled_flight":
            return entity.getData("mhp:dyn/boolean") */
            case "fiskheroes:propelled_flight":
                var Ycoord = Math.round(entity.posY()) - entity.posY();
                var facingX = Math.round(Math.cos(entity.rotYaw() * Math.PI / 135));
                var facingZ = Math.round(Math.sin(entity.rotYaw() * Math.PI / 135));
                if (Math.abs(facingX) > Math.abs(facingZ)) {
                    return (
                        entity.world().blockAt(entity.pos().add(facingX, Ycoord, 0)).isSolid()
                    ) &&
                    !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() && 
                    entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible");
                } else {
                    return (
                        entity.world().blockAt(entity.pos().add(0, Ycoord, -facingZ)).isSolid()
                    ) &&
                    !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() && 
                    entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible");
                }

    
    /*  case "fiskheroes:flight":
            return (entity.motionY() > -0.25 && entity.world().blockAt(entity.pos().add(0, Ycoord, 1)).isSolid() ||
            entity.world().blockAt(entity.pos().add(0, Ycoord, 1)).isSolid() ||
            entity.world().blockAt(entity.pos().add(0, Ycoord, 1)).isSolid() ||
            entity.world().blockAt(entity.pos().add(0, Ycoord, 1)).isSolid()) &&
            !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater() && 
            entity.getData("fiskheroes:speeding") && !entity.getData("fiskheroes:intangible") /* entity.getData("mhp:dyn/boolean") &&  NIGGER NIGGER && entity.getData("fiskheroes:speeding") && entity.motionY() > 0.25;
  */      /*  default:
            return true; */
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
            return entity.getData("fiskheroes:speeding") && entity.motion().length() >= 1.5 && entity.getHeldItem().isEmpty();
    default:
            return true;
}
}
