import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRegCommentDots } from 'react-icons/fa'; // Ícone de chat
import 'tailwindcss/tailwind.css';

const ChatGPTChat = () => {
  const [messages, setMessages] = useState([{ text: 'Olá! Qual é o seu nome?', sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false); // Para controlar o estado de "digitando"
  const [isChatOpen, setIsChatOpen] = useState(false); // Controla a visibilidade do chat
  const chatContainerRef = useRef(null); // Para rolagem automática
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // Regex para validar o e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex para validar o telefone no formato XXXXXXXXXXX
  const phoneRegex = /^\d{11}$/;

  // Função para rolar automaticamente para a última mensagem
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Função para simular um delay na resposta do bot
  const addBotMessageWithDelay = (message, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: message, sender: 'bot' }]);
      setIsTyping(false);
    }, delay);
  };

  // Função para enviar os dados para o Jira
  const sendDataToJira = async (userData) => {
    try {
      const response = await axios.post('https://webmaker-back-production.up.railway.app', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para o Jira:', error);
    }
  };

  // Função que gerencia o fluxo de coleta de dados
  const handleNextStep = (value) => {
    if (step === 0) {
      setUserData({ ...userData, name: value });
      setMessages([...messages, { text: value, sender: 'user' }]);
      addBotMessageWithDelay(`Prazer em te conhecer, ${value}! Qual é o seu e-mail?`);
      setStep(1);
    } else if (step === 1) {
      if (emailRegex.test(value)) {
        setUserData({ ...userData, email: value });
        setMessages([...messages, { text: value, sender: 'user' }]);
        addBotMessageWithDelay(`Obrigado, ${userData.name}. E qual o seu telefone?`);
        setStep(2);
      } else {
        addBotMessageWithDelay('Por favor, insira um e-mail válido.');
      }
    } else if (step === 2) {
      if (phoneRegex.test(value)) {
        setUserData({ ...userData, phone: value });
        setMessages([...messages, { text: value, sender: 'user' }]);
        addBotMessageWithDelay(`O que você está buscando, ${userData.name}? Como podemos te ajudar?`);
        setStep(3);
      } else {
        addBotMessageWithDelay('Por favor, insira um telefone no formato XXXXXXXXXXX.');
      }
    } else if (step === 3) {
      setUserData({ ...userData, interest: value });
      setMessages([...messages, { text: value, sender: 'user' }]);
      addBotMessageWithDelay(`Obrigado, ${userData.name}! Entraremos em contato em breve com a melhor solução para você.`);
      sendDataToJira({ name: userData.name, email: userData.email, phone: userData.phone, interest: value });
      setStep(4);
    }
  };

  // Função para enviar a mensagem
  const sendMessage = async () => {
    if (input.trim()) {
      handleNextStep(input);
      setInput('');
    }
  };

  // Função para detectar a tecla "Enter" e enviar a mensagem
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // Controla a abertura do chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      {/* Botão de ícone de chat no canto inferior direito */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-[#39B6EB] text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 z-50"
      >
        <FaRegCommentDots size={24} />
      </button>

      {/* Modal de Chat */}
      {isChatOpen && (
        <div
          className="fixed bottom-0 right-0 w-full md:w-[400px] h-[90vh] bg-white shadow-lg rounded-t-lg z-50 flex flex-col"
        >
          {/* Título */}
          <div className="bg-[#39B6EB] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Fale com nossa assistente virtual!</h2>
            <button onClick={toggleChat} className="text-white font-bold text-lg">X</button>
          </div>

          {/* Área do Chat */}
          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-[#DCF8C6] text-black self-end'
                    : 'bg-white text-black self-start border border-gray-200'
                } shadow-md`}
              >
                <p className="text-sm">{msg.sender === 'user' ? 'Você' : 'Assistente Virtual'}</p>
                <p>{msg.text}</p>
              </div>
            ))}
            {/* Animação de digitando */}
            {isTyping && (
              <div className="my-2 p-2 bg-white text-gray-700 rounded-lg self-start border border-gray-200">
                <strong>Assistente Virtual está digitando...</strong>
              </div>
            )}
          </div>

          {/* Campo de texto e botão de envio */}
          <div className="w-full flex items-center bg-white border border-gray-300 rounded-full px-2 py-1 shadow-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Detecta o pressionamento da tecla Enter
              className="flex-grow p-2 text-sm rounded-full focus:outline-none transition-transform duration-500 transform hover:scale-105"
              placeholder={
                step === 0
                  ? 'Digite seu nome...'
                  : step === 1
                  ? 'Digite seu e-mail...'
                  : step === 2
                  ? 'Digite seu telefone...'
                  : 'Digite sua pergunta...'
              }
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-[#39B6EB] text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTChat;
