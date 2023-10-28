import './est.css'
import { useState,useEffect, useReducer, useRef } from 'react'
import LogoTp from '../imgs/LogoTp.png'
import { motion } from 'framer-motion'
export default function Est(){
    const carousel = useRef()
    const [width, setWidth] = useState(0)
    const [config, setConfig] = useState(false)
    const [bgcolor, setBgcolor] = useState('#e4e4e4')
    const [c1, setC1] = useState('#ec28a1')
    const [c2, setC2] = useState('#ec28a1')
    const [c3, setC3] = useState('#ec28a1')
    const [eventosl, setEventosl] = useState("Eventos")
    const [contatosl, setContatosl] = useState("Contatos")
    const [imageml, setImageml] = useState("Imagem")
    const [linguageml, setLinguageml] = useState("Linguagem")
    const [configuracoesl, setConfiguracoesl] = useState("Configurações")
    const [mel, setMel] = useState("Modo escuro")
    const letra = [1,2,3,4,5,6,7,8,9,10,11]
    let x = 0
    function openConfigs(){
        setConfig(true)
    }
    function closeConfigs(){
        setConfig(false)
    }
    function traduz(p){
        if(p === 1){
            setEventosl("Eventos")
            setContatosl("Contatos")
            setImageml("Imagem")
            setLinguageml("Linguagem")
            setConfiguracoesl("Configurações")
            setMel("Modo escuro")
        }else{
            setEventosl("Events")
            setContatosl("Contacts")
            setImageml("Image")
            setLinguageml("Language")
            setConfiguracoesl("Settings")
            setMel("Dark mode")
        }
    }
    function gravac1(){ 
        if(localStorage.getItem("me") == 'true'){
            setC1('#ec28a1');
            setBgcolor("#e4e4e4")
            localStorage.removeItem("me")
        }else{
            setC1('#38b6ff');
            setBgcolor("#333333")
            localStorage.setItem("me", "true")
        } 
    }
    function trocalingua(lingua){ 
        if(lingua === 'port'){
            localStorage.setItem("configurado", 'port')
            setC2("#38b6ff")
            setC3("#ec28a1")
            traduz(1)
        }else{ 
            localStorage.setItem("configurado", 'eng')
            setC2("#ec28a1")
            setC3("#38b6ff")
            traduz(0)
        }
    } 
    useEffect(()=>{
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)

        if(!localStorage.getItem('linguagem'))
        {
            setC2("#38b6ff")
            localStorage.setItem("configurado", 'port')
            traduz(1)
        }else if(localStorage.getItem('linguagem') == 'port'){
            setC2("#38b6ff")
            setC3("#ec28a1")
            traduz(1)
        }else{
            setC2("#ec28a1")
            setC3("#38b6ff")
            traduz(0)
        }
        if(localStorage.getItem("me") == "true"){
            setC1('#38b6ff')
            setBgcolor('#333333')
        } 
    }, [])
    if(config){
        return(
            <motion.div style={{backgroundColor: bgcolor}} animate={{x: 0}} initial={{x: -300}}  id='containerch'>
                <p className='fa fa-close' id='icch' onClick={closeConfigs}></p>
                <p className='tm'>{configuracoesl}</p>
                <p className='ttcch'>{imageml}</p>
                <div id='dc1ch'>
                    <div onClick={gravac1} className='odcch' style={{backgroundColor: c1}}></div>
                    <p className='tcch'>{mel}</p>
                </div>
                <p className='ttcch'>{linguageml}</p>
                <div id='dc2ch'>
                <div id='dc1ch'>
                <div onClick={()=>trocalingua('port')} className='odcch' style={{backgroundColor: c2}}></div>
                <p className='tcch'>Portugues</p>
                </div>
                <div id='dc1ch'>
                <div id="engch" onClick={()=>trocalingua('eng') } className='odcch' style={{backgroundColor: c3}}></div>
                <p className='tcch' >English</p>
                </div>
                </div>
            </motion.div>
        )
    }
    return(
        <div id="container" style={{backgroundColor: bgcolor}} >
            <div id='header'>
                <img src={LogoTp} id='lth'/>
                <i onClick={openConfigs} id='ich' className='fa fa-cog'></i>
            </div>
            <div id='l1h'></div>            
            <div id='main'>
                <p className='tm'>
                    {eventosl}
                </p>
                <div id='cobrecarouselm'>
                    <motion.div ref={carousel} className='carousel' whileTap={{cursor: "grabbing"}}>
                        <motion.div className='inner' initial={{x:100}} animate={{x: 0}} drag='x' dragConstraints={
                            {right: 0, left: -width }
                        }>
                            {
                                letra.map(l=>{
                                    x++
                                    return(
<motion.div key={x}>
    <div className='dcm'>

    </div>
</motion.div>
                                    )
                                })
                             }
                        </motion.div>
                    </motion.div>
                </div>
                <p className='tm'>
                    {contatosl}
                </p>
                <div id='contatosm'>
                <a href="https://wa.me/5548996095173" target='_blank'>
                    <button className='bcm'>
                        <i className='fa fa-whatsapp ibcm' id='whatsapp'></i>
                         <p className='tbcm'>Whatsapp</p>
                    </button>
                </a>

                <a href="https://www.instagram.com/ingressosbaratos" target='_blank'>
                    <button className='bcm'>
                        <i id='instagram' className='fa fa-instagram ibcm'></i>
                         <p className='tbcm'>Instagram</p>
                    </button>
                </a>

                <a id='lbcm' href="mailto:seuemail@gmail.com" target='_blank'>
                    <button className='bcm' id='lbcm'>
                        <i id='envelope' className='fa fa-envelope ibcm'></i>
                         <p className='tbcm'>Email</p>
                    </button>
                </a>
            </div>
            </div>

            <div id='lf'></div>  
            <div id='footer'>
                <img src={LogoTp} id='ltf'/>
            </div> 
        </div>
    )
}