"use client";
import { faq } from "../../constants/index";
import FaqItem from "../components/FaqItem";

// Define types for the FAQ item
interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
  className?: string;
}

const Faq: React.FC = () => {
  const halfLength = Math.floor(faq.length / 2);

  return (
    <section id="faq" className="dark:bg-black bg-white text-black dark:text-white">
      <div className="container relative z-2 py-28">
        <div>
          <h3 className="h3 max-md:h5 max-w-640 max-lg:max-w-md mb-7 dark:text-p4 text-black">
            Curiosity didn't kill the cat, it gave it answers.
          </h3>
          <p className="body-1 max-lg:max-w-sm dark:text-p4 text-gray-700">
            You've got questions, we've got answers.
          </p>
        </div>

        <div className="faq-line_after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 dark:bg-s2 bg-gray-300" />
      </div>

      <div className="faq-glow_before relative z-2 border-2 dark:border-s2 dark:bg-s1 text-black border-gray-300">
        <div className="container flex gap-10 max-lg:block">
          <div className="rounded-half absolute -top-10 left-[calc(50%-40px)] z-4 flex size-20 items-center justify-center dark:border-s2 dark:bg-s1 bg-white">
            <img src="/images/faq-logo.svg" alt="logo" className="size-1/2" />
          </div>

          <div className="relative flex-1 pt-24">
            {faq.slice(0, halfLength).map((item: FaqItemProps, index: number) => (
              <FaqItem  key={item.id} item={item} index={index} className="text-gray-900 dark:text-white" />
            ))}
          </div>


          <div className="relative flex-1 lg:pt-24 !text-black dark:text-white">
            {faq.slice(halfLength).map((item: FaqItemProps, index: number) => (
              <FaqItem key={item.id} item={item} index={halfLength + index} />
            ))}
          </div>
        </div>

        <div className="faq-lin_after absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 dark:bg-s2 bg-gray-300 max-lg:hidden" />
      </div>
    </section>
  );
};

export default Faq;
