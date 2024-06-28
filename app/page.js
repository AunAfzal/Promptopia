import Search from "./components/search/page";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="text-center mt-16 mb-8">
        <br/>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2">Discover and Share</h1>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-500 font-semibold mb-8">AI-powered prompts</p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
          Promptopia is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts.
        </p>
      </div>

      <div className="container py-8 flex items-center justify-center">
        <Search />
      </div>
    </div>
  );
}
