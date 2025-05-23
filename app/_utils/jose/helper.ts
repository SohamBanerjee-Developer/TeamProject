import {EncryptJWT, jwtDecrypt} from 'jose'
import {JwtPayload} from "jsonwebtoken";


const privateKey = new TextEncoder().encode(process.env.SECRET_KEY || "");


export const encryptToken = async <T, >(payload: T, expiresIn: string = '1h'): Promise<string> => {

    const secretToken = await new EncryptJWT(payload || {}).setProtectedHeader({
        alg: 'dir',
        enc: 'A256GCM'
    }).setIssuedAt()
        .setExpirationTime(expiresIn)
        .encrypt(privateKey);

    return secretToken;
}

export async function decryptUserId(encryptedJwt:string):Promise<JwtPayload>
{
    const { payload } = await jwtDecrypt(encryptedJwt, privateKey);
    return payload;
}

