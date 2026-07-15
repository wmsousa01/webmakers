import React from 'react'

const Contact = () => {
  return (
    <section className='mt-[70px] bg-surface-sunken min-h-screen py-16 md:py-20 px-4'>
      <div className='max-w-xl mx-auto text-center'>
        <p className='eyebrow mb-3'>Contato</p>
        <h1 className='text-3xl sm:text-4xl md:text-4xl'>Seja nosso cliente</h1>
        <p className='mt-4 text-lg'>
          Preencha o formulário abaixo e nossa equipe entrará em contato com
          você o mais rápido possível.
        </p>
      </div>

      <form
        className='card max-w-xl mx-auto mt-10 p-8'
        action='https://getform.io/f/bvrezqnb'
        method='POST'
        encType='multipart/form-data'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='nome' className='block text-sm font-semibold text-ink mb-1'>
              Nome
            </label>
            <input
              id='nome'
              className='field'
              type='text'
              placeholder='Seu nome'
              name='nome'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-semibold text-ink mb-1'>
              Email
            </label>
            <input
              id='email'
              className='field'
              type='email'
              placeholder='voce@empresa.com'
              name='email'
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <label htmlFor='subject' className='block text-sm font-semibold text-ink mb-1'>
            Assunto
          </label>
          <input
            id='subject'
            className='field'
            type='text'
            placeholder='Como podemos ajudar?'
            name='subject'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='mensagem' className='block text-sm font-semibold text-ink mb-1'>
            Mensagem
          </label>
          <textarea
            id='mensagem'
            className='field'
            rows='6'
            placeholder='Conte um pouco sobre o seu projeto'
            name='mensagem'
            required
          />
        </div>

        <button type='submit' className='btn-primary w-full mt-6'>
          Enviar mensagem
        </button>
      </form>
    </section>
  )
}

export default Contact
