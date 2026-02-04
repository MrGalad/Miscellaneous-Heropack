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
    hero.addKeyBind("FIST", "Blood Fist", 2);
    hero.addKeyBind("EDGE", "Blood Edge", 2);
    hero.addKeyBind("DISABLE", "Disable", 2);
    hero.addKeyBindFunc("SLOT", slotChange, "Change Gadget", 2)
    hero.addKeyBind("SLICING", "Slicing Exorcism", 3);

   /*  hero.addKeyBind("DMG", "DMG", 2);
    hero.addKeyBind("TENTACLE_GRAB", "Select", 3);
    hero.addKeyBind("TENTACLES", "Activate", 4);
 */

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addAttributeProfile("NOMOVE", nomoveProfile);
    hero.addAttributeProfile("FIST", fistProfile);
    hero.addAttributeProfile("EDGE", edgeProfile);

    hero.setTickHandler((entity, manager) => {
        //PackLoader.printChat("slot: " + entity.getData("misc:dyn/slot"))
        //PackLoader.printChat("fist: " + entity.getInterpolatedData("misc:dyn/fist_timer"))
        if (entity.getData("misc:dyn/edge") || entity.getData("misc:dyn/boolean")) {
            manager.setData(entity, "misc:dyn/fist", false);
            manager.setData(entity, "misc:dyn/fist_timer", 0);
        } if (entity.getData("misc:dyn/fist") || entity.getData("misc:dyn/boolean") ) {
            manager.setData(entity, "misc:dyn/edge", false);
            //manager.setData(entity, "misc:dyn/edge_timer", 0);
        } if (entity.getData("misc:dyn/boolean")) {
            manager.setData(entity, "misc:dyn/boolean", false);
            manager.setData(entity, "misc:dyn/float_interp", 0);
        }
 
    });

    hero.addDamageProfile("ELEC", {
        "types": {
            "ELECTRICITY": 1
        },
        "properties": {}
    });
}

function slotChange(entity, manager) {
    var slot = entity.getData("misc:dyn/slot");
    manager.setData(entity, "misc:dyn/slot", (slot + 1) % 3);
    return true;
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
        case "EDGE":
            return entity.getData("misc:dyn/fist") || entity.getData("misc:dyn/edge");
        case "FIST":
            return !entity.getData("misc:dyn/edge") && !entity.getData("misc:dyn/fist") || entity.getData("misc:dyn/boolean");
        case "DISABLE":
            return entity.getData("misc:dyn/edge") && !entity.getData("misc:dyn/fist");
        default:
            return true;;
    }
}

function nomoveProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -100000, 1);
    profile.addAttribute("BASE_SPEED", -100000, 1)
}
function fistProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 11.5, 1);
}
function edgeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 12.5, 1);
    profile.addAttribute("WEAPON_DAMAGE", 2.5, 1);
}

function getProfile(entity) {
    if (entity.getData("fiskheroes:beam_charge") > 0.7) {
        return "NOMOVE"
    } if (entity.getData("misc:dyn/edge")) {
        return "EDGE"
    } if (entity.getData("misc:dyn/fist")) {
        return "FIST"
    }
    return null;
}
