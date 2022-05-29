import sanityClient from "@sanity/client"
import imageBuilder from "@sanity/image-url"

export const client = sanityClient({
    projectId: 'quviczr5',
    dataset: 'production',
    apiVersion: '2022-05-29',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageBuilder(client);
export const urlFor:any = (source) => builder.image(source)
