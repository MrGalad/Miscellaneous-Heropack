function init(hero) {
    hero.setName("Choso");
    hero.setVersion("JJK");
    hero.setTier(8);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.torso");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:death_painting");
    hero.addAttribute("PUNCH_DAMAGE", 10.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.7, 1);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "Piercing Blood", 1);
    hero.addKeyBind("DMG", "DMG", 2);
    hero.addKeyBind("TENTACLE_GRAB", "Select", 3);
    hero.addKeyBind("TENTACLES", "Activate", 4);


    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addAttributeProfile("NOMOVE", nomoveProfile);

    hero.setTickHandler((entity, manager) => {
        var target = entity.world().getEntityById(entity.getData("misc:dyn/grab_id"))
        var targetX = Math.floor(target.posX());
        var targetY = Math.floor(target.posY());
        var targetZ = Math.floor(target.posZ());
        // PackLoader.printChat("\u00A7b Coords: " + (targetX, targetY, targetZ));
        if (entity.getData("misc:dyn/slide_timer") > 0.4) {
            supernova(hero, entity)
        }

        if (entity.getData("fiskheroes:grab_id") > -1) {
            manager.setData(entity, "fiskheroes:tentacle_lift", false)
            manager.setData(entity, "fiskheroes:tentacle_extend_timer", 0)
            manager.setData(entity, "fiskheroes:tentacles_retracting", false)
            manager.setData(entity, "misc:dyn/grab_id", entity.getData("fiskheroes:grab_id"))
        }
        /*  if (entity.getWornChestplate().suitType() == "misc:choso") {
            if (entity.getData("fiskheroes:grab_id") > -1) {
                if (entity.getData("stellar:dyn/float_reset") < ammount) {
                    manager.setData(entity, "stellar:dyn/grab_id", entity.getData("fiskheroes:grab_id"));
                    manager.setData(entity, "stellar:dyn/float_reset", entity.getData("stellar:dyn/float_reset") + 0.1);
                    if (entity.getData("stellar:dyn/float_reset") > ammount - 0.2) {
                        manager.setData(entity, "stellar:dyn/another_boolean_reset", true);
                    }
                }
                if (entity.getData("stellar:dyn/float_reset") >= ammount) {
                    manager.setData(entity, "fiskheroes:grab_id", -1);
                }
            }
        } */
    });

    hero.addDamageProfile("ELEC", {
        "types": {
            "ELECTRICITY": 1
        },
        "properties": {}
    });
}

function supernova(hero, entity) {
    if (entity.getData("misc:dyn/slide_timer") > 0.4) {
        var range = 32;
        var list = entity.world().getEntityById(entity.getData("misc:dyn/grab_id"));


        var other = entity.world().getEntityById(entity.getData("misc:dyn/grab_id"))
        if (other.isLivingEntity() && !entity.equals(other)) {
            other.hurtByAttacker(hero, "ELEC", "%s was electrecuted", 100, entity);

        }
    }
}


function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    }
    return true;;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        default:
            return true;;
    }
}

function nomoveProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -100000, 1);
    profile.addAttribute("BASE_SPEED", -100000, 1)
}

function getProfile(entity) {
    if (entity.getData("fiskheroes:beam_charge") > 0.7) {
        return "NOMOVE"
    }
    return null;
}
