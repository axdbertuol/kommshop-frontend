import { getTranslations } from 'next-intl/server'

export async function generateTranslationObject(
  namespace: string,
  keys: string[],
  options?: { method?: 'rich' } | null
) {
  const t = await getTranslations(namespace)
  const translate = options?.method === 'rich' ? t.rich : t

  const generateTranslations = (key: string) => [
    key,
    translate(`${key}`, {
      span: (chunks) => <span>{chunks}</span>,
      ol: (chunks) => <ol className="list-decimal pl-4">{chunks}</ol>,
      li: (chunks) => <li>{chunks}</li>,
    }) as JSX.Element | string,
  ]
  const result = Object.fromEntries(keys.map(generateTranslations))
  return result
}
