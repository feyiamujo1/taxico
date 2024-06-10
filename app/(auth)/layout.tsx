import NavLinkSelector from "~/components/auth/NavLinkSelector";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative m-0 w-full p-0">
      <NavLinkSelector />
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-32 sm:w-[400px] md:mt-24 md:w-[400px] md:py-28 2xl:w-[450px]">
          {children}
        </div>
      </div>
    </div>
  );
}
