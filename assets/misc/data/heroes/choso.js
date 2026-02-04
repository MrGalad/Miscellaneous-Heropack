function midTransform(entity, data) {
    return entity.getData(data) > 0 && entity.getData(data) < 1;
}

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
    hero.addKeyBind("SLICING", "Slicing Exorcism", 3);

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addAttributeProfile("NOMOVE", nomoveProfile);
    hero.addAttributeProfile("FIST", fistProfile);
    hero.addAttributeProfile("EDGE", edgeProfile);

    hero.setTickHandler((entity, manager) => {});

    hero.addDamageProfile("ELEC", {
        "types": {
            "ELECTRICITY": 1
        },
        "properties": {}
    });
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {}
    return true; ;
}

function isKeyBindEnabled(entity, keyBind) {
    var fist_transforming = midTransform(entity, "misc:dyn/fist_timer");
    switch (keyBind) {
    case "EDGE":
        return (entity.getData("misc:dyn/fist") || entity.getData("misc:dyn/edge")) && !midTransform(entity, "misc:dyn/edge_timer") && !fist_transforming;
    case "FIST":
        return !entity.getData("misc:dyn/edge") && !fist_transforming;
    default:
        return true;
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
        return "NOMOVE";
    }
    if (entity.getData("misc:dyn/edge")) {
        return "EDGE";
    }
    if (entity.getData("misc:dyn/fist")) {
        return "FIST";
    }
    return null;
}
