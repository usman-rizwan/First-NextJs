import Navbar from "@/components/Navbar"

async function getData() {
  const res = await fetch('https://api.github.com/users/vercel/repos' )
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return (
    <>
      <Navbar />
  
      <div className="flex justify-center items-centerh-[90] mt-3">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
      <main className="p-4">
        <h1>Hello, world!</h1>
        <p>This is a basic example of a Next.js page using a custom layout.</p>
        <p>The data from the API is:</p>
        <ul>
          {data.map((repo) => <li key={repo.id}>{repo.name}</li>)}
        </ul>
      </main>
    </>
  )
}
