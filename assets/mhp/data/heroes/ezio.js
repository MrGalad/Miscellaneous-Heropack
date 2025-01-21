var landing = implement("mhp:external/landing");
function vault(entity) {
    var range = 1; // Set the range to 1.1 blocks
    var yawRad = (Math.PI / 180) * entity.rotYaw();
    var offsetX = -Math.sin(yawRad);
    var offsetZ = Math.cos(yawRad);

    var posX = entity.posX();
    var posY = entity.posY();
    var posZ = entity.posZ();

    var frontFeetPosX = posX + offsetX * range;
    var frontFeetPosY = posY;
    var frontFeetPosZ = posZ + offsetZ * range;

    var frontFacePosX = posX + offsetX * range;
    var frontFacePosY = posY + 1;
    var frontFacePosZ = posZ + offsetZ * range;

    var world = entity.world();

    var isBlockInFrontFeet = world.blockAt(
        Math.floor(frontFeetPosX),
        Math.floor(frontFeetPosY),
        Math.floor(frontFeetPosZ)
    ).isSolid();

    var isBlockInFrontFace = world.blockAt(
        Math.floor(frontFacePosX),
        Math.floor(frontFacePosY),
        Math.floor(frontFacePosZ)
    ).isSolid();

    return isBlockInFrontFeet && !isBlockInFrontFace;
}

function ledge(entity) {
    var range = 1;
    var yawRad = (Math.PI / 180) * entity.rotYaw();
    var offsetX = Math.sin(yawRad);
    var offsetZ = -Math.cos(yawRad);
    var belowPos = [entity.posX() - offsetX * range, entity.posY() - 1, entity.posZ() - offsetZ * range];
    var isBlockBelow = entity.world().blockAt(Math.floor(belowPos[0]), Math.floor(belowPos[1]), Math.floor(belowPos[2])).isSolid();


    if (!isBlockBelow) {
        var frontBelowPos = [entity.posX() - offsetX * range, entity.posY() - 1, entity.posZ() - offsetZ * range];
        var isBlockInFrontBelow = entity.world().blockAt(Math.floor(frontBelowPos[0]), Math.floor(frontBelowPos[1]), Math.floor(frontBelowPos[2])).isSolid();

        if (!isBlockInFrontBelow) {
            return true;
        }
    }
    return false;
}

function climb(entity) {
    var range = 1;
    var yawRad = (Math.PI / 180) * entity.rotYaw();
    var offsetX = Math.sin(yawRad);
    var offsetZ = -Math.cos(yawRad);

    var frontPos = entity.pos().add(-offsetX * range, 0, -offsetZ * range);

    if (entity.world().getBlock(frontPos) == "minecraft:stone" ||
    entity.world().getBlock(frontPos) == "minecraft:cobblestone" ||
    entity.world().getBlock(frontPos) == "minecraft:stone_brick" ||
    entity.world().getBlock(frontPos) == "minecraft:brick_block" ||
    entity.world().getBlock(frontPos) == "minecraft:wood" ||
    entity.world().getBlock(frontPos) == "minecraft:planks" ||
    entity.world().getBlock(frontPos) == "minecraft:log" ||
    entity.world().getBlock(frontPos) == "minecraft:log2" ||
    entity.world().getBlock(frontPos) == "minecraft:sandstone" ||
    entity.world().getBlock(frontPos) == "minecraft:quartz_block" ||
    entity.world().getBlock(frontPos) == "minecraft:bookshelves" ||
    entity.world().getBlock(frontPos) == "fiskheroes:lunar_rock_bricks" ||
    entity.world().getBlock(frontPos) == "fiskheroes:chiseled_lunar_rock_bricks" ||
    entity.world().getBlock(frontPos) == "fiskheroes:moonshroom_bricks" ||
    entity.world().getBlock(frontPos) == "fiskheroes:quantum_matter_bricks") {
    return true;
}
return false;
}
function init(hero) {
    hero.setName("Ezio");
    hero.setTier(2);

    hero.setHelmet("Hood")
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("mhp:ezio")
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4, 0);
    hero.addAttribute("SPRINT_SPEED", 0.3, 1);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("SLIDE", "Slide", 1);

    hero.addAttributeProfile("LANDING", landingProfile);
    hero.addAttributeProfile("SLIDE", SlidingProfile);
    hero.addAttributeProfile("STEP", StepProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTickHandler((entity, manager) => {
        var conds = entity.motionY() < -0.4 && !entity.isOnGround() && entity.isSprinting();
        landing.land(entity, manager);
        manager.incrementData(entity, "mhp:dyn/float_interp", 12, conds);

        if (entity.getData("mhp:dyn/float_interp") && !entity.isInWater() && entity.world().blockAt(entity.pos().add(0, 4 * entity.motionY(), 0)).isSolid() && !entity.getData("mhp:dyn/roll")) {
            manager.setDataWithNotify(entity, "mhp:dyn/roll", true);
        }
        if (entity.getData("mhp:dyn/roll_timer") === 1) {
            manager.setDataWithNotify(entity, "mhp:dyn/roll", false);
        }
        if (entity.getData("mhp:dyn/slide_timer") == 1) {
            manager.setDataWithNotify(entity, "mhp:dyn/slide", false);
        }
        if (entity.getData("mhp:dyn/slide") && entity.isOnGround() && !entity.isInWater()) {
            manager.setDataWithNotify(entity, "fiskheroes:flying", true);
            manager.setData(entity, "fiskheroes:flight_boost_timer", 0.825);
        } else {
            manager.setDataWithNotify(entity, "fiskheroes:flying", false);
        }

        // Call the vault function and cache the result
        var isVaulting = vault(entity);
        if (isVaulting) {
            manager.setDataWithNotify(entity, "mhp:dyn/boolean", true);
            manager.setData(entity, "mhp:dyn/vault_timer", 10); // Set the vault timer to 15 ticks
            manager.setData(entity, "mhp:dyn/vault_delay", 5); // Set a delay before decrementing the vault timer
        }

        // Decrement the vault delay and then the vault timer
        var vaultDelay = entity.getData("mhp:dyn/vault_delay");
        if (vaultDelay > 0.5) {
            manager.setData(entity, "mhp:dyn/vault_delay", vaultDelay - 1);
        } else {
            var vaultTimer = entity.getData("mhp:dyn/vault_timer");
            if (vaultTimer > 0) {
                manager.setData(entity, "mhp:dyn/vault_timer", vaultTimer - 1);
                manager.setDataWithNotify(entity, "mhp:dyn/boolean", true);
            } else {
                manager.setDataWithNotify(entity, "mhp:dyn/boolean", false);
            }
        }

        // Initialize vault2_timer to 1 and then immediately to 0 when the suit is put on
        if (!entity.getData("mhp:dyn/vault2_initialized")) {
            manager.setData(entity, "mhp:dyn/vault2_timer", 1);
            manager.setData(entity, "mhp:dyn/vault2_timer", 0);
            manager.setData(entity, "mhp:dyn/vault2_initialized", true);
        }

        if (entity.getData("mhp:dyn/vault2_timer") == 1) {
            manager.setDataWithNotify(entity, "mhp:dyn/boolean", true);
        } else if (entity.getData("mhp:dyn/vault2_timer") > 1) {
            var newTimer = entity.getData("mhp:dyn/vault2_timer") - 0.1;
            manager.setData(entity, "mhp:dyn/vault2_timer", newTimer);
            manager.setDataWithNotify(entity, "mhp:dyn/boolean", true);
        } else {
            manager.setDataWithNotify(entity, "mhp:dyn/boolean", false);
        }

        manager.incrementData(entity, "mhp:dyn/roll_timer", 14, entity.getData("mhp:dyn/roll"));
        manager.incrementData(entity, "mhp:dyn/sneaking_timer", 30, (ledge(entity) && entity.isSneaking() && entity.isOnGround() && !entity.getData("fiskheroes:moving")));
        manager.incrementData(entity, "mhp:dyn/vault2_timer", 10, isVaulting);
        manager.incrementData(entity, "mhp:dyn/sprinting", 7, entity.isSprinting() && entity.isOnGround());
    });
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SLIDE":
            return entity.isOnGround() && !entity.isInWater() && entity.isSprinting();
    }
    return true;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return entity.getData("mhp:dyn/slide")
        case "fiskheroes:propelled_flight":
            return climb(entity) && !entity.isSneaking() && !entity.isOnGround() && !entity.isInWater();
    }
    return true;
}

function landingProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("FALL_RESISTANCE", 10000.0, 0);
}

function SlidingProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 0.5, 1);
}

function StepProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("STEP_HEIGHT", 1, 1);
    /*  profile.addAttribute("BASE_SPEED", 0.6, 1); */
}



function getAttributeProfile(entity) {
    if (entity.getData("mhp:dyn/slide")) {
        return "SLIDE";
    } else if (entity.world().getBlock(entity.pos().add(0, -1, 0)) == "minecraft:hay_block") {
        return "LANDING";
    } else if (/* entity.getData("mhp:dyn/boolean") */vault(entity)) {
        return "STEP";
    }
    return true;
}