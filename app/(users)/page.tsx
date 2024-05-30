"use client";
import Image from "next/image";
import Link from "next/link";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export default function Home() {
  return (
    <main>
      <section className="h-screen 2xl:max-h-[1400px] flex flex-col justify-between">
        <div className="w-11/12 md:max-w-[627px] mx-auto text-center pt-[50%] md:py-36 space-y-4">
          <h1 className="text-2xl md:text-[64px] md:leading-[77px] font-bold text-custom-black">
            Micra Shuttle Ticketing System
          </h1>
          <p className=" md:text-xl text-dark-ash font-light">
            Move and Pay Freely at the lowest prices with Taxico!
          </p>
          <div className="flex text-sm sm:text-base justify-center items-center gap-3 relative z-10">
            <Link
              href={"/dashboard"}
              className="py-3 px-6 rounded-3xl bg-custom-blue text-white">
              Book Ticket
            </Link>
            <Link
              href={"/driver-signup"}
              className="py-3 px-6 rounded-3xl border border-dark-ash">
              Sign up to drive
            </Link>
          </div>
        </div>
        <DotLottiePlayer
          src={"/lottie/Car-2.lottie"}
          className="-mt-[40%] w-full overflow-hidden z-0"
          autoplay
          loop></DotLottiePlayer>
      </section>
      <section className="w-11/12 2xl:w-[1400px] py-8 md:py-16 mx-auto flex flex-col md:flex-row gap-8 md:gap-12 box-border">
        <div className="w-full md:w-1/2 flex justify-center items-center bg-surface p-8 rounded-[32px]">
          <Image
            src="/images/Mobile-Mock.png"
            alt="phone mockup"
            width={300}
            height={400}
            className="w-full md:w-fit"
          />
        </div>
        <div className="w-full md:w-1/2 rounded-[32px] flex flex-col space-y-3 md:space-y-6">
          <div className="bg-transparent-blue flex flex-col gap-3 md:gap-6 px-4 py-6 md:px-6 md:py-8 rounded-[32px] w-full h-full mb-16 md:mb-0 ">
            <div className="w-full h-fit md:h-[300px]">
              <Image
                src={"/images/ticketcard.png"}
                alt="ticket card"
                className="w-full h-auto md:h-full"
                height={300}
                width={300}
              />
            </div>
            <p className=" text-xl md:text-[32px] md:leading-10 font-semibold mt-4">
              Start using Taxico’s Ticketing System today and change the way you
              move around Ife
            </p>
            <p className=" text-custom-blue underline text-base md:text-2xl font-semibold">
              Get Started today
            </p>
          </div>
          <p className="w-full bg-custom-blue text-white text-center text-sm px-2.5 py-3 md:py-4 md:text-lg rounded-[32px] font-semibold">
            Payments powered by Paystack
          </p>
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
