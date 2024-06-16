import { getDatabase as FgetDatabase } from "firebase/database"
import { FirebaseApp } from "@/shared/config/firebase-config"

export const db = FgetDatabase(FirebaseApp)

export const flattenObjToArray = (obj: any) => {
    if (obj == "undefined" || typeof obj == null) {
        return []
    } else {
        const array = Object.keys(obj).map((key) => ({
            uuid: key,
            ...obj[key],
        }))

        return array
    }
}
