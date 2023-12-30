import  {createClient} from "@sanity/client";
import  ImageUrlBuilder from "@sanity/image-url";

export const client=createClient({
  projectId:import.meta.env.VITE_SANITY_ID,
  dataset:'production',
  useCdn:true,
  apiVersion:'2023-12-24',
  token:import.meta.env.VITE_SANITY_TOKEN,
});

const builder=ImageUrlBuilder(client);

export const urlFor=(source)=>builder.image(source)