function boostdata(entity, manager, boostTime, recoveryTime, deactivationDelay, recoveryDelay) {
    var boost = entity.getData("fiskheroes:dyn/flight_super_boost");

    if (boost == 1) {
        manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 2);
        manager.setData(entity, "fiskheroes:flying", true);
        manager.setData(entity, "fiskheroes:flight_timer", entity.getData("fiskheroes:prev_flight_timer"));
        manager.setData(entity, "fiskheroes:flight_boost_timer", entity.getData("fiskheroes:prev_flight_boost_timer"));
    } else if (!(entity.isSprinting() && entity.getData("fiskheroes:flying")) && boost > 0) {
        manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 0);
        manager.setData(entity, "mhp:dyn/reactivation_count", 0);
    }

    if (boost > 0) {
        manager.setData(entity, "fiskheroes:dyn/super_boost_timeout", recoveryDelay);
    } else {
        var t = entity.getData("fiskheroes:dyn/super_boost_timeout");
        if (t > 0) {
            manager.setData(entity, "fiskheroes:dyn/super_boost_timeout", t - 1);
        }
    }

    manager.incrementData(entity, "fiskheroes:dyn/super_boost_cooldown", boostTime, recoveryTime, boost > 0, boost == 0 && entity.getData("fiskheroes:dyn/super_boost_timeout") == 0);

    if (boost > 0 && entity.getData("fiskheroes:dyn/super_boost_cooldown") >= 1) {
        manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 0);
    }
    if (boost == 0 && entity.getData("fiskheroes:dyn/super_boost_cooldown") >= 1) {
        manager.setData(entity, "fiskheroes:dyn/super_boost_cooldown", 0);
        var reactivationCount = entity.getData("mhp:dyn/reactivation_count") || 0;
        if (reactivationCount < 4) {
            manager.setData(entity, "mhp:dyn/reactivation_count", reactivationCount + 1);
            if (reactivationCount + 1 == 1) {
                manager.setData(entity, "mhp:dyn/boost1", true);
                manager.setData(entity, "mhp:dyn/flight_boost1", true);
                manager.setData(entity, "mhp:dyn/boost1_deactivation_timer", deactivationDelay);
            } else if (reactivationCount + 1 == 2) {
                manager.setData(entity, "mhp:dyn/boost2", true);
                manager.setData(entity, "mhp:dyn/flight_boost1", false);
                manager.setData(entity, "mhp:dyn/flight_boost2", true);
                manager.setData(entity, "mhp:dyn/boost2_deactivation_timer", deactivationDelay);
            } else if (reactivationCount + 1 == 3) {
                manager.setData(entity, "mhp:dyn/boost3", true);
                manager.setData(entity, "mhp:dyn/flight_boost2", false);
                manager.setData(entity, "mhp:dyn/flight_boost3", true);
                manager.setData(entity, "mhp:dyn/boost3_deactivation_timer", deactivationDelay);
            } else if (reactivationCount + 1 == 4) {
                manager.setData(entity, "mhp:dyn/boost4", true);
                manager.setData(entity, "mhp:dyn/flight_boost3", false);
                manager.setData(entity, "mhp:dyn/flight_boost4", true);
                manager.setData(entity, "mhp:dyn/boost4_deactivation_timer", deactivationDelay);
            } else if (reactivationCount == 0) {
                manager.setData(entity, "mhp:dyn/flight_boost4", false);
                manager.setData(entity, "mhp:dyn/flight_boost0", true);
            }
        }
    }

    if (!entity.isSprinting()) {
        manager.setData(entity, "mhp:dyn/flight_boost0", false);
        manager.setData(entity, "mhp:dyn/flight_boost1", false);
        manager.setData(entity, "mhp:dyn/flight_boost2", false);
        manager.setData(entity, "mhp:dyn/flight_boost3", false);
        manager.setData(entity, "mhp:dyn/flight_boost4", false);
    }

    if (entity.getData("mhp:dyn/charge_timer") > 0.45) {
        manager.setData(entity, "fiskheroes:flying", true);
        manager.setData(entity, "mhp:dyn/flight_boost4", true);
    }

    if (entity.getData("mhp:dyn/boost1")) {
        var timer1 = entity.getData("mhp:dyn/boost1_deactivation_timer");
        if (timer1 > 0) {
            manager.setData(entity, "mhp:dyn/boost1_deactivation_timer", timer1 - 1);
        } else {
            manager.setData(entity, "mhp:dyn/boost1", false);
        }
    }
    if (entity.getData("mhp:dyn/boost2")) {
        var timer2 = entity.getData("mhp:dyn/boost2_deactivation_timer");
        if (timer2 > 0) {
            manager.setData(entity, "mhp:dyn/boost2_deactivation_timer", timer2 - 1);
        } else {
            manager.setData(entity, "mhp:dyn/boost2", false);
        }
    }
    if (entity.getData("mhp:dyn/boost3")) {
        var timer3 = entity.getData("mhp:dyn/boost3_deactivation_timer");
        if (timer3 > 0) {
            manager.setData(entity, "mhp:dyn/boost3_deactivation_timer", timer3 - 1);
        } else {
            manager.setData(entity, "mhp:dyn/boost3", false);
        }
    }
    if (entity.getData("mhp:dyn/boost4")) {
        var timer4 = entity.getData("mhp:dyn/boost4_deactivation_timer");
        if (timer4 > 0) {
            manager.setData(entity, "mhp:dyn/boost4_deactivation_timer", timer4 - 1);
        } else {
            manager.setData(entity, "mhp:dyn/boost4", false);
        }
    }

    if (entity.isSprinting() && entity.getData("fiskheroes:flying") && boost == 0) {
        manager.setData(entity, "fiskheroes:dyn/flight_super_boost", 1);
    }
}
