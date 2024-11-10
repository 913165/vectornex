import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[15px_1fr_15px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-950 transition-colors">
      <section className="max-w-4xl text-center sm:text-left pt-20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome to VectorNex
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          VectorNex is a next-generation vector database designed for high-performance similarity search and machine learning applications. Built with scalability in mind, it offers lightning-fast querying, efficient storage, and seamless integration with modern AI workflows. Whether you're working on recommendation systems, semantic search, or complex data analysis, SimilLake provides the tools and performance you need to bring your ideas to life.
        </p>
      </section>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-900 dark:text-white transition-colors">
      </footer>
    </div>
  );
}

