import { LyricsProvider } from "./actions/LyricsContex";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Search from "./components/SearchBar/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Search />

      <Footer />
    </div>
  );
};
export default Home;
