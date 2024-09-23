//var super_boost = implement("fiskheroes:external/super_boost");

function init(hero) {
    hero.setName("The Ray");
    hero.setTier(6);

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:meta_human_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("SPRINT_SPEED", 0.5, 1);
    hero.addAttribute("JUMP_HEIGHT", 0.3, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0)

    hero.addKeyBind("AIM", "key.aim", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Energy Beam", 2);
    //super_boost.addKeyBind(hero, "key.boost", 3);

   // hero.setModifierEnabled(isModifierEnabled);

    hero.setKeyBindEnabled((entity, keyBind) => {
        switch (keyBind) {
            case "ENERGY_PROJECTION":
                return !entity.getData("fiskheroes:aiming");
            default:
                return true;
        }

    });

   /* hero.setTickHandler((entity, manager) => {
        super_boost.tick(entity, manager);
    })*/
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.supplyFunction("canAim", canAim)

}

/*function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    case "fiskheroes:flight":
        return !entity.getData("fiskheroes:glide_flying");
        default:
            return super_boost.isModifierEnabled(entity, modifier);
    }
} */

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
