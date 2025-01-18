var landing = implement("mhp:external/landing");
function init(hero) {
    hero.setName("Ezio");
    hero.setTier(2);

    hero.setHelmet("Hood")
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:ezio")
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4, 0);
    hero.addAttribute("SPRINT_SPEED", 0.3, 1);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("SLIDE", "Slide", 1);

    hero.addAttributeProfile("LANDING", landingProfile);
    hero.addAttributeProfile("SLIDE", SlidingProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTickHandler((entity, manager) => {
        var conds = entity.motionY() < -0.4 && !entity.isOnGround() && entity.isSprinting()
        landing.land(entity, manager);
        manager.incrementData(entity, "mhp:dyn/float_interp", 12, conds)

        if (entity.getData("mhp:dyn/float_interp") && !entity.isInWater() && entity.world().blockAt(entity.pos().add(0, 4 * entity.motionY(), 0)).isSolid() && !entity.getData("mhp:dyn/roll")) {
            manager.setDataWithNotify(entity, "mhp:dyn/roll", true);
        }
        if (entity.getData("mhp:dyn/roll_timer") === 1) {
            manager.setDataWithNotify(entity, "mhp:dyn/roll", false);
        } if (entity.getData("mhp:dyn/slide_timer") == 1) {
            manager.setDataWithNotify(entity, "mhp:dyn/slide", false);
        } if (entity.getData("mhp:dyn/slide") && entity.isOnGround() && !entity.isInWater()) { 
            manager.setDataWithNotify(entity, "fiskheroes:flying", true)
            manager.setData(entity, "fiskheroes:flight_boost_timer", 0.825);
        } else {
            manager.setDataWithNotify(entity, "fiskheroes:flying", false)
        }


        manager.incrementData(entity, "mhp:dyn/roll_timer", 14, entity.getData("mhp:dyn/roll"));
        manager.incrementData(entity, "mhp:dyn/sneaking_timer", 30, (entity.isSneaking() && entity.isOnGround() && !entity.getData("fiskheroes:moving")));
       /*  manager.incrementData(entity, "mhp:dyn/sneak_anim", 5, entity.getData("mhp:dyn/sneaking_timer") == 1); */
        manager.incrementData(entity, "mhp:dyn/sprinting", 7, entity.isSprinting() && entity.isOnGround())
    });
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SLIDE":
           return entity.isOnGround() && !entity.isInWater() && entity.isSprinting();
    }
return true;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
     case "fiskheroes:controlled_flight":
        return entity.getData("mhp:dyn/slide")
}
return true;
}

function landingProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("FALL_RESISTANCE", 10000.0, 0);
}

function SlidingProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 0.5, 1);
}



function getAttributeProfile(entity) {
    if (entity.getData("mhp:dyn/slide")) {
        return "SLIDE";
    } else if (entity.world().getBlock(entity.pos().add(0, -1, 0)) == "minecraft:hay_block") {
        return "LANDING";
    }
    return true;
}