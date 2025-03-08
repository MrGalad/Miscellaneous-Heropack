function init(hero) {
    hero.setName("test");
    hero.setTier(10);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:test");
   /*  hero.addAttribute("PUNCH_DAMAGE", 1.0, 0); */
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.8, 1);
    hero.addAttribute("JUMP_HEIGHT", 1, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("GRAVITY_MANIPULATION", "key.gravityManip", 1);
    hero.setTickHandler((entity, manager) => {

        /* PackLoader.printChat("Number: " + entity.getData("misc:dyn/slot")); */
        if (entity.isPunching() && !entity.getData("misc:dyn/punched")) {
            manager.setData(entity, "misc:dyn/slot", entity.getData("misc:dyn/slot") + 1);
            manager.setData(entity, "misc:dyn/punched", true);
        }
        
        if (!entity.isPunching() && entity.getData("misc:dyn/punched")) {
            manager.setData(entity, "misc:dyn/punched", false);
        }
         if (entity.getData("misc:dyn/slot") == 4 || entity.getData("misc:dyn/power_charge") < 0.1) {
            manager.setData(entity, "misc:dyn/slot", 0);
           /*  manager.setData(entity, "misc:dyn/punched", true); */
        }

  
        if (entity.getData("misc:dyn/slot") == 1) {
            manager.setData(entity, "fiskheroes:gravity_manip", true);
            manager.setData(entity, "fiskheroes:gravity_amount", -1);
        } if (entity.getData("misc:dyn/slot") == 0 || entity.getData("misc:dyn/slot") == 3 || entity.getData("misc:dyn/slot") == 2) {
            manager.setData(entity, "fiskheroes:gravity_amount", 0);
        } if (entity.getData("fiskheroes:gravity_amount") == 0) {
            manager.setData(entity, "fiskheroes:gravity_manip", false);
        }
 });
 hero.setDamageProfile(getProfile);
 hero.addDamageProfile("PUNCH", {
    "types": {
        "FIRE": 1
    },
    "properties": {
        "ADD_KNOCKBACK": -0.1
    }
});
}

function getProfile(entity) {
	if (entity.isPunching()) {
		return "PUNCH";
	}
    return true
}