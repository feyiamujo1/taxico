import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="h-screen 2xl:max-h-[1400px] flex flex-col justify-between box-border">
        <div className="w-11/12 md:max-w-[627px] mx-auto text-center pt-[50%] md:py-36 space-y-4">
          <h1 className="text-2xl md:text-[64px] md:leading-[77px] font-bold text-custom-black">
            Micra Shuttle Ticketing System
          </h1>
          <p className=" md:text-xl text-dark-ash font-light">
            Move and Pay Freely at the lowest prices with Taxico!
          </p>
          <div className="flex text-sm sm:text-base justify-center items-center gap-3">
            <Link
              href={"/"}
              className="py-3 px-6 rounded-3xl bg-custom-blue text-white">
              Book Ticket
            </Link>
            <Link
              href={"/"}
              className="py-3 px-6 rounded-3xl border border-dark-ash">
              Sign up to drive
            </Link>
          </div>
        </div>
        <video
          className="w-full h-72 object-cover object-bottom"
          controls={false}
          loop
          autoPlay
          muted
          preload="none">
          <source src="/videos/moving-car.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="w-11/12 2xl:w-[1400px] py-8 md:py-16 mx-auto flex flex-col md:flex-row gap-8 box-border">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-surface p-8 rounded-[32px]">
          <Image
            src="/images/Mobile-Mock.png"
            alt="phone mockup"
            width={300}
            height={400}
            className="w-full md:w-fit"
          />
        </div>
        <div className="w-full md:w-1/2 bg-secondary rounded-[32px] p-4 md:px-6 md:py-8 flex flex-col justify-between">
          <div className="bg-white rounded-[32px] w-full h-[300px] mb-16 md:mb-0"></div>
          <div className="space-y-3 md:space-y-6">
            <p className="text-white text-xl md:text-3xl font-semibold">
              Start using Taxico’s Ticketing System today and change the way you
              move
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={"/"}
                className="py-3 px-6 rounded-3xl bg-custom-blue text-white">
                For Commuters
              </Link>
              <Link href={"/"} className="text-white">
                For Drivers
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-11/12 2xl:w-[1400px] py-8 md:py-8 md:pb-16 mx-auto space-y-8 md:space-y-20 box-border">
        <h2 className=" font-semibold text-2xl md:text-4xl">
          Making money is a breeze
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="md:text-center md:max-w-[336px]">
            <Image
              src={"/images/money.png"}
              alt="money icon"
              width={47}
              height={40}
              className="md:mx-auto w-8 md:w-12"
            />
            <p className="font-semibold text-custom-black text-xl md:text-2xl mb-1.5 mt-3.5 md:mb-2 md:mt-6">
              Payment Integration
            </p>
            <p className="font-light text-custom-black">
              Securely integrate your payment methods for a smooth transaction
              process.
            </p>
          </div>
          <div className="md:text-center md:max-w-[336px]">
            <Image
              src={"/images/inventory.png"}
              alt="money icon"
              width={47}
              height={40}
              className="md:mx-auto w-8 md:w-12"
            />
            <p className="font-semibold text-custom-black text-xl md:text-2xl mb-1.5 mt-3.5 md:mb-2 md:mt-6">
              Purchase Ticket
            </p>
            <p className="font-light text-custom-black">
              Buy tickets in advance, specify quantity and price, and avoid
              last-minute hassles.
            </p>
          </div>
          <div className="md:text-center md:max-w-[336px]">
            <Image
              src={"/images/ticket.png"}
              alt="money icon"
              width={47}
              height={40}
              className="md:mx-auto w-8 md:w-12"
            />
            <p className="font-semibold text-custom-black text-xl md:text-2xl mb-1.5 mt-3.5 md:mb-2 md:mt-6">
              Realtime Updates
            </p>
            <p className="font-light text-custom-black">
              Receive real-time updates on your purchased ticket payment and
              status.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
