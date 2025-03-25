var speedster_base = implement("fiskheroes:external/speedster_base");
var landing = implement("misc:external/superhero_landing");
var auto_boost = implement("misc:external/auto_boost");
var max_boost_flight = 3;
function init(hero) {
    hero.setName("Invincible Variants");
    hero.setVersion("Invincible");
    hero.setTier(9);

    hero.setChestplate("Chestpiece");

    hero.addPowers("misc:viltrumite_physiology");
    hero.addAttribute("PUNCH_DAMAGE", 9, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 1.0, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);

    // nah what you doin in here???
    hero.addKeyBindFunc("func_INC_DESIGN", increaseSlot, "Next Variant Design", 1);
    hero.addKeyBindFunc("func_DEC_DESIGN", decreaseSlot, "Previous Variant Design", 2);
    hero.addKeyBindFunc("LOCKDESIGN", lockDesign, "Lock Variant Design", 3);
    hero.addKeyBindFunc("DESIGN", change, "Change Variant Design", 4);


    hero.addKeyBind("ENERGY_PROJECTION", "Speed Punches", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("GROUND_SMASH", "Ground Smash", 3);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 4);
    /* hero.addKeyBind("SHIELD", "Block", 5); */

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("BLOCK", block);
    hero.addAttributeProfile("CHANGEPROFILE", changeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
    hero.setTierOverride(getTierOverride);
    var speedPunch = speedster_base.createSpeedPunch(hero);
    hero.setDamageProfile(entity => speedPunch.get(entity, null));
    hero.setHasProperty((entity, property) => property == "MASK_TOGGLE")

    hero.setTickHandler((entity, manager) => {
        speedster_base.tick(entity, manager);
        landing.tick(entity, manager);
        auto_boost.boostdata(entity, manager, 200, 150, 20, 20);
        names(entity, manager)
        if (entity.getData("fiskheroes:flight_boost_timer") == 0 && entity.isSprinting() && entity.getData("fiskheroes:flying")) {
            manager.setData(entity, "misc:dyn/random_digit", Math.floor(Math.random() * 2) + 1);
        }

        if (!entity.getWornChestplate().nbt().getBoolean('locked')) {
            manager.setData(entity, "misc:dyn/charge_timer", 0)
        }
    });
}

function increaseSlot(entity, manager) {
    var nbt = entity.getWornChestplate().nbt();
    var totalSlots = 19;
    var slot = nbt.getByte("slot") || 0
    slot = (slot + 1) % totalSlots;
    manager.setByte(nbt, "slot", slot);
    return true;
}

function decreaseSlot(entity, manager) {
    var nbt = entity.getWornChestplate().nbt();
    var totalSlots = 19;
    var slot = nbt.getByte("slot") || 0
    slot = (slot - 1 + totalSlots) % totalSlots;
    manager.setByte(nbt, "slot", slot);
    return true;
}

function lockDesign(entity, manager) {
    var nbt = entity.getWornChestplate().nbt();
    manager.setBoolean(nbt, "locked", true);
    return true
}

function change(entity, manager) {
    var nbt = entity.getWornChestplate().nbt();
    manager.setBoolean(nbt, "locked", false);
    manager.setByte(nbt, "slot", 0);
    return true
}

function isModifierEnabled(entity, modifier) {
    var nbt = entity.getWornChestplate().nbt();
    if (!nbt.getBoolean("locked")) {
        return false;
    }
    switch (modifier.name()) {
        case "fiskheroes:super_speed":
            return !entity.getData("fiskheroes:flying") && !entity.getData("fiskheroes:energy_projection");
        case "fiskheroes:controlled_flight":
            switch (modifier.id()) {
                case "4":
                    return entity.getData("misc:dyn/flight_boost4") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "3":
                    return entity.getData("misc:dyn/flight_boost3") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "2":
                    return entity.getData("misc:dyn/flight_boost2") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "1":
                    return entity.getData("misc:dyn/flight_boost1") && !entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                case "base":
                    return entity.getData("misc:dyn/flight_boost0") && entity.isSprinting();
                default:
                    break;
            }
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    var nbt = entity.getWornChestplate().nbt();
    var boolean = entity.getData("misc:dyn/boolean")
    var lock = nbt.getBoolean("locked")
    switch (keyBind) {
        case "GROUND_SMASH":
            return !entity.getData("fiskheroes:dyn/flight_super_boost") > 0 && lock && !entity.getData("fiskheroes:energy_projection");
        case "SHIELD":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("misc:dyn/charge_timer") && lock && !entity.getData("fiskheroes:energy_projection");
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying") && lock && !entity.getData("fiskheroes:energy_projection");
        case "ENERGY_PROJECTION":
            return !(entity.isSprinting() && entity.getData("fiskheroes:flying")) && !entity.getData("misc:dyn/charge_timer") && lock;
        case "SLOW_MOTION":
            return lock && !entity.getData("fiskheroes:mask_open_timer2") > 0
        case "DESIGN":
            return entity.getData("fiskheroes:mask_open_timer2") > 0 && !entity.getData("fiskheroes:flying")
        case "LOCKDESIGN":
            return !nbt.getByte("slot") == 0 && !lock
        case "func_INC_DESIGN":
        case "func_DEC_DESIGN":
            return !lock
        default:
            return true;
    }
}
function block(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", -100000000, 1);
    profile.addAttribute("BASE_SPEED", -10000000, 1);
}

function changeProfile(profile) {
    profile.revokeAugments()
}

function getAttributeProfile(entity) {
    var nbt = entity.getWornChestplate().nbt();
    if (entity.getData("fiskheroes:shield_blocking_timer") > 0) {
        return "BLOCK";
    } if (!nbt.getBoolean("locked")) {
        return "CHANGEPROFILE"
    }
    return true;
}

function getTierOverride(entity) {
    var nbt = entity.getWornChestplate().nbt();
    return nbt.getBoolean("locked") ? 9 : 0;
}

function names(entity, manager) {
    var nbt = entity.getWornChestplate().nbt();
    var display = nbt.getCompoundTag("display");
    var slot = nbt.getByte("slot") | 0;
    var name = [undefined, "Capevincible", "Movincihawk", "Mustachible", "Maskvincible", "Stripevincible", "Hoodvincible", "Hairvincible", "Capvincible", "Sportvincible", "Lightbluevincible", "Omnivincible", "Viltrumincible", "Bulletproofible", "Prisonincible", "Flaxancible", "Gogglesvincible", "Nogogglesible", "Nomaskible"].map(i => i ? i+"'s Chestplate" : i)[slot];
    if (name == undefined) {
        manager.removeTag(display, "Name");
        return;
    }
    manager.setCompoundTag(nbt, "display", display);
    manager.setString(display, "Name", name);
}
