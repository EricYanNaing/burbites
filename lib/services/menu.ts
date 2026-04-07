import { menuItems, menuSections, shops } from "../data/mock-data";
import { MenuItem, MenuSection, Shop } from "../types/shop";

export async function getMenuByShopId(id?:string) {
    return menuItems.filter((menu:MenuItem) => menu.shopId === id);
}

export async function getMenuSection() {
    return menuSections;
}

export async function getMenuSectionsByShopId(id?:string) {
    return menuSections.filter((section:MenuSection) => section.shopId === id);
}

export async function getShopMenuListBySection(id?:string) {
    const sections = await getMenuSectionsByShopId(id);
    const menuItems = await getMenuByShopId(id);
    console.log(menuItems)
    if(!sections) return [];
    const menuList =sections.map((section) => {
        return {
            menuSectionId: section.id,
            menuSectionName: section.name,
            menuSectionSortOrder: section.sortOrder,
            menu: menuItems.filter((menu:MenuItem) => menu.sectionId === section.id)
        }
    })

    return menuList;
}
