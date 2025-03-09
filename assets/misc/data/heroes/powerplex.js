function init(hero) {
    hero.setName("Powerplex");
    hero.setVersion("Invincible");
    hero.setTier(5);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:kinetic_energy_absorption");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("WEAPON_DAMAGE", 1, 0)

    hero.addKeyBind("ENERGY_PROJECTION", "Lightning Beam", 2);
    hero.addKeyBind("CHARGED_BEAM", "Lightning Discharge", 3);


    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTickHandler((entity, manager) => {
        snap(hero, entity);
        var boolean = entity.getData("misc:dyn/boolean");
        var condss = entity.getData("fiskheroes:energy_projection") || entity.getData("fiskheroes:flying")
        var time = 20;
        if (entity.isAlive() && !entity.getData("fiskheroes:beam_charging")) {
            manager.setData(entity, "misc:dyn/boolean", false)
        }
        if (entity.getData("misc:dyn/worn_suit") < 10) {
            manager.setData(entity, "misc:dyn/worn_suit", entity.getData("misc:dyn/worn_suit") + 0.1);
        }
        if (entity.getData("fiskheroes:time_since_damaged") < time && entity.getData("misc:dyn/worn_suit") > time / 5 && !entity.getData("misc:dyn/power")) {
            manager.setData(entity, "misc:dyn/power", true);
        } else if (entity.getData("fiskheroes:time_since_damaged") > time && entity.getData("misc:dyn/power")) {
            manager.setData(entity, "misc:dyn/power", false);
        }
        if (condss) {
            manager.setData(entity, "misc:dyn/power_charge", entity.getData("misc:dyn/power_charge") - 0.001)
        } if (entity.getHeldItem().name() == 'fisktag:barrier') {
            manager.setData(entity, "misc:dyn/power_charge", 1)
        } if (entity.getData("misc:dyn/power_charge") > 0.99) {
            manager.setData(entity, "misc:dyn/boolean", true)
        } else if (entity.getData("misc:dyn/power_charge") < 0.6) {
            manager.setData(entity, "misc:dyn/boolean", false)
        }  if (entity.getData("fiskheroes:beam_shooting") > 0) {
            var powerCharge = entity.getData("misc:dyn/power_charge");
            if (powerCharge > 0.5) {
                manager.setData(entity, "misc:dyn/power_charge", powerCharge - 0.01); // Decrease power_charge
            }
        }
    });

    hero.addDamageProfile("ELEC", {
        "types": {
            "ELECTRICITY": 1
        },
        "properties": {}
    });

}

function snap(hero, entity) {
    if (entity.getData("fiskheroes:beam_charge") > 0.9) {
        var range = 32 * entity.getData("fiskheroes:beam_charge");
        var list = entity.world().getEntitiesInRangeOf(entity.pos(), range);

        for (var i = 0; i < list.size(); ++i) {
            var other = list.get(i);
            if (other.isLivingEntity() && !entity.equals(other)) { 
                other.hurtByAttacker(hero, "ELEC", "%s was electrecuted", 5, entity);
            }
        }
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return entity.getData("misc:dyn/power_charge") > 0.5;
        case "fiskheroes:lightning_cast":
            return entity.getData("misc:dyn/power_charge") > 0.2;    
}
return true;
}


function isKeyBindEnabled(entity, keyBind) {
    var boolean = entity.getData("misc:dyn/boolean");
    switch (keyBind) {
        case "ENERGY_PROJECTION":
            return entity.getData("misc:dyn/power_charge") > 0.5;
        case "CHARGED_BEAM":
            return boolean;
}
return true;
}