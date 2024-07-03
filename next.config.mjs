/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_SUPABASE_REF}.supabase.co`] // Add your hostname here
  }
};

export default nextConfig;
