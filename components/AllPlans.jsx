import React from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

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

            <div className="flex flex-row md:flex-nowrap flex-wrap flex-grow items-center justify-center w-full max-w-5xl mt-8">
              <div className="flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg  shadow-lg hover:scale-110 ease-in duration-500">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Start</span>
                  <p className="text-gray-500 text-xl line-through">R$ 249</p>
                  <div className="flex items-center">
                    <span className="text-3xl">R$</span>
                    <span className="text-5xl font-bold">199</span>
                  </div>
                  <p className="text-gray-500 text-sm">Parcelado em 12x</p>
                  <p className="text-gray-500 text-sm line-through">
                    R$ 2.988/ano
                  </p>
                  <p className="text-gray-500 text-xl">R$ 2.390/ano</p>
                </div>

                <div className="p-10 text-sm">
                  <ul className="">
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional responsivo (Até 5 páginas)
                      </p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">Integração básica de sistemas</p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">Automação de precessos simples</p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">Suporte técnico básico</p>
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

              <div className=" flex flex-col flex-grow mt-8 overflow-hidden transform  bg-white rounded-lg shadow-lg  hover:scale-110 ease-in duration-500">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Boost</span>
                  <p className="text-gray-500 text-xl line-through">R$ 419</p>
                  <div className="flex items-center">
                    <span className="text-3xl">R$</span>
                    <span className="text-6xl font-bold">335</span>
                  </div>
                  <p className="text-gray-500 text-sm">Parcelado em 12x</p>
                  <p className="text-gray-500 text-sm line-through">
                    R$ 5028/ano
                  </p>
                  <p className="text-gray-500 text-xl">R$ 4022/ano</p>
                </div>
                <div className="p-10 ">
                  <ul className="text-sm">
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional responsivo (Até 10 páginas)
                      </p>
                    </li>

                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Integração de múltiplos sistemas
                      </p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Automação de processos intermediários
                      </p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">Suporte técnico prioritário</p>
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

              <div className="flex flex-col mt-8 flex-grow overflow-hidden z-10 bg-white rounded-lg shadow-lg hover:scale-110 ease-in duration-500">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold text-2xl">Web Mastery</span>
                  <p className="text-gray-500 text-xl line-through">R$ 769</p>
                  <div className="flex items-center">
                    <span className="text-3xl">R$</span>
                    <span className="text-6xl font-bold">615</span>
                  </div>
                  <p className="text-gray-500 text-sm">Parcelado em 12x</p>
                  <p className="text-gray-500 text-sm line-through">
                    R$ 9228/ano
                  </p>
                  <p className="text-gray-500 text-xl">R$ 7382/ano</p>

                  <div className="flex items-center">
                    <span className="text-3xl"></span>
                    <span className="text-5xl font-bold"></span>
                    <span className="text-2xl text-gray-500"></span>
                  </div>
                </div>
                <div className="p-10">
                  <ul className="text-sm">
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Site institucional completo e personalizado
                      </p>
                    </li>

                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">Integração total de sistemas</p>
                    </li>
                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Automação avançada de processos
                      </p>
                    </li>

                    <li className="flex items-center">
                      <FaCheck size={0} color="green" />
                      <p className="ml-2 p-2">
                        Suporte técnico premium e consultoria contínua
                      </p>
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
