import slugify from 'slugify'

export const slug = (name: string, id: string) => {
  return '/store/product/' + slugify(`${name} ${id}`)
}
