import { ModeToggle } from "@/components/ModeToggle"

async function getData() {
  const res = await fetch('https://api.github.com/users/vercel/repos' ,{cache: 'no-cache'})
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main>
    <h1>Hello, world!</h1>
    <p>This is a basic example of a Next.js page using a custom layout.</p>
    <p>The data from the API is:</p>
    <ModeToggle/>
   <ul>
     {data.map((repo) => <li key={repo.id}>{repo.name}</li>)}
   </ul>
  </main>
}