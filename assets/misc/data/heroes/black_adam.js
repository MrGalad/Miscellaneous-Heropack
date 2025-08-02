function init(hero) {
    hero.setName("Black Adam");
    hero.setVersion("item.superhero_armor.version.dceu");
    hero.setTier(9);

    hero.setChestplate("item.superhero_armor.piece.torso");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:divine_empowerment");
    hero.addAttribute("PUNCH_DAMAGE", 10.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.7, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Lightning Beam", 2);
    hero.addKeyBind("CHARGED_BEAM", "Lightning Discharge", 3);
    hero.addKeyBind("SHAZAM", "SHAZAM!", 5);

    hero.setHasProperty(hasProperty);
    hero.setAttributeProfile(getProfile);
    hero.setTierOverride(getTierOverride);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.addAttributeProfile("INACTIVE", inactiveProfile);
    hero.addAttributeProfile("ETERNIUM", ete)

    hero.setDefaultScale(1.1);
    hero.setTickHandler((entity, manager) => {
        burst(hero, entity)
    });
}

function burst(hero, entity) {
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


function inactiveProfile(profile) {
    profile.revokeAugments();
}
function ete(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    profile.addAttribute("SPRINT_SPEED", 0.2, 1);
    profile.addAttribute("FALL_RESISTANCE", 0.2, 1);
}

function getProfile(entity) {
    if (entity.getData("misc:dyn/shazam_timer") < 0.5) {
        return "INACTIVE";
    } if (entity.hasStatusEffect("fiskheroes:eternium")) {
        return "ETERNIUM";
    }
    return true;
}

function getTierOverride(entity) {
   return entity.getData("misc:dyn/shazam_timer") > 0.5 ? 9 : 0;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:lightning_cast":
            return entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging") && !entity.getData("fiskheroes:energy_projection")
        case "fiskheroes:energy_projection":
            return entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging")
        case "fiskheroes:controlled_flight":
        case "fiskheroes:fire_immunity":
        case "fiskheroes:projectile_immunity":
        case "fiskheroes:arrow_catching":
        case "fiskheroes:leaping":
        case "fiskheroes:damage_immunity":
            return entity.getData("misc:dyn/shazam_timer") > 0.5;
        case "fiskheroes:super_speed":
            return (entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:flying")); ;
    }
    return true;;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SUPER_SPEED":
            return (entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:flying"));
        case "ENERGY_PROJECTION":
            return (entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:beam_charging"));
        case "CHARGED_BEAM":
            return (entity.getData("misc:dyn/shazam_timer") > 0.5 && !entity.getData("fiskheroes:energy_projection"));
      // spam fix cuz shadow doesnt like it 
        case "SHAZAM":
            return (entity.getData("misc:dyn/shazam_timer") == 0 || entity.getData("misc:dyn/shazam_timer") == 1 && !entity.getData("fiskheroes:beam_charging")) && !(entity.getData("fiskheroes:flying") && entity.isSprinting());
        default:
            return true;;
    }
}

function hasProperty(entity, property) {
    switch (property) {
        case "BREATHE_SPACE":
            return entity.getData("misc:dyn/shazam_timer") > 0.5;
        default:
            return true;
    }
}