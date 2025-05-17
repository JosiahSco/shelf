import { useState, useEffect} from 'react'

type Media = {
  id: number,
  title: string,
  type: 'Movie' | 'Book' | 'Game' | 'Show' | 'Music' 
}

const Home = () => {
    const [items, setItems] = useState<Media[]>([]);

  useEffect(() => { 
    async function fetchItems() {
      const response = await fetch('/api/media');
      console.log(response);
      const data = await response.json();
      console.log(response, data);
      setItems(data);
    }
    fetchItems();
  }, [])

  return (
    <>
      <div>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>Type: {item.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Home