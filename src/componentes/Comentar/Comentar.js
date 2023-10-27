import { useEffect, useState } from "react";
import { createComment } from "../../services/requests";
import { AutorComentario, BotaoCondicional, ComentarioContainer, ComentarioDoAutor, ContainerCurtir, ContainerItem, InputComentar } from "./style";
import Curtir from "../Curtir/Curtir";


const Comentar = ({postId, comments, autorId}) => {
    const [novoComentario, setNovoComentario] = useState('')
    const [comentarios, setNovoComentarios] = useState([])
    const [mostrarComentarios, setMostrarComentarios] = useState(false)

    const adicionarComentario = ()=>{
        if(novoComentario.trim() !== ''){
            createComment(postId, novoComentario)
            setNovoComentario(...comments, novoComentario)
            setNovoComentario('')
        }
    }
   
    useEffect(() => {
        adicionarComentario()
    },[])

        const novosComentarios = comments.map((comentarios)=>{
            return(
                <ComentarioContainer key={comentarios.comment_id}>
                    <AutorComentario>
                        {comentarios.creator_name}
                    </AutorComentario>
                    <ComentarioDoAutor>
                        {comentarios.comment}
                    </ComentarioDoAutor>
                </ComentarioContainer>
            )
        })

    return (

        <>

         <ContainerItem>
            <BotaoCondicional onClick={()=> setMostrarComentarios(
                !mostrarComentarios)}>{mostrarComentarios ?('Fechar'):('Comentar')}
            </BotaoCondicional>
            {mostrarComentarios && (
                <ContainerCurtir>
                    <div>
                        <InputComentar placeholder='comentario'
                        value={novoComentario}
                        onChange={(e)=> setNovoComentario(e.target.value)}/>
                    </div>
                    {novosComentarios}
                </ContainerCurtir>
            )}
            <Curtir autoId={autorId}/>
         </ContainerItem>
             

            
        </>
    )
}

export default Comentar