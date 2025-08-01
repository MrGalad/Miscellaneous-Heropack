function init(hero) {
    hero.setName("The Punisher");
    hero.setVersion("Daredevil: Born Again");
    hero.setTier(5);
    
    hero.setChestplate("item.superhero_armor.piece.jacket");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:benelli_m4}", true, item => item.nbt().getString("WeaponType") == 'misc:benelli_m4');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:glock_19}", true, item => item.nbt().getString("WeaponType") == 'misc:glock_19');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:smith_wesson_27}", true, item => item.nbt().getString("WeaponType") == 'misc:smith_wesson_27');
    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:misc:barrett_m82}", true, item => item.nbt().getString("WeaponType") == 'misc:barrett_m82');

    hero.addAttribute("PUNCH_DAMAGE", 6, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.6, 0);
    hero.addAttribute("FALL_RESISTANCE", 0.30, 1);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    
    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.supplyFunction("canAim", canAim);
    hero.setHasPermission(hasPermission);
    
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "GUN_RELOAD":
        return (entity.getHeldItem().isGun() || (entity.getHeldItem().name() == "fisktag:weapon" && !entity.getHeldItem().isWeapon())) && !entity.getData("fiskheroes:aiming");
        default: 
        return true;
    }
} 

function hasPermission(entity, permission) {
    return entity.getData('fiskheroes:reload_timer') == 0 && (permission == "USE_GUN" );
}

function canAim(entity) {
    return entity.getHeldItem().isGun() || (entity.getHeldItem().name() == "fisktag:weapon" && !entity.getHeldItem().isWeapon());
}