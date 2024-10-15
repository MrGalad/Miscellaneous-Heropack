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
 /*   // Global variable to track the helmet state
   function health(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("mhp:dyn/cortana"),
        sprinting: entity.getData("fiskheroes:ticks_since_sprinting"),
        armor: 1024 - entity.getWornChestplate().damage(),
        health: Math.round(entity.getHealth() * 10) / 10,
        damage: 0 + entity.getWornChestplate().damage(),
        warning: (entity.getHealth() < 6) && entity.getData("mhp:dyn/cortana"),
        helmet: 0.5 < entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0.4
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

    if (PackLoader.getSide() == "SERVER") {
        if (diagnostics.cortana && diagnostics.sprinting === 200) {
            for (var message in messages) {
                entity.as("PLAYER").addChatMessage(messages[message]);
            }
        } else if (diagnostics.cortana && diagnostics.sprinting === 170) {
            entity.as("PLAYER").addChatMessage(messages2.runningDiagnostics);
        }
        
        // Check if the helmet has just been opened
        var maskOn = manager.setData(entity, "mhp:dyn/mask_on", false);
        if (diagnostics.helmet && !maskOn) {
            entity.as("PLAYER").addChatMessage(messages2.troll);
            manager.setData(entity, "mhp:dyn/mask_on", true);
        } else if (!diagnostics.helmet) {
            // Reset the state when the helmet is closed
            manager.setData(entity, "mhp:dyn/mask_on", false);
        }
    }
}

function warning(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("mhp:dyn/cortana"),
    };

    var messages = {
        warning: "\u00A73<Cortana>\u00A74\u00A7l Warning: Health critical!",
    };

    var condition = (entity.getHealth() < 6) && diagnostics.cortana;
    var warningmessage = manager.setData(entity, "mhp:dyn/warning_message", true);
    if (PackLoader.getSide() == "SERVER" && condition && warningmessage) {
        entity.as("PLAYER").addChatMessage(messages.warning);
        manager.setData(entity, "mhp:dyn/warning_message", false);
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

function EntityScan(entity, manager) {
    var cortanaOn = entity.getData("mhp:dyn/cortana");
    var scamTimer = entity.getInterpolatedData("mhp:dyn/mob_timer");
    var dome = entity.getData("fiskheroes:lightsout_id");
    var domeInstance = entity.world().getEntityById(dome);

    var messages = {
        detect: "\u00A73<Cortana> Entities nearby:",
    };

    var detectedEntities = retrieveinDome(entity);

    var scanCondition = detectedEntities.length > 0 && cortanaOn;
    var scamStatus = manager.setData(entity, "mhp:dyn/scam_status", true);
    if (PackLoader.getSide() == "SERVER" && scanCondition && scamStatus) {
        entity.as("PLAYER").addChatMessage(messages.detect);
        entity.as("PLAYER").addChatMessage("\u00A73<Cortana>\u00A74 " + detectedEntities.join(", "));
        manager.setData(entity, "mhp:dyn/scam_status", false);
    }

    if (domeInstance && domeInstance.exists()) {
        manager.setData(entity, "mhp:dyn/mob_timer", 1);
        manager.setData(entity, "mhp:dyn/mobscan", true);
    } else if (cortanaOn) {
        manager.setData(entity, "mhp:dyn/mob_timer", Math.max(scamTimer - 0.01, 0));
    }
} */