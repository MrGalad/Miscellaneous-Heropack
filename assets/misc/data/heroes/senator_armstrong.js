function init(hero) {
    hero.setName("Senator Armstrong");
    hero.setVersion("Revengeance");
    hero.setTier(9);

    hero.setHelmet("Head");
    hero.setChestplate("item.superhero_armor.piece.chestplate");
    hero.setLeggings("item.superhero_armor.piece.leggings");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("misc:nanotech_infusion");
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("WEAPON_DAMAGE", 3, 0)

    hero.addKeyBind("CHARGED_BEAM", "Outburst", 1);
    hero.addKeyBind("HEADBUTT", "Headbutt", 2);
    hero.addKeyBind("STOMP", "Stomp", 3);

	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);

    hero.setTickHandler((entity, manager) => {
    })
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:energy_projection":
            switch (modifier.id()) {
                case "stomp":
                    return entity.getData("misc:dyn/stomp")
                case "headbutt":
                    return entity.getData("misc:dyn/headbutt")
                default:
                    break;
            }
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
	case "GUN_RELOAD":
		return entity.getHeldItem().isGun() && !entity.getData("fiskheroes:aiming");
        default:
		return true;
    }
}