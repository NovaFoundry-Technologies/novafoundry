import Seo from './Seo'
import Hero from './sections/Hero'
const SITE_URL = 'https://novafoundry.org'

function App() {
  return (
    <>
      <Hero />
      <Seo
        title="Build Products Faster"
        description="NovaFoundry builds modern web experiences with performance, SEO, and scalability from day one."
        url={SITE_URL}
      />

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 text-slate-900 md:px-10">
        <p className="mb-4 inline-block w-fit rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
          React + TypeScript + Tailwind + SEO-ready
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
          NovaFoundry starter stack with strong technical SEO defaults.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          This setup ships with canonical URLs, Open Graph, Twitter cards, robots.txt,
          and sitemap.xml so your app starts with search visibility best practices.
        </p>
      </main>
    </>
  )
}

export default App
