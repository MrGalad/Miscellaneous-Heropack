
function init(hero) {
    hero.setName("Striker Eureka");
    hero.setVersion("Pacfic Rim");
    hero.setTier(9);
    
    hero.setChestplate("Energy Core");
    
    hero.setDefaultScale(19);
    
    hero.addPowers("mhp:jaeger")
    hero.addAttribute("PUNCH_DAMAGE", 12, 0);
    hero.addAttribute("SPRINT_SPEED", 0.70, 1)
    hero.addAttribute("STEP_HEIGHT", 0.5, 0); 
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    
    hero.addKeyBind("BLADE", "Deploy Sting Blades", 1);
    hero.addKeyBind("CHARGED_BEAM", "WMB2x90 Anti-Kaiju Missile Launcher", 2);
    
    hero.addAttributeProfile("STINGBLADES", stingbladesProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("STINGBLADES", {"types": {"SHARP": 1.0}});

}

function stingbladesProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 16.0, 0);
}

function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "STINGBLADES" : null;
}