import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import CardBox from "../cardBox/CardBox";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>İngilizce Öğren - InfoMuen</title>
        <meta
          name="description"
          content="Uygulamamız,yaygın kullanılan phrase verb'ler ve ingilizce ilk 100 kelime gibi dil öğrenme araçları da sunmaktadır. Ayrıca Kart depolama uygulaması ile kartlarınızı güvenli bir şekilde saklayın, düzenleyin ve erişim sağlayın. Bilinmesi gereken önemli sıfatlar ve yaygın kullanılan isimler ile zenginleştirilmiş içeriği ile dikkatinizi çekecektir."
        />
        <meta
          name="keywords"
          content="kart depolama,ingilizce türkçe,ingilizce türkçe çeviri,çeviri,translate, kolay ingilizce, kart yönetimi uygulaması, ingilizce ilk 100 kelime,ingilizce ilk 1000 kelime,ingilizce ilk yüz kelime,ingilizce ilk bin kelime, dijital kart saklama, kart organizasyonu, ingilizce dil öğrenme, dil öğrenme uygulaması, ingilizce kelime öğrenme, ingilizce dilbilgisi, ingilizce sıfatlar, ingilizce phrase verb'ler, dil öğrenme araçları,ingilizcede kullanılan ilk 1000 kelime,ingilizcede kullanılan ilk 100 kelime,ingilizcede en çok kullanılan ilk 100 kelime,ingilizcede öğrenilmesi gereken ilk 100 kelime"
        />
      </Helmet>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <CardBox />
      </div>
    </div>
  );
};

export default Home;
