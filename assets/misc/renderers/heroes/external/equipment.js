Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
}

function getItemsInEquipmentSlots(entity) {
    var equipped = [];
    var equipment = entity.getWornChestplate().nbt().getTagList('Equipment');
    for (var i = 0; i < equipment.tagCount(); i++) {
        equipped.push(equipment.getCompoundTag(i).getCompoundTag('Item').getCompoundTag('tag').getString("WeaponType"));
    }
    return equipped;
}

function isItemEquipped(entity, weaponType) {
    var equippedItems = getItemsInEquipmentSlots(entity);
    return equippedItems.includes(weaponType);
}