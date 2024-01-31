import React from "react";

const Faq = () => {
  return (
    <div>
      <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
          <div className="md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10">
          
            <div>

              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-xl  text-black leading-5 ">
                  Entenda seu publico
                </h3>
                <button
                  aria-label="too"
                  className="text-gray-800 dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onclick="openAnsSection(1)"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="path1"
                      className=""
                      d="M10 4.1665V15.8332"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.16602 10H15.8327"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <p
                id="para1"
                className="hidden font-normal text-black text-base leading-6  mt-4 w-11/12">
                Veja um aumento significativo no engajamento e retorno sobre o
                investimento.
              </p>
            </div>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
