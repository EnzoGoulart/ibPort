import "./est.css";
import { useState, useEffect, useReducer, useRef } from "react";
import LogoTp from "../imgs/LogoTp.png";
import { motion } from "framer-motion";
import Livinho from "../imgs/livinho.jpeg";
import Marks from "../imgs/marks.jpeg";
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
export default function Est() {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [config, setConfig] = useState(false);
  const [img, setImg] = useState("");
  const [bgcolor, setBgcolor] = useState("#e4e4e4");
  const [c1, setC1] = useState("#ec28a1");
  const [txtCor, setTxtCor] = useState("#10384e");
  const [c2, setC2] = useState("#ec28a1");
  const [c3, setC3] = useState("#ec28a1");
  const [eventosl, setEventosl] = useState("Eventos");
  const [contatosl, setContatosl] = useState("Contatos");
  const [imageml, setImageml] = useState("Imagem");
  const [linguageml, setLinguageml] = useState("Linguagem");
  const [maisl, setMaisl] = useState("Mais");
  const [commaisl, setCommaisl] = useState("Compre mais barato com a gente!");
  const [configuracoesl, setConfiguracoesl] = useState("Configurações");
  const [mel, setMel] = useState("Modo escuro");
  const [fotoM, setFotoM] = useState(null);
  const [dataM, setDataM] = useState("");
  const [localM, setLocalM] = useState("");
  const [nomeM, setNomeM] = useState("");
  const [descriM, setDescriM] = useState("");
  const [banner, setBanner] = useState(false);
  function openConfigs() {
    setConfig(true);
  }
  function closeConfigs() {
    setConfig(false);
  }
  function traduz(p) {
    if (p === 1) {
      setEventosl("Eventos");
      setContatosl("Contatos");
      setImageml("Imagem");
      setLinguageml("Linguagem");
      setConfiguracoesl("Configurações");
      setCommaisl("Compre mais barato com a gente!");
      setMaisl("Mais");
      setMel("Modo escuro");
    } else {
      setEventosl("Events");
      setContatosl("Contacts");
      setImageml("Image");
      setCommaisl("Buy cheaper with us!");
      setConfiguracoesl("Configurações");
      setLinguageml("Language");
      setMaisl("About");
      setMel("Dark mode");
    }
  }
  function gravac1() {
    if (localStorage.getItem("me") == "true") {
      setC1("#ec28a1");
      setBgcolor("#e4e4e4");
      setTxtCor("#10384e");
      localStorage.removeItem("me");
    } else {
      setC1("#38b6ff");
      setBgcolor("#333333");
      setTxtCor("#e4e4e4");
      localStorage.setItem("me", "true");
    }
  }
  function trocalingua(lingua) {
    if (lingua === "port") {
      localStorage.setItem("linguagem", "port");
      setC2("#38b6ff");
      setC3("#ec28a1");
      traduz(1);
    } else {
      localStorage.setItem("linguagem", "eng");
      setC2("#ec28a1");
      setC3("#38b6ff");
      traduz(0);
    }
  }
  useEffect(() => {
    async function mostragrid() {
      setLoading(true);
      try {
        const postsRef = collection(db, "eventos");
        const q = query(postsRef);
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setEventos(data);
        } else {
          console.log("Documento não encontrado no Firestore.");
        }
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }   

      const imagens = await Promise.all(
        eventos.map(async (e) => {
          const imagePath = `eventos/${e.id}/${e.foto}`;
          const imageRef = ref(storage, imagePath);  
          return await getDownloadURL(imageRef);
        })
      );
    
      setImgUrls(imagens);    
    }
    mostragrid();

    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);

    if (!localStorage.getItem("linguagem")) {
      setC2("#38b6ff");
      localStorage.setItem("linguagem", "port");
      traduz(1);
    } else if (localStorage.getItem("linguagem") == "port") {
      setC2("#38b6ff");
      setC3("#ec28a1");
      traduz(1);
    } else {
      setC2("#ec28a1");
      setC3("#38b6ff");
      traduz(0);
    }
    if (localStorage.getItem("me") == "true") {
      setC1("#38b6ff");
      setBgcolor("#333333");
      setTxtCor("#e4e4e4");
    } 
    setLoading(false);
  }, [imgUrls]);
  function mostraBanner(foto, nome, data, local, descri) {
    setBanner(true);
    setFotoM(foto);
    setNomeM(nome);
    setDataM(data);
    setLocalM(local);
    setDescriM(descri);
  }
  function fechaBanner() {
    setBanner(false);
    setFotoM(null);
    setNomeM("");
    setDataM("");
    setLocalM("");
    setDescriM("");
  } 
  if (loading) {
    return <div>aaaaa</div>;
  }
  if (config) {
    return (
      <motion.div
        style={{ backgroundColor: bgcolor }}
        animate={{ x: 0 }}
        initial={{ x: -300 }}
        id="containerch"
      >
        <p className="fa fa-close" id="icch" onClick={closeConfigs}></p>
        <p className="tm" style={{ color: txtCor }}>
          {configuracoesl}
        </p>
        <p className="ttcch" style={{ color: txtCor }}>
          {imageml}
        </p>
        <div id="dc1ch">
          <div
            onClick={gravac1}
            className="odcch"
            style={{ backgroundColor: c1 }}
          ></div>
          <p className="tcch" style={{ color: txtCor }}>
            {mel}
          </p>
        </div>
        <p className="ttcch" style={{ color: txtCor }}>
          {linguageml}
        </p>
        <div id="dc2ch">
          <div id="dc1ch">
            <div
              onClick={() => trocalingua("port")}
              className="odcch"
              style={{ backgroundColor: c2 }}
            ></div>
            <p className="tcch" style={{ color: txtCor }}>
              Portugues
            </p>
          </div>
          <div id="dc1ch">
            <div
              id="engch"
              onClick={() => trocalingua("eng")}
              className="odcch"
              style={{ backgroundColor: c3 }}
            ></div>
            <p className="tcch" style={{ color: txtCor }}>
              English
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
  if (banner) {
    return (
      <motion.div
        style={{ backgroundColor: bgcolor }}
        animate={{ x: 0 }}
        initial={{ x: -300 }}
        id="containerA"
      >
        <p className="fa fa-close" id="icch" onClick={fechaBanner}></p>
        <p className="tm" style={{ color: txtCor }}>
          {maisl}
        </p>
        <img id="fb" src={fotoM} />
        <div style={{ color: txtCor }}>
          <p id="nb">{nomeM}</p>

          <div className="db">
            <div className="ddb">
              <p className="fa fa-calendar-check-o dfb"></p>
              <p id="dddb">{dataM}</p>
            </div>
            <div className="ddb">
              <p className="fa fa-map-marker dfb"></p>
              <p id="dlb">{localM}</p>
            </div>
          </div>
          <p id="describ">{descriM}</p>
          <div id="l1b"></div>
        </div>
        <a href="https://www.instagram.com/ingressosbaratos" target="_blank">
          <button id="bb">
            <i id="instagram" className="fa fa-instagram bbi"></i>
            <p className="bbt">{commaisl}</p>
          </button>
        </a>
      </motion.div>
    );
  }
  return (
    <div id="container" style={{ backgroundColor: bgcolor }}>
      <div id="header">
        <img src={LogoTp} id="lth" />
        <i onClick={openConfigs} id="ich" className="fa fa-cog"></i>
      </div>
      <div id="l1h"></div>
      <div id="main">
        <p className="tm" style={{ color: txtCor }}>
          {eventosl}
        </p>
        <div id="cobrecarouselm">
          <motion.div
            ref={carousel}
            className="carousel"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="inner"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
            >
              {eventos.map((e, i) => { 
                return (
                  <motion.div
                    key={e.id}
                    onClick={() => {
                      mostraBanner(
                        imgUrls[i],
                        e.nome,
                        e.local,
                        e.data,
                        e.descri
                      );
                    }}
                  >
                    <div className="dcm">
                      <img id="cim" src={imgUrls[i]} alt="carregando"/>
                      <div>
                        <p id="ctm">{e.nome}</p>

                        <div className="cdtm" id="cdtm1">
                          <p className="fa fa-calendar-check-o dfm"></p>
                          <p id="cdm">{e.data}</p>
                        </div>
                        <div className="cdtm" id="cdtm2">
                          <p className="fa fa-map-marker dfm"></p>
                          <p id="clm">{e.local}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
        <p className="tm" style={{ color: txtCor }}>
          {contatosl}
        </p>
        <div id="contatosm">
          <a href="https://wa.me/5548996095173" target="_blank">
            <button className="bcm">
              <i className="fa fa-whatsapp ibcm" id="whatsapp"></i>
              <p className="tbcm">Whatsapp</p>
            </button>
          </a>

          <a href="https://www.instagram.com/ingressosbaratos" target="_blank">
            <button className="bcm">
              <i id="instagram" className="fa fa-instagram ibcm"></i>
              <p className="tbcm">Instagram</p>
            </button>
          </a>

          <a id="lbcm" href="mailto:seuemail@gmail.com" target="_blank">
            <button className="bcm" id="lbcm">
              <i id="envelope" className="fa fa-envelope ibcm"></i>
              <p className="tbcm">Email</p>
            </button>
          </a>
        </div>
      </div>

      <div id="lf"></div>
      <div id="footer">
        <img src={LogoTp} id="ltf" />
      </div>
    </div>
  );
}
