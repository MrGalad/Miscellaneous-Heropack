function init(hero) {
    hero.setName("Eren Yeager")
    hero.setTier(2);

    hero.setChestplate("Jacket");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:titan_transformation", "misc:odm_gear")
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.6, 1);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)

    hero.addKeyBind("TITAN", "Titan Shift", 1);
    hero.addKeyBind("BLADE", "Toggle Blades", 2);
    hero.addKeyBind("WEB_ZIP", "key.webZip", 3);
    hero.addKeyBind("HARDEN", "Harden Skin", 4);
     hero.addKeyBind("BOOST", "Boost", 5);

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("TITAN", titanProfile);
    /* hero.addAttributeProfile("BOOST", boostProfile); */
    hero.setTierOverride(getTierOverride);
    hero.setDamageProfile(getAttributeProfile);
    hero.addDamageProfile("BLADE", { "types": { "SHARP": 1.0 } });
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTickHandler((entity, manager) => {
        /* var swing = entity.getData("fiskheroes:swing_progress")
        PackLoader.printChat("swing: " + swing) */
        var cond = entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp2") < 1 && entity.getData("misc:dyn/float_interp1") > 0.2
        var titanOn = !(entity.getData("misc:dyn/float_interp1") > 0.2 /* && entity.getData("misc:dyn/float_interp1") < 1 */)
        manager.incrementData(entity, "misc:dyn/float_interp1", 50, entity.getData("misc:dyn/float_interp") > 0.8);
        manager.incrementData(entity, "misc:dyn/float_interp3", 30, entity.getData("fiskheroes:blade"));
        manager.setData(entity, "fiskheroes:size_state", titanOn ? -1 : 1);
        manager.setDataWithNotify(entity, "fiskheroes:web_swinging", entity.getData("fiskheroes:blade"));
        manager.incrementData(entity, "misc:dyn/sprinting", 7, entity.isSprinting() && entity.isOnGround())
        /* manager.incrementData(entity, "misc:dyn/eren_boost_timer", 20, entity.getData("fiskheroes:web_swinging_timer") == 1) */

        if (entity.getData("misc:dyn/float_interp1") > 0.8)
            manager.setData(entity, "misc:dyn/boolean1", true);

        if (!entity.getData("misc:dyn/boolean")) {
            manager.setData(entity, "misc:dyn/float_interp", 0);
            manager.setData(entity, "misc:dyn/float_interp1", 0);
            manager.setData(entity, "misc:dyn/float_interp2", 0);
            manager.setData(entity, "misc:dyn/boolean1", false);
            manager.setData(entity, "misc:dyn/boolean2", true);
        } if (entity.getData("misc:dyn/eren_boost_timer") == 1) {
            manager.setData(entity, "misc:dyn/eren_boost", false)
            manager.setData(entity, "misc:dyn/eren_boost_timer", 0)
            
        }  if (entity.getData("misc:dyn/eren_boost_timer") == 0 && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "fiskheroes:flying", false);
        } if (entity.getData("misc:dyn/eren_boost_timer") > 0 && !entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
    });
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:blade")) {
        return "BLADE"
    } /* else if (entity.getData("misc:dyn/eren_boost")) {
        return "BOOST"
    } */
    return true;
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
}

function titanProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 1, 1);
    profile.addAttribute("PUNCH_DAMAGE", 9, 0);
    profile.addAttribute("MAX_HEALTH", 1, 0);
    profile.addAttribute("WEAPON_DAMAGE", 5.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
}

/* function boostProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 3, 1);
    profile.addAttribute("BASE_SPEED", 3, 1);
    profile.addAttribute("FALL_RESISTANCE", 0.8, 1);
}
 */

function getTierOverride(entity) {
    return entity.getData("misc:dyn/float_interp1") ? 9 : 2;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return (!entity.isOnGround() && entity.isSprinting() /* && !entity.getData("fiskheroes:web_swinging_timer") */ && entity.getData("misc:dyn/eren_boost_timer") > 0)
        case "fiskheroes:web_swinging":
        case "fiskheroes:web_zip":
        case "fiskheroes:blade":
            return entity.getData("misc:dyn/float_interp1") < 0.5  

    }
    return true;
}


function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        /* case "TITAN": 
        return !entity.getData("fiskheroes:blade") */
        case "BLADE":
        case "WEB_ZIP":
            return entity.getData("misc:dyn/float_interp1") < 0.2 && entity.getData("misc:dyn/float_interp2") < 1 && !entity.getData("misc:dyn/boolean")
        /*  case "BOOST":
             return (!entity.isOnGround() && entity.getData("fiskheroes:moving") && entity.getData("fiskheroes:web_swinging")) */
    }
    return true;
}
