import React from 'react';
import Link from 'next/link';
import { Search, BarChart3, Code2, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const categories = [
    {
      title: "Searching Algorithms",
      description: "Visualize how computers find specific data within a collection efficiently.",
      icon: <Search className="w-8 h-8 text-blue-400" />,
      links: [
        { name: "Linear Search", href: "/linear-search" },
        { name: "Binary Search", href: "/binary-search" },
      ],
      color: "hover:border-blue-500/50"
    },
    {
      title: "Sorting Algorithms",
      description: "Watch data organize itself through various logical rearrangement methods.",
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      links: [
        { name: "Bubble Sort", href: "/bubble-sort" },
        { name: "Selection Sort", href: "/selection-sort" },
        { name: "Insertion Sort", href: "/insertion-sort" },
      ],
      color: "hover:border-purple-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {/* Hero Section */}
      <header className="py-20 px-6 text-center border-b border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <Code2 size={16} />
          <span>Algorithm Visualizer</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Master Data Structures
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Interactive demonstrations of searching and sorting logic. <br /> Built for developers, by <span className="text-blue-400 font-mono">Coding Foxie</span>.
        </p>
      </header>

      {/* Categories Grid */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300 ${cat.color} group`}
            >
              <div className="mb-6">{cat.icon}</div>
              <h2 className="text-2xl font-bold mb-3">{cat.title}</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-3">
                {cat.links.map((link, j) => (
                  <Link
                    key={j}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all group/link"
                  >
                    <span className="font-medium text-slate-300 group-hover/link:text-white">
                      {link.name}
                    </span>
                    <ArrowRight size={18} className="text-slate-600 group-hover/link:translate-x-1 group-hover/link:text-blue-400 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer / Call to Action */}
      <footer className="text-center py-12 border-t border-slate-900">
        <p className="text-slate-500 text-sm italic">
          &copy; {new Date().getFullYear()} Coding Foxie • Visualizing logic one step at a time.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;