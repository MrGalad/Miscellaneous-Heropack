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
    /* hero.setDefaultScale(entity => 1 + 0.3 * entity.getData("misc:dyn/float_interp")); */

    hero.addKeyBind("TITAN", "Titan Transformation", 1);
    hero.addKeyBind("BLADE", "Toggle Blades", 2);

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setDamageProfile(getAttributeProfile);
    hero.addDamageProfile("BLADE", { "types": { "SHARP": 1.0 } });
    hero.setAttributeProfile(getAttributeProfile);
 /*    hero.setKeyBindEnabled(isKeyBindEnabled); */
    hero.setTickHandler((entity, manager) => {
        var cond = entity.getData("misc:dyn/boolean") && entity.getData("misc:dyn/float_interp2") < 1 && entity.getData("misc:dyn/float_interp1") > 0.2
        var titanOn = !(entity.getData("misc:dyn/float_interp1") > 0.2 /* && entity.getData("misc:dyn/float_interp1") < 1 */)
        manager.incrementData(entity, "misc:dyn/float_interp1", 50, entity.getData("misc:dyn/float_interp") > 0.8);
        manager.incrementData(entity, "misc:dyn/float_interp2", 50, entity.getData("misc:dyn/float_interp") > 0.8);
        manager.setData(entity, "fiskheroes:size_state", titanOn ? -1 : 1);
        if (cond) {
            manager.setData(entity, "misc:dyn/boolean2", true);
        }
        else {
            manager.setData(entity, "misc:dyn/boolean2", false);
        }
    });
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
