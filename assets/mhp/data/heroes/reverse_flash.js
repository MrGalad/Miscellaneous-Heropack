var speedster_base = implement("fiskheroes:external/speedster_base");

function getDirection(vector2d) {
    var yaw = (vector2d.y() + 180) % 360 - 180
    var snappedYaw = Math.round(yaw / 90) * 90;
    return {
        0: "South",
        90: "West",
        180: "North",
        "-180": "North",
        "-90": "East"
    }
    [snappedYaw] || null;
}
function lookingAtWall(entity) {
    var direction = getDirection(entity.rotation());
    var block = (x, y, z) => {
        return entity.world().blockAt(entity.pos().add(x, y, z)).isSolid();
    };
    var bWall = (x, y, z) => {
        var yaw = -entity.rotYaw() * (Math.PI / 180); 
        var offsetX = [0.2, 0.6].map(value => value * Math.sin(yaw));
        var offsetZ = [0.2, 0.6].map(value => value * Math.cos(yaw)); 
        return block(offsetX[0] + x, y, offsetZ[0] + z) && block(offsetX[1] + x, y, offsetZ[1] + z);
    }
    var wall = (x, z) => {
        var ceiling = !block(0, 1, 0) && !block(0, 2, 0) && !block(0, 3, 0) && !block(0, 4, 0) && !block(0, 5, 0) && !block(0, 6, 0);
        var wall = ceiling && bWall(x, 0, z) && bWall(x, 1, z) && bWall(x, 2, z) && bWall(x, 3, z) && bWall(x, 4, z);
        var wallWhenTrue = !bWall(0, 1, 0) && !bWall(0, 2, 0) && bWall(x, 1, z);

        return entity.getData("mhp:dyn/boolean") ? wallWhenTrue : wall;
    };
    var factor = 0.2;
    return direction == "East" && wall(factor, 0) || direction == "West" && wall(-factor, 0) || direction == "South" && wall(0, factor) || direction == "North" && wall(0, -factor);
}

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
    hero.addKeyBind("CHARGE_ENERGY", "Lightning Throw", -2);

    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE");

    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));

    hero.addSoundEvent("MASK_OPEN", "fiskheroes:cowl_mask_open");
    hero.addSoundEvent("MASK_CLOSE", "fiskheroes:cowl_mask_close");
    hero.addSoundOverrides("NEGATIVE", speedster_base.mergeSounds("fiskheroes:speed_force", speedster_base.SOUNDS_NEGATIVE));

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        var wallRun = lookingAtWall(entity) && !entity.isOnGround() && entity.motionY() > -0.25;

            if (entity.getData("mhp:dyn/boolean") != wallRun) {
                manager.setData(entity, "mhp:dyn/boolean", wallRun);
            }
            if (entity.getData("mhp:dyn/boolean") && !entity.getData("mhp:dyn/boolean2")) {
                manager.setData(entity, "mhp:dyn/boolean2", true);
            } else if (entity.getData("mhp:dyn/boolean2") && entity.isOnGround()) {
                manager.setData(entity, "mhp:dyn/boolean2", false);
            }

            manager.incrementData(entity, "mhp:dyn/float_interp_animation", 5, entity.getData("mhp:dyn/boolean") && entity.motionY() > 0.15);
            manager.incrementData(entity, "mhp:dyn/float", 5, entity.getData("mhp:dyn/boolean2"));
        });
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled((entity, modifier) => {
        switch (modifier.name()) {
        case "fiskheroes:propelled_flight":
            return entity.getData("mhp:dyn/boolean");
        case "fiskheroes:flight":
            return entity.getData("mhp:dyn/boolean") && entity.getData("fiskheroes:speeding") && entity.motionY() > 0.25;
        default:
            return true;
        }
    });

    hero.setAttributeProfile(entity => entity.getData("mhp:dyn/float") > 0 ? "SURVIVE" : null);
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
