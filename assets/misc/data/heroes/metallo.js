function init(hero) {
    hero.setName("Metallo");
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:cyborg_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("HEAT_VISION", "Optic Blast", 1);
    hero.addKeyBind("CHARGED_BEAM", "Kryptonite Energy Blast", 2);
    hero.addKeyBind("BLADE", "Toggle Chainsaw & Hammer", 3);

    hero.addDamageProfile("BLADE", {
        "types": {
            "SHARP": 0.5,
            "BLUNT": 0.5,
        }
    });
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);

    hero.setKeyBindEnabled((entity, keyBind) => {
        switch (keyBind) {
            case "HEAT_VISION":
                return !entity.getData("fiskheroes:beam_charging");
            case "CHARGED_BEAM":
                return !entity.getData("fiskheroes:heat_vision")
            default:
                return true;
        }
    });
    hero.setTickHandler(tick);
}
function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "BLADE" : null
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10, 0);
}

function tick(entity, manager) {
    manager.incrementData(entity, "misc:dyn/float_interp", 2, !entity.getData("misc:dyn/boolean"));
    if(entity.getData("misc:dyn/float_interp") >= 1){
        manager.setData(entity, "misc:dyn/boolean", true);
    }
    else if(entity.getData("misc:dyn/float_interp") <= 0){
        manager.setData(entity, "misc:dyn/boolean", false);
    }
}
