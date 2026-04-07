import { menuItems, menuSections } from "../data/mock-data";
import { MenuItem, MenuSection } from "../types/shop";

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
    const sections = (await getMenuSectionsByShopId(id)).sort(
        (left, right) => left.sortOrder - right.sortOrder,
    );
    const shopMenuItems = await getMenuByShopId(id);

    if (!sections.length) {
        return [];
    }

    const menuList = sections.map((section) => {
        return {
            menuSectionId: section.id,
            menuSectionName: section.name,
            menuSectionSortOrder: section.sortOrder,
            menu: shopMenuItems.filter((menu:MenuItem) => menu.sectionId === section.id)
        }
    });

    return menuList;
}
