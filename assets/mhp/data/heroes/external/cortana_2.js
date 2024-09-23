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

function moblist(entity) {
    var diagnostics = {
        domeId: entity.getData("fiskheroes:lightsout_id"),
        dome: entity.world().getEntityById(entity.getData("fiskheroes:lightsout_id")),
    };

    var list = [];
    if (diagnostics.dome.exists()) {
        var contained = diagnostics.dome.as("SHADOWDOME").getContainedEntities();
        for (var i = 0; i < contained.size(); ++i) {
            var target = contained.get(i);
            if (entity.getUUID() !== target.getUUID()) {
                list.push(target.getEntityName());
            }
        }
    }
    return list;
}

var mobscanMessage = true;

function scanner(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("mhp:dyn/cortana"),
        scannerTimer: entity.getInterpolatedData("mhp:dyn/mob_cooldown"),
        domeId: entity.getData("fiskheroes:lightsout_id"),
        dome: entity.world().getEntityById(entity.getData("fiskheroes:lightsout_id")),
    };

    var messages = {
        mobScan: "\u00A73<Cortana> Entities nearby:",
    };

    var targetsNames = moblist(entity, manager);

    if (PackLoader.getSide() === "CLIENT") {
        var condition = targetsNames.length > 0 && diagnostics.cortana;
        if (condition && mobscanMessage) {
            PackLoader.printChat(messages.mobScan);
            PackLoader.printChat("\u00A73<Cortana>\u00A74\u00A7l " + targetsNames.join(", "));
            mobscanMessage = false;
        } else if (!condition && !mobscanMessage) {
            mobscanMessage = true;
        }
    }  if (PackLoader.getSide() == "SERVER") {
        null
    }
    
    if (diagnostics.dome.exists()) {
        manager.setData(entity, "mhp:dyn/mob_cooldown", 1);
        manager.setData(entity, "mhp:dyn/mobscan", true);
    } else if (diagnostics.cortana) {
        manager.setData(entity, "mhp:dyn/mob_cooldown", Math.max(diagnostics.scannerTimer - 0.01, 0));
    }
}