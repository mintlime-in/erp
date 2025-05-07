import { imagesInErp, permissionsInErp, rolesInErp, usersInErp } from "@/app/db/schemas/erp"

export const resourcesMap = new Map<string, any>()
resourcesMap.set("images", imagesInErp)
resourcesMap.set("users", usersInErp)
resourcesMap.set("permissions", permissionsInErp)
resourcesMap.set("roles", rolesInErp)

export function getResource(resourceType: string) {
    let resource = resourcesMap.get(resourceType)
    if (!resource) {
        throw new Error(`Resource type ${resourceType} not found`)
    }
    return resource
}