import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const Home = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()

    const mySubscription = supabase
      .from('messages')
      .on('*', (payload) => {
        console.log(payload)
        getMessages()
      })
      .subscribe()

    return () => supabase.removeSubscription(mySubscription)
  }, [])

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select()
      .range(0, 49)
      .order('id', { ascending: false })

    if (error) {
      console.log(error)
      return
    }
    setMessages(data)
  }

  const sendMessage = async () => {
    const { error } = await supabase.from('messages').insert([
      {
        username: 'Test',
        text: 'gm',
      },
    ])

    if (error) {
      console.log(error)
      return
    }
  }

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.id}</p>
          <p>{message.username}</p>
          <p>{message.text}</p>
          <p>{message.timestamp}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
