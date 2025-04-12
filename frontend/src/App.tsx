import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Scraping from "./pages/scraping";
import Navbar from "./components/navbar";

function Home() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Let's learn about web scraping with these visuals
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>
          Making the form to enter the site name from which you want to scrape
        </li>
        <li>
          Then the class name or stuff that might help on scraping from that
          site
        </li>
        <li>Making request to scrape the data</li>
        <li>Sending the scraped data in the response</li>
        <li>Giving the user the ability to download the data in PDF format</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">
        Future Plans
      </h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>
          Extending this to scrape from the internet, not from a specific site —
          like first scraping the site names that might be helpful to enter
          their URLs
        </li>
        <li>Scraping from multiple URLs then returning the data</li>
      </ul>
    </div>
  );
}

function Search() {
  return <div className="p-4">This is the Data Search page.</div>;
}

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scraping" element={<Scraping />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
