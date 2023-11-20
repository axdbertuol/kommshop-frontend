'use server'
const algorithm = 'AES-GCM'

async function getEncodedKey() {
  const secret = process.env.TOKEN_SECRET!
  return await crypto.subtle.importKey(
    'raw',
    Buffer.from(secret, 'base64'),
    {
      name: algorithm,
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  )
}
export async function encryptSymmetric(plaintext: string) {
  // create a random 96-bit initialization vector (IV)

  const iv = crypto.getRandomValues(new Uint8Array(12))

  // encode the text you want to encrypt
  const encodedPlaintext = new TextEncoder().encode(plaintext)

  // prepare the secret key for encryption
  const secretKey = await getEncodedKey()

  // encrypt the text with the secret key
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: algorithm,
      iv: iv,
    },
    secretKey,
    encodedPlaintext
  )

  // return the encrypted text "ciphertext" and the IV
  // encoded in base64
  return {
    cyphertext: Buffer.from(ciphertext).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
  }
}

export async function decryptSymmetric(ciphertext: string, iv: string) {
  if (!iv) throw new Error('No iv defined for ciphertext')
  const secretKey = await getEncodedKey()

  const cleartext = await crypto.subtle.decrypt(
    {
      name: algorithm,
      iv: Buffer.from(iv, 'base64'),
    },
    secretKey,
    Buffer.from(ciphertext, 'base64')
  )

  // decode the text and return it
  return new TextDecoder().decode(cleartext)
}
