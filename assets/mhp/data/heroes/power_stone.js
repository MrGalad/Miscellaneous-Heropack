function init(hero) {
    hero.setName("Power");
    hero.setTier(2);
    
    hero.setChestplate("Stone");

    hero.addPowers("mhp:power_stone");
    hero.addAttribute("PUNCH_DAMAGE", 10, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "\u00A75Charged Beam", 1);
    hero.addKeyBind("CHARGED_PUNCH", "\u00A75Empowered Punch", 2);

    hero.addAttributeProfile("PUNCH", punchProfile);
    hero.addDamageProfile("PUNCH", {
        "types": {
            "FIRE": 1.0
        },
        "properties": {
            "COOK_ENTITY": true,
            "HEAT_TRANSFER": 160,
            "IGNITE": 2
        }
    })
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getAttributeProfile);
}

function punchProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.0, 0);
}

function getAttributeProfile(entity) {
    return entity.getData("fiskheroes:punchmode") ? "PUNCH" : null;
}