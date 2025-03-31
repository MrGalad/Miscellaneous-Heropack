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

    hero.addKeyBind("TITAN", "Titan Transformation", 1);
    hero.addKeyBind("BLADE", "Toggle Blades", 2);
    hero.addKeyBind("WEB_ZIP", "key.webZip", 3);
    hero.addKeyBindFunc("func_WEB_SWINGING", webSwingingKey, "key.webSwinging", 4);

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setDamageProfile(getAttributeProfile);
    hero.addDamageProfile("BLADE", { "types": { "SHARP": 1.0 } });
    hero.setAttributeProfile(getAttributeProfile);
    /*    hero.setKeyBindEnabled(isKeyBindEnabled); */
    hero.setTickHandler((entity, manager) => {
        var cond = entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp2") < 1 && entity.getData("misc:dyn/float_interp1") > 0.2
        var titanOn = !(entity.getData("misc:dyn/float_interp1") > 0.2 /* && entity.getData("misc:dyn/float_interp1") < 1 */)
        manager.incrementData(entity, "misc:dyn/float_interp1", 50, entity.getData("misc:dyn/float_interp") > 0.8);
        manager.incrementData(entity, "misc:dyn/float_interp3", 30, entity.getData("fiskheroes:blade"));
        manager.setData(entity, "fiskheroes:size_state", titanOn ? -1 : 1);
        if (entity.getData("misc:dyn/float_interp1") > 0.8)
            manager.setData(entity, "misc:dyn/boolean1", true);
    });
}

function webSwingingKey(player, manager) {
    var flag = player.getData("fiskheroes:web_swinging");

    if (!flag) {
        manager.setDataWithNotify(player, "fiskheroes:prev_utility_belt_type", player.getData("fiskheroes:utility_belt_type"));
        manager.setDataWithNotify(player, "fiskheroes:utility_belt_type", -1);
        manager.setDataWithNotify(player, "fiskheroes:gliding", false);
    }

    manager.setDataWithNotify(player, "fiskheroes:web_swinging", !flag);
    return true;
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:blade")) {
        return "BLADE"
    }
    return true;
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
}
/* function titan(entity, manager) {
    var titanOn = entity.getData("misc:dyn/boolean");
    manager.setData(entity, "misc:dyn/boolean", !titanOn);
    manager.setData(entity, "fiskheroes:size_state", titanOn ? -1 : 1);
    return true;
  }
 */
