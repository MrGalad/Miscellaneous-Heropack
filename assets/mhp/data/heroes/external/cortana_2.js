function health(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("mhp:dyn/cortana"),
        sprinting: entity.getData("fiskheroes:ticks_since_sprinting"),
        armor: 1024 - entity.getWornChestplate().damage(),
        health: Math.round(entity.getHealth() * 10) / 10,
        damage: 0 + entity.getWornChestplate().damage(),
        warning: (entity.getHealth() < 6) && entity.getData("mhp:dyn/cortana"),
        helmet: entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0.4
    };


    var messages = {
        healthStatus: "\u00A73<Cortana>\u00A7b Health: " + diagnostics.health,
        armorIntegrity: "\u00A73<Cortana>\u00A7b Overall Armor Integrity: " + diagnostics.armor + " / 1024",
        damageReceived: "\u00A73<Cortana>\u00A7b Total Damage Received: " + diagnostics.damage
    };

    var messages2 = {
        runningDiagnostics: "\u00A73<Cortana>\u00A7b Running system diagnostics...",
        troll: "\u00A74\u00A7lSeriously? Trying to take off Master Chief's helmet?"
    };



    if (PackLoader.getSide() === "CLIENT") {
        if (diagnostics.cortana && diagnostics.sprinting === 200) {
            for (var message in messages) {
                PackLoader.printChat(messages[message]);
            }
        } else if (diagnostics.cortana && diagnostics.sprinting === 170) {
            PackLoader.printChat(messages2.runningDiagnostics);
        } else if (diagnostics.helmet && trollmessage) {
            PackLoader.printChat(messages2.troll)
            trollmessage = false
        } else if (!diagnostics.helmet && !trollmessage) {
            trollmessage = true;
        }
    }  if (PackLoader.getSide() == "SERVER") {
        null
    }
}
var warningmessage = true;
var trollmessage = true

function warning(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("mhp:dyn/cortana"),
    };

    var messages = {
        warning: "\u00A73<Cortana>\u00A74\u00A7l Warning: Health critical!",
    };

    if (PackLoader.getSide() === "CLIENT") {
        var condition = (entity.getHealth() < 6) && diagnostics.cortana;
        if (condition && warningmessage) {
            PackLoader.printChat(messages.warning);
            warningmessage = false;
        } else if (!condition && !warningmessage) {
            warningmessage = true;
        }
    }  if (PackLoader.getSide() == "SERVER") {
        null
    }
}

function retrieveinDome(entity) {
    var dome = entity.getData("fiskheroes:lightsout_id");
    var domeInstance = entity.world().getEntityById(dome);
    var entityCollection = [];

    if (domeInstance && domeInstance.exists()) {
        var containedEntities = domeInstance.as("SHADOWDOME").getContainedEntities();
        for (var index = 0, totalEntities = containedEntities.size(); index < totalEntities; index++) {
            var targetEntity = containedEntities.get(index);
            if (entity.getUUID() !== targetEntity.getUUID()) {
                entityCollection.push(targetEntity.getEntityName());
            }
        }
    }

    return entityCollection;
}

var scamStatus = true;

function EntityScan(entity, manager) {
    var cortanaOn = entity.getData("mhp:dyn/cortana");
    var scamTimer = entity.getInterpolatedData("mhp:dyn/mob_timer");
    var dome = entity.getData("fiskheroes:lightsout_id");
    var domeInstance = entity.world().getEntityById(dome);

    var messages = {
        detect: "\u00A73<Cortana> Entities nearby:",
    };

    var detectedEntities = retrieveinDome(entity);

    if (PackLoader.getSide() === "CLIENT") {
        var scanCondition = detectedEntities.length > 0 && cortanaOn;
        if (scanCondition && scamStatus) {
            PackLoader.printChat(messages.detect);
            PackLoader.printChat("\u00A73<Cortana>\u00A74 " + detectedEntities.join(", "));
            scamStatus = false;
        } else if (!scanCondition && !scamStatus) {
            scamStatus = true;
        }
    }

    if (domeInstance && domeInstance.exists()) {
        manager.setData(entity, "mhp:dyn/mob_timer", 1);
        manager.setData(entity, "mhp:dyn/mobscan", true);
    } else if (cortanaOn) {
        manager.setData(entity, "mhp:dyn/mob_timer", Math.max(scamTimer - 0.01, 0));
    }
}
    /* function EntityScan(entity, manager) {
        var cortanaOn = entity.getData("mhp:dyn/cortana");
        var scamTimer = entity.getInterpolatedData("mhp:dyn/mob_timer");
        var dome = entity.getData("fiskheroes:lightsout_id");
        var domeInstance = entity.world().getEntityById(dome);
    
        var messages = {
            detect: "\u00A73<Cortana> Entities nearby:",
        };
    
        // Retrieve the entities within the dome
        var detectedEntities = retrieveinDome(entity);
    
        if (PackLoader.getSide() === "CLIENT") {
            var scanCondition = detectedEntities.length > 0 && cortanaOn;
            if (scanCondition && scamStatus) {
                PackLoader.printChat(messages.detect);
                detectedEntities.forEach(function(targetEntity) {
                    // Ensure targetEntity is valid
                    if (!targetEntity) {
                        PackLoader.printChat("Target entity is invalid");
                        return; // Skip this iteration if the entity is invalid
                    }
    
                    // Use the getEntityName() method to get the readable name
                    var entityName = targetEntity.getEntityName(); // Correctly using getEntityName()
                    if (!entityName) {
                        PackLoader.printChat("Entity name is undefined or null"); // Log the issue
                        return; // Skip this iteration if the entity name is invalid
                    }
    
                    // Check for each entity type individually
                    if (entity.getEntityName() === "Zombie") {
                        PackLoader.printChat("\u00A74" + "Zombie"); // Red for hostile
                    } else if (entityName === "Skeleton") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Creeper") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Enderman") {
                        PackLoader.printChat("\u00A79" + entityName); // Blue for neutral
                    } else if (entityName === "Spider") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Silverfish") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Witch") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Ghast") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Blaze") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Magma Cube") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Slime") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Ender Dragon") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Wither") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Wither Skeleton") {
                        PackLoader.printChat("\u00A74" + entityName); // Red for hostile
                    } else if (entityName === "Wolf") {
                        PackLoader.printChat("\u00A79" + "Wolf"); // Blue for neutral
                    } else if (entityName === "Iron Golem") {
                        PackLoader.printChat("\u00A79" + entityName); // Blue for neutral
                    } else if (entityName === "Snow Golem") {
                        PackLoader.printChat("\u00A79" + entityName); // Blue for neutral
                    } else if (entityName === "Horse") {
                        PackLoader.printChat("\u00A7a" + entityName); // Green for tameable
                    } else {
                        PackLoader.printChat("\u00A7f" + entityName); // Default color for others
                    }
                });
                scamStatus = false;
            } else if (!scanCondition && !scamStatus) {
                scamStatus = true;
            }
        }
    
        if (domeInstance && domeInstance.exists()) {
            manager.setData(entity, "mhp:dyn/mob_timer", 1);
            manager.setData(entity, "mhp:dyn/mobscan", true);
        } else if (cortanaOn) {
            manager.setData(entity, "mhp:dyn/mob_timer", Math.max(scamTimer - 0.01, 0));
        }
    } */