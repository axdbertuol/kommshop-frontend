import Cryptr from 'cryptr'

export function encrypt(text: string) {
  const secretKey = process.env.TOKEN_SECRET ?? ''
  const cryptr = new Cryptr(secretKey, { saltLength: 16 })

  const encryptedString = cryptr.encrypt(text)
  return encryptedString
}

export function decrypt(encryptedString: string) {
  const secretKey = process.env.TOKEN_SECRET ?? ''
  const cryptr = new Cryptr(secretKey, { saltLength: 16 })

  const text = cryptr.decrypt(encryptedString)
  return text
}
