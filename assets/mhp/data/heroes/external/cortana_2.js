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
            PackLoader.printChat("\u00A73<Cortana>\u00A74\u00A7l " + detectedEntities.join(", "));
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