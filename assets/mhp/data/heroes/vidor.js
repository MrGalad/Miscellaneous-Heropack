var landing = implement("mhp:external/superhero_landing");
var speedster_base = implement("fiskheroes:external/speedster_base");
var super_boost = implement("fiskheroes:external/super_boost");
function init(hero) {
    hero.setName("Vidor");
    hero.setVersion("Comics");
    hero.setTier(9);

   // hero.setHelmet("Mustache")
    hero.setChestplate("item.superhero_armor.piece.torso");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:viltrumite_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 10, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);

    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 3);
    super_boost.addKeyBind(hero, "key.boost", 2);
    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        super_boost.tick(entity, manager);
    });
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);

    function isKeyBindEnabled(entity, keyBind) {
        switch (keyBind) {
            case "SUPER_SPEED":
                return !entity.getData("fiskheroes:flying");
            default:
                return super_boost.isKeyBindEnabled(entity, keyBind);
        }
    }
    function isModifierEnabled(entity, modifier) {
        switch (modifier.name()) {
            case "fiskheroes:flight":
                return !entity.getData("fiskheroes:glide_flying");
            case "fiskheroes:super_speed":
                return !entity.getData("fiskheroes:flying");
            default:
                return super_boost.isModifierEnabled(entity, modifier);
        }
    }
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
}
