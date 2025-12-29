var landing = implement("misc:external/superhero_landing");
function init(hero) {
    hero.setName("Mecha-Man");
    hero.setVersion("Dispatch");
    hero.setTier(9);

    hero.setChestplate("Nuclear Reactor");

    hero.setDefaultScale(4);

    hero.addPowers("misc:mecha")
    hero.addAttribute("PUNCH_DAMAGE", 12, 0);
    hero.addAttribute("SPRINT_SPEED", 0.70, 1)
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);

    hero.addKeyBind("BLADE2", "Deploy Chainswords", 1);
    hero.addKeyBind("DISABLE_PUNCH", "Disable Punch Attack", -1);
    hero.addKeyBind("BOAT", "Equip Boat", 4);


    hero.addAttributeProfile("CHAINSWORDS", chainswordsProfile);
    hero.addAttributeProfile("SPEEDING", speedProfile);
    hero.addAttributeProfile("CHAINSPEED", chainspeedProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addDamageProfile("CHAINSWORDS", { "types": { "SHARP": 1.0 } });
    hero.addDamageProfile("CHAINSPEED", { "types": { "SHARP": 1.0 } });

    hero.addSoundEvent("AIM_START", ["fiskheroes:mk50_cannon_aim", "fiskheroes:mk50_cannon_static"]);
    hero.addSoundEvent("AIM_STOP", "fiskheroes:mk50_cannon_retract");

    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "misc:dyn/sneaking_timer", 5, entity.isSneaking());

        // double punch logic credit to shadow
        manager.incrementData(entity, "misc:dyn/punch_right_timer", 50, entity.getData("misc:dyn/punch_right"));
        manager.incrementData(entity, "misc:dyn/punch_left_timer", 50, entity.getData("misc:dyn/punch_left"));
        if( entity.getInterpolatedData("misc:dyn/punch_right_timer") == 1) {
            manager.setInterpolatedData(entity, "misc:dyn/punch_right_timer", 0);
            manager.setData(entity, "misc:dyn/punch_decider", 1);
            manager.setData(entity, "misc:dyn/punch_right", false);
        }
        if( entity.getInterpolatedData("misc:dyn/punch_left_timer") == 1) {
            manager.setInterpolatedData(entity, "misc:dyn/punch_left_timer", 0);
            manager.setData(entity, "misc:dyn/punch_decider", 0);
            manager.setData(entity, "misc:dyn/punch_left", false);
        }
        if (entity.isPunching() && entity.getData("misc:dyn/punch_decider") == 0) {
            manager.setData(entity, "misc:dyn/punch_right", true);
        }
        else if (entity.isPunching() && entity.getData("misc:dyn/punch_decider") == 1) {
            manager.setData(entity, "misc:dyn/punch_left", true);
        }
        landing.tick(entity, manager);
    });
}

function isKeyBindEnabled(entity, keyBind) {
    if(keyBind == "DISABLE_PUNCH"){
        return entity.getData("misc:dyn/punch_right_timer") > 0 || entity.getData("misc:dyn/punch_left_timer") > 0;
    }
    if (entity.isPunching() || entity.getData("fiskheroes:dyn/superhero_landing_timer") > 0) return false;
    
    return true;
};


function chainswordsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 16.0, 0);
}

function speedProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 0.15, 1);
}

function chainspeedProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 16.0, 0);
    profile.addAttribute("BASE_SPEED", 0.15, 1);
}
