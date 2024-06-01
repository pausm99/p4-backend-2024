export const env = (envName: string) => {
    const key = process.env[envName]
    if (key === undefined) throw new Error(`missing env key ${envName}`)
    else return key
}