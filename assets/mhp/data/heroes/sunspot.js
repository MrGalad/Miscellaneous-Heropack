function init(hero) {
    hero.setName("Sunspot");
    hero.setTier(5);
    
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    
    hero.addPowers("mhp:solar_energy_absorbtion");
    hero.addAttribute("FALL_RESISTANCE", 1, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.2, 1);
    
    hero.addKeyBind("AIM", "key.shoot", 1);
    /* hero.addKeyBind("HALF", "Activate Powers", 4); */
    /* hero.addKeyBind("ENERGY_PROJECTION", "Fire Projection", 2); */
    hero.addKeyBind("NANITE_TRANSFORM", "Solar Form", 5);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTierOverride(getTierOverride);
    hero.supplyFunction("canAim", canAim); 
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE")
    hero.setDamageProfile(entity => entity.getHeldItem().isEmpty() && (entity.getData("mhp:dyn/solar") || entity.getData("mhp:dyn/half_solar")) ? "FLAME_PUNCH" : null);
    hero.addDamageProfile("FLAME_PUNCH", {
        "types": {
            "BLUNT": 1.0,
            "FIRE": 0.4
        },
        "properties": {
            "HEAT_TRANSFER": 40,
            "IGNITE": 2
        }
    });

    hero.setTickHandler((entity, manager) => {
        if (!entity.getData("mhp:dyn/solar")) {
            manager.setData(entity, "fiskheroes:energy_projection", false)
        } else if (!entity.getData("mhp:dyn/solar")) {
            manager.setData(entity, "fiskheroes:aiming", false)
        } else if (!entity.getData("mhp:dyn/solar")) {
            manager.setData(entity, "fiskheroes:controlled_flight", false)
        } else if (entity.getData("mhp:dyn/solar")) {
            manager.setData(entity, "mhp:dyn/half_solar", false)
        } 
    })
} 

function getTierOverride(entity) {
    return entity.getData("mhp:dyn/solar") ? 5 : 2;
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty() && (entity.getData("mhp:dyn/solar") || entity.getData("mhp:dyn/half_solar"));
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return entity.getData("mhp:dyn/solar");
        case "fiskheroes:fireball":
            return (entity.getData("mhp:dyn/solar") || entity.getData("mhp:dyn/half_solar"))
}
return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "AIM":
            return entity.getData("mhp:dyn/solar") && !entity.getData("fiskheroes:energy_projection") && entity.getHeldItem().isEmpty();
}
return true;
}

