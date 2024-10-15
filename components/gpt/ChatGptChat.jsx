import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { FaComments } from 'react-icons/fa'; // Ícone do chat

const ChatGPTChat = () => {
  const [messages, setMessages] = useState([{ text: 'Olá! Qual é o seu nome?', sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false); // Controla a exibição do chat
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // Regex para validar o e-mail
  const validateEmail = (email) => {
    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(cleanedEmail);
  };

  // Regex para validar o telefone no formato XXXXXXXXXXX
  const phoneRegex = /^\d{11}$/;

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
      const response = await axios.post('https://webmaker-back-production.up.railway.app/send-to-jira', userData); // Corrigido o URL
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
      const cleanedEmail = value.trim().toLowerCase();
      if (validateEmail(cleanedEmail)) {
        setUserData({ ...userData, email: cleanedEmail });
        setMessages([...messages, { text: cleanedEmail, sender: 'user' }]);
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
      handleNextStep(input.trim());
      setInput('');
    }
  };

  // Função para detectar a tecla "Enter" e enviar a mensagem
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // Função para abrir e fechar o chat
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Ícone do chat no canto inferior direito */}
      {!showChat && (
        <button
          onClick={toggleChat}
          className="bg-[#39B6EB] text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FaComments size={24} />
        </button>
      )}

      {/* Janela do chat */}
      {showChat && (
        <div className="fixed bottom-0 right-0 w-full max-w-md h-[80vh] bg-white shadow-lg rounded-t-lg">
          <div className="flex justify-between items-center p-4 bg-[#39B6EB] text-white rounded-t-lg">
            <h2 className="text-lg font-bold">Fale com nossa assistente virtual</h2>
            <button onClick={toggleChat} className="text-white">X</button>
          </div>

          <div className="p-4 overflow-y-auto h-full">
            <div className="w-full bg-white shadow-lg rounded-lg p-4 h-[60vh] overflow-y-auto mb-4">
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
                onKeyDown={handleKeyDown}
                className="flex-grow p-2 text-sm rounded-full focus:outline-none"
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
        </div>
      )}
    </div>
  );
};

export default ChatGPTChat;
