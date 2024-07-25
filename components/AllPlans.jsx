import React from "react";
import Link from "next/link";

const AllPlans = () => {
  return (
    <div id="precos" className="container mx-auto p-3">
      <div className="">
        <div className=" ">
          <h2 className="mt-6 md:text-center"></h2>

          <div className="flex flex-col items-center justify-center min-h-screen  text-gray-700 bg-gray-100 md:p-20">
            <h1 className="text-center text-[#39B6EB] p-5">
              Preços simples e transparentes para a sua empresa
            </h1>

            <div className="flex flex-row md:flex-nowrap flex-wrap flex-grow items-center justify-center w-full max-w-4xl mt-8">
              <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500">
              
                  <div className="flex flex-col items-center p-10 bg-gray-200">
                    <span className="font-semibold text-2xl">Web Start</span>
                    <p className="text-gray-500">A partir de:</p>
                    <div className="flex items-center">
                      <span className="text-3xl">R$</span>
                      <span className="text-5xl font-bold">700</span>
                      <span className="text-2xl text-gray-500">/mês</span>
                    </div>
                  </div>

                  <div className="p-10">
                    <ul>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">
                          Site institucional responsivo
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">
                          Integração básica de sistemas
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">Automação basica</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">Suporte técnico básico</span>
                      </li>
                    </ul>
                  </div>
               

                <a
                  href="https://api.whatsapp.com/send?phone=%2B5519989331908&data=ARCfCoqXL6rAuAeRtb11yu7mTAXVzpS7R-2_bWpHOkmckPOwx0hkFkFkgz-usYQHRMW1Gv6hwxJJW5jf6QICCMa1Ai7DswvlKNoDCxIo7m3JyQMo6vGDsRLT7nqWawnb6lpO0OwsK_ogxLzd4PWyeVbuFg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2_qJkpPjDi8B5_waq26qjrRJtYiMSLxylP7l0HrF8X-6u7Lt1xfI_3T5o"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex px-10 pb-10 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase  rounded-lg">
                      Assine agora!
                    </button>
                  </div>
                </a>
              </div>

              <div className=" flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg  hover:scale-110 ease-in duration-500">
               
                  <div className="flex flex-col items-center p-10 bg-gray-200 ">
                    <span className="font-semibold text-2xl">Web Boost</span>
                    <p className="text-gray-500">A partir de:</p>
                    <div className="flex items-center">
                      <span className="text-3xl">R$</span>
                      <span className="text-6xl font-bold">800</span>
                      <span className="text-2xl text-gray-500">/mês</span>
                    </div>
                    <p className="text-xl text-gray-500">Durante 3 meses</p>
                  </div>
                  <div className="p-10 ">
                    <ul>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20  "
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">
                          Site institucional responsivo{" "}
                        </span>
                      </li>

                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">
                          Integração multiplo de sistemas
                        </span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">Automação intermediaria</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-600 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">
                          Suporte técnico prioritário
                        </span>
                      </li>
                    </ul>
                  </div>
              
                <a
                  href="https://api.whatsapp.com/send?phone=%2B5519989331908&data=ARCfCoqXL6rAuAeRtb11yu7mTAXVzpS7R-2_bWpHOkmckPOwx0hkFkFkgz-usYQHRMW1Gv6hwxJJW5jf6QICCMa1Ai7DswvlKNoDCxIo7m3JyQMo6vGDsRLT7nqWawnb6lpO0OwsK_ogxLzd4PWyeVbuFg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2_qJkpPjDi8B5_waq26qjrRJtYiMSLxylP7l0HrF8X-6u7Lt1xfI_3T5o"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex px-10 pb-10 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase rounded-lg">
                      Assine agora!
                    </button>
                  </div>
                </a>
              </div>

              <div className="flex flex-col mt-8 flex-grow overflow-hidden bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Mastery</span>
                  <div className="text-center text-lg">
                    <p className="text-gray-500">Consultoria exclusiva,</p>
                    <p className="text-gray-500">consulte nossa </p>
                    <p className="text-gray-500"> equipe comercial</p>
                  </div>

                  <div className="flex items-center">
                    <span className="text-3xl"></span>
                    <span className="text-5xl font-bold"></span>
                    <span className="text-2xl text-gray-500"></span>
                  </div>
                </div>
                <div className="p-10">
                  <ul>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-base">
                        Site institucional responsivo
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="ml-7"></span>
                    </li>

                    <li className="flex items-center">
                      <span className="ml-7"></span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">Integração completa</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">Automação avançada</span>
                    </li>
                    <li className="flex items-center">
                      <span className="ml-7"></span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">Suporte técnico consultoria</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="https://api.whatsapp.com/send?phone=%2B5519989331908&data=ARCfCoqXL6rAuAeRtb11yu7mTAXVzpS7R-2_bWpHOkmckPOwx0hkFkFkgz-usYQHRMW1Gv6hwxJJW5jf6QICCMa1Ai7DswvlKNoDCxIo7m3JyQMo6vGDsRLT7nqWawnb6lpO0OwsK_ogxLzd4PWyeVbuFg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR2_qJkpPjDi8B5_waq26qjrRJtYiMSLxylP7l0HrF8X-6u7Lt1xfI_3T5o"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex px-10 pb-10 justfy-center">
                    <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase rounded-lg">
                      Assine agora!
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlans;
