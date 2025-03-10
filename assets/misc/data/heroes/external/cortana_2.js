var messagesSent = false;
function health(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("misc:dyn/cortana"),
        run: (entity.getData("misc:dyn/run_timer") == 1),
        sprinting: entity.getData("fiskheroes:ticks_since_sprinting"),
        armor: 1024 - entity.getWornChestplate().damage(),
        health: Math.round(entity.getHealth() * 10) / 10,
        damage: 0 + entity.getWornChestplate().damage(),
        warning: (entity.getHealth() < 6) && entity.getData("misc:dyn/cortana"),
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
       /* if (diagnostics.cortana && diagnostics.run &&!messagesSent) {
            PackLoader.printChat(messages.healthStatus);
            PackLoader.printChat(messages.damageReceived);
            PackLoader.printChat(messages.armorIntegrity);
            
            messagesSent = true
            /* for (var message in messages) {
                PackLoader.printChat(messages[message]);
                manager.setData(entity, "misc:dyn/run_timer", 0) 
            } */
        } /* else if (diagnostics.cortana && diagnostics.run === 0.1) {
            PackLoader.printChat(messages2.runningDiagnostics);
        } */ if (diagnostics.helmet && trollmessage) {
            PackLoader.printChat(messages2.troll)
            trollmessage = false
        } else if (!diagnostics.helmet && !trollmessage) {
            trollmessage = true;
        }
      if (PackLoader.getSide() == "SERVER") {
        null
    }
}
var warningmessage = true;
var trollmessage = true

function warning(entity, manager) {
    var diagnostics = {
        cortana: entity.getData("misc:dyn/cortana"),
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
            if (entity.getUUID() !== targetEntity.getUUID() && targetEntity.getEntityName() != null) {
                entityCollection.push(targetEntity.getEntityName());
            }
        }
    }

    return entityCollection;
}

var scamStatus = true;

function EntityScan(entity, manager) {
    var cortanaOn = entity.getData("misc:dyn/cortana");
    var scamTimer = entity.getInterpolatedData("misc:dyn/mob_timer");
    var dome = entity.getData("fiskheroes:lightsout_id");
    var domeInstance = entity.world().getEntityById(dome);

    var messages = {
        detect: "\u00A73<Cortana> Entities nearby:",
    };

    var detectedEntities = retrieveinDome(entity);
    var mobsToColor = {
        "Zombie": "\u00A74", 
        "Skeleton": "\u00A74", 
        "Creeper": "\u00A74", 
        "Enderman": "\u00A79", 
        "Spider": "\u00A74", 
        "Silverfish": "\u00A74", 
        "Witch": "\u00A74", 
        "Ghast": "\u00A74", 
        "Blaze": "\u00A74", 
        "LavaSlime": "\u00A74", 
        "CaveSpider": "\u00A74",
        "fiskheroes.Creetle": "\u00A74",
        "Slime": "\u00A74", 
        "EnderDragon": "\u00A74", 
        "WitherBoss": "\u00A74", 
        "Wither Skeleton": "\u00A74", 
        "Wolf": "\u00A79", 
        "VillagerGolem": "\u00A79", 
        "SnowMan": "\u00A79", 
        "PigZombie": "\u00A79", 
        "Villager": "\u00A7a", 
        "Ozelot": "\u00A7a", 
        "EntityHorse": "\u00A7a", 
        "Bat": "\u00A79", 
        "Squid": "\u00A79",  
        "Sheep": "\u00A7a", 
        "Pig": "\u00A7a", 
        "Cow": "\u00A7a", 
        "Chicken": "\u00A7a", 
        "Rabbit": "\u00A7a", 
        "MushroomCow": "\u00A7a"
    };
    var replace = {
    "EntityHorse": "Horse",
    "fiskheroes.Creetle": "Creetle",
    "PigZombie": "Zombie Pigman",
    "VillagerGolem": "Iron Golem"
    }
    if (PackLoader.getSide() === "CLIENT") {
        var scanCondition = detectedEntities.length > 0 && cortanaOn;
        if (scanCondition && scamStatus) {
            PackLoader.printChat(messages.detect + " " + detectedEntities.map(value => (mobsToColor[value] || "") + (replace[value] || value)).join(", \u00A7r").replace(", null", ""));
            scamStatus = false;
            entity.playSound("minecraft:random.orb", 4, 1);
        } else if (!scanCondition && !scamStatus) {
            scamStatus = true;
        }
    }

    if (domeInstance && domeInstance.exists()) {
        manager.setData(entity, "misc:dyn/mob_timer", 1);
        manager.setData(entity, "misc:dyn/mobscan", true);
    } else if (cortanaOn) {
        manager.setData(entity, "misc:dyn/mob_timer", Math.max(scamTimer - 0.01, 0));
    }
}
  