function land(entity, manager) {
    var t = entity.getData("fiskheroes:dyn/superhero_landing_ticks");

   if (t == 0 && !entity.isOnGround() && entity.motionY() < -1 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid() && (false ? entity.getData("fiskheroes:flight_boost_timer") > 0 : !entity.getData("fiskheroes:flying"))) {
        manager.setDataWithNotify(entity, "fiskheroes:dyn/superhero_landing_ticks", t = 12);
    }
    else if (t > 0) {
        manager.setData(entity, "fiskheroes:dyn/superhero_landing_ticks", --t);
    }

    manager.incrementData(entity, "fiskheroes:dyn/superhero_landing_timer", 2, 8, t > 0);
}
