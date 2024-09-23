function health(entity, manager) {
    var diagnostics = {
      cortana: entity.getData("mhp:dyn/cortana"),
      sprinting: entity.getData("fiskheroes:ticks_since_sprinting"),
      armor: 1024 - entity.getWornChestplate().damage(),
      health: Math.round(entity.getHealth()*10)/10
    };
  
    var messages = {
      runningDiagnostics: "\u00A73<Cortana>\u00A7b Running system diagnostics...",
      healthStatus: "\u00A73<Cortana>\u00A7b Health: " + diagnostics.health,
      armorIntegrity: "\u00A73<Cortana>\u00A7b Overall Armor Integrity: " + diagnostics.armor + " / 1024"
    };
  
    if (PackLoader.getSide() === "CLIENT") {
      if (diagnostics.cortana && diagnostics.sprinting === 200) {
        for (var message in messages) {
          PackLoader.printChat(messages[message]);
        }
      } else if (diagnostics.sprinting === 130) {
        PackLoader.printChat(messages.runningDiagnostics);
      }
    }
  }