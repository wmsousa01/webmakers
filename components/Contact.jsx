import React from 'react'

const Contact = () => {
  return (
    <div className='maxx-w[1240px] m-auto mt-[83px] p-2 h-screen '>
        <h1 className='text-2xl font-bold text-center p-8 text-black'>Seja nosso cliente</h1>
        <form 
         className='max-w-[600px] m-auto  '
         action='https://getform.io/f/bvrezqnb'
         method='POST'
         encType='multipart/form-data'
        >
            <div className='grid grid-cols-1 gap-2'>
                <input 
                 className='border shadow-lg p-3' 
                 type="text" 
                 placeholder='Nome' 
                 name='nome'
                 />
                <input 
                 className='border shadow-lg p-3' 
                 type="email" 
                 placeholder='Email' 
                 name="email"
                 />
            </div>
            <input className='border shadow-lg p-3 w-full my-2' 
             type="subject" 
             placeholder='Assunto' 
             name="subject"
             />
            <textarea 
              className='border shadow-lg p-3 w-full' 
              cols='' 
              rows='6' 
              placeholder='Menssagem'
              name='mensagem'
              />
            <button className='border shadow-lg p-3 w-full mt-2'>Enviar</button>
        </form>
    </div>
  )
}

export default Contact