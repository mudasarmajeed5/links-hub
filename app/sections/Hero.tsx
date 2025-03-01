import Button from "@/app/components/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="hero" className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 bg-black/60">
      <div className="container">
        <div className="relative z-2 max-w-512 max-lg:max-w-388">
          <div className="caption small-2 uppercase text-p3">Link Management</div>
          <h1 className="mb-6 h1 text-p3 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
            Your Links, Simplified
          </h1>
          <p className="max-w-440 mb-14 body-1 max-md:mb-10">
            Linkshub is designed to give you an easy and powerful way to manage all your links in one place.
          </p>
          <div>
            <Button icon="/images/zap.svg">Get Started</Button>
          </div>
        </div>


        <div className="absolute top-32 lg:top-44 left-[calc(80%-340px)] setPhoneStar pointer-events-none hero-img_res">
          <Image
            src="/images/hero1.png"
            width={400}
            height={400}
            alt="hero"
            className="size-400 max-lg:h-auto imgRotate"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
