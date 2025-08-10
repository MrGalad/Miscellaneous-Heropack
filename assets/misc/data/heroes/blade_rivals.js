function init(hero) {
    
    hero.setName("Blade");
    hero.setVersion("Marvel Rivals");
    hero.setTier(6);
    
    hero.setHelmet("Shades");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.shoes");
    
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:ancestral_sword}", true, item => item.nbt().getString("WeaponType") == 'misc:ancestral_sword');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:dracula}", true, item => item.nbt().getString("WeaponType") == 'misc:dracula');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:blade_shotgun}", true, item => item.nbt().getString("WeaponType") == 'misc:blade_shotgun');
    
    hero.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 5.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    
    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.supplyFunction("canAim", canAim);
    hero.setHasPermission(hasPermission);
    
    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "misc:dyn/sprinting", 7, entity.isSprinting() && entity.isOnGround());
        
        manager.incrementData(entity, "misc:dyn/shield_timer", 3, entity.getHeldItem().nbt().getString("WeaponType") == "misc:ancestral_sword" && entity.as("PLAYER").isUsingItem());
    });
    
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "GUN_RELOAD":
        return (entity.getHeldItem().isGun() || (entity.getHeldItem().name() == "fisktag:weapon" && !entity.getHeldItem().isWeapon())) && !entity.getData("fiskheroes:aiming");
        default: return true;
    }
} 

function hasPermission(entity, permission) {
    return entity.getData('fiskheroes:reload_timer') == 0 && (permission == "USE_GUN" );
}

function canAim(entity) {
    return entity.getHeldItem().isGun() || (entity.getHeldItem().name() == "fisktag:weapon" && !entity.getHeldItem().isWeapon());
}