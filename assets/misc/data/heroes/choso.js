function midTransform(entity, data) {
    return entity.getData(data) > 0 && entity.getData(data) < 1;
}

function lookVector(entity) {
    var pitch = entity.rotPitch() / 90;
    var yaw = entity.rotYaw() / 180;
    var p = Math.sin(0.5 * Math.PI * pitch + Math.PI / 2);

    var x = -Math.sin(Math.PI * yaw) * p;
    var y = -pitch;
    var z = Math.sin(Math.PI * yaw + (Math.PI / 2)) * p;
    return PackLoader.asVec3(x, y, z);
}

function init(hero) {
    hero.setName("Choso");
    hero.setVersion("JJK");
    hero.setTier(8);

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
    hero.addKeyBind("AIM", "Slicing Exorcism", 3);

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.supplyFunction("canAim", canAim);
    hero.addAttributeProfile("NOMOVE", nomoveProfile);
    hero.addAttributeProfile("FIST", fistProfile);
    hero.addAttributeProfile("EDGE", edgeProfile);

    hero.setTickHandler((entity, manager) => {
        slicingExorcism(hero, entity, manager);
       //PackLoader.printChat("proj: " + entity.getData('misc:dyn/projectileTravel'));
       //PackLoader.printChat("aim: " + entity.getData('fiskheroes:aimed_timer'));
       //PackLoader.printChat("aimed: " + entity.getData('fiskheroes:aiming'));
       //PackLoader.printChat("float: " + entity.getData('misc:dyn/float_interp1'));

        manager.incrementData(entity, 'misc:dyn/float_interp1', 30, entity.getData("fiskheroes:aimed_timer") && entity.getData("fiskheroes:aiming"));
        if (!entity.getData("fiskheroes:aiming")) {
            manager.setData(entity, "misc:dyn/projectileTravel", 0);
            manager.setData(entity, "misc:dyn/float_interp1", 0);
        } if (entity.getData('misc:dyn/float_interp1') == 1) {
            manager.setData(entity, "misc:dyn/boolean1", true);
        }

    });

    hero.addDamageProfile("SLICING_EXORCISM", {
        "types": {
            "SHARP": 1.0
        },
        "properties": {
            "HIT_COOLDOWN": 3.0,
            "DAMAGE_DROPOFF": 0.8,
            "ADD_KNOCKBACK": 1,
            "EFFECTS": [
                {
                    "id": "minecraft:poison",
                    "duration": 60,
                    "amplifier": 0,
                    "chance": 0.8
                },
                {
                    "id": "minecraft:nausea",
                    "duration": 60,
                    "amplifier": 0,
                    "chance": 0.5
                }
            ]
        }
    });

}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) { }
    return true;;
}

function slicingExorcism(hero, entity, manager) {
    if (entity.getData('misc:dyn/boolean1')) {
        var eyePos = entity.eyePos();
        var currentPos = entity.eyePos()
        var lookDirection = lookVector(entity);
        currentPos = eyePos.add(lookDirection.multiply(32 * entity.getData('misc:dyn/float_interp1')/2));
        var block = entity.world().blockAt(currentPos);
        if (!block.isSolid() && 32 * entity.getData('misc:dyn/float_interp1')) {
            var list = entity.world().getEntitiesInRangeOf(currentPos, 3);
            list.forEach(other => {
                if (!entity.equals(other) && other.isLivingEntity()) {
                    other.hurtByAttacker(hero, "SLICING_EXORCISM", "%s got sliced to death", 7, entity);
                }
            });
        }

    }
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

function canAim(entity) {
    return entity.getHeldItem().isEmpty()
}