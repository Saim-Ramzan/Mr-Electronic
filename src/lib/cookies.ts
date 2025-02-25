'use server'
import { cookies } from "next/headers";
// eslint-disable-next-line
export async function setCookie (name: string, token:any) {
    const cookieStore = await cookies()
    cookieStore.set(name, token)
}

export async function getCookie (name: string) {
    const cookieStore = await cookies()
    return cookieStore.get(name)?.value
}

export async function clearCookie (name: string) {
    const cookieStore = await cookies()
    return cookieStore.delete(name)
}
