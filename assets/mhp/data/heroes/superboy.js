var landing = implement("mhp:external/superhero_landing");
var utils = implement("fiskheroes:external/utils");
var super_boost = implement("fiskheroes:external/super_boost");

function init(hero) {
    hero.setName("Superboy");
    hero.setTier(8);
    
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    
    hero.addPowers("mhp:human_kryptonian");
    hero.addAttribute("PUNCH_DAMAGE", 9.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.6, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    
    hero.addKeyBind("HEAT_VISION", "key.heatVision", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 3);
    super_boost.addKeyBind(hero, "key.boost", 2);

    hero.setDefaultScale(0.9);
    hero.setHasProperty(hasProperty);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    
    hero.setTickHandler((entity, manager) => {
        landing.tick(entity, manager);
        super_boost.tick(entity, manager);
    });
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    case "fiskheroes:super_speed":
        return !entity.getData("fiskheroes:flying");
    default:
        return super_boost.isModifierEnabled(entity, modifier);
    }
}

function isKeyBindEnabled(entity, keyBind) {
	switch (keyBind) {
        case "HEAT_VISION":
			return !entity.getData("fiskheroes:dyn/flight_super_boost") > 0;
		case "SUPER_SPEED":
			return !entity.getData("fiskheroes:flying");
		default:
			return super_boost.isKeyBindEnabled(entity, keyBind);
	}
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}